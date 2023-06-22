import { ethers } from "hardhat";
import { assert } from "chai";
import { ReserveToken18 } from "../typechain";
import {
  ONE,
  basicDeploy,
  compareStructs,
  eighteenZeros,
  getEvents,
  max_uint256,
  randomUint256,
} from "../utils";
import { orderBook, signers, subgraph } from "./0_initialization.test";
import { encodeMeta, getOrderConfig } from "../utils/orderBook/order";
import {
  AddOrderEvent,
  ContextEvent,
  DepositConfigStruct,
  DepositEvent,
  OrderConfigStruct,
  SignedContextV1Struct,
  TakeOrderConfigStruct,
  TakeOrderEvent,
  TakeOrdersConfigStruct,
} from "../typechain/contracts/orderbook/OrderBook";
import { getEventArgs, waitForSubgraphToBeSynced } from "./utils";
import { FetchResult } from "apollo-fetch";
import { arrayify, solidityKeccak256 } from "ethers/lib/utils";
import { xit } from "mocha";

describe.only("TakeOrderEntity", () => {
  let tokenA: ReserveToken18;
  let tokenB: ReserveToken18;

  beforeEach(async () => {
    tokenA = (await basicDeploy("ReserveToken18", {})) as ReserveToken18;
    tokenB = (await basicDeploy("ReserveToken18", {})) as ReserveToken18;
    await tokenA.initialize();
    await tokenB.initialize();
  });

  xit("should query TakeOrderEntity correctly after take an order", async function () {
    const [, alice, bob] = signers;

    const aliceInputVault = ethers.BigNumber.from(randomUint256());
    const aliceOutputVault = ethers.BigNumber.from(randomUint256());

    const aliceOrder = encodeMeta("Order_A");

    // ASK ORDER

    const ratio_A = ethers.BigNumber.from("90" + eighteenZeros);

    const OrderConfig_A: OrderConfigStruct = await getOrderConfig(
      ratio_A,
      max_uint256,
      tokenA.address,
      18,
      aliceInputVault,
      tokenB.address,
      18,
      aliceOutputVault,
      aliceOrder
    );

    const txAddOrder = await orderBook.connect(alice).addOrder(OrderConfig_A);

    const { order: Order_A } = (await getEventArgs(
      txAddOrder,
      "AddOrder",
      orderBook
    )) as AddOrderEvent["args"];

    // DEPOSIT

    const amountB = ethers.BigNumber.from("2" + eighteenZeros);

    const depositConfigStructAlice: DepositConfigStruct = {
      token: tokenB.address,
      vaultId: aliceOutputVault,
      amount: amountB,
    };

    await tokenB.transfer(alice.address, amountB);
    await tokenB
      .connect(alice)
      .approve(orderBook.address, depositConfigStructAlice.amount);

    // Alice deposits tokenB into her output vault
    const txDepositOrderAlice = await orderBook
      .connect(alice)
      .deposit(depositConfigStructAlice);

    const { sender: depositAliceSender, config: depositAliceConfig } =
      (await getEventArgs(
        txDepositOrderAlice,
        "Deposit",
        orderBook
      )) as DepositEvent["args"];

    assert(depositAliceSender === alice.address);
    compareStructs(depositAliceConfig, depositConfigStructAlice);

    // TAKE ORDER

    // Bob takes order with direct wallet transfer
    const takeOrderConfigStruct: TakeOrderConfigStruct = {
      order: Order_A,
      inputIOIndex: 0,
      outputIOIndex: 0,
      signedContext: [],
    };

    const takeOrdersConfigStruct: TakeOrdersConfigStruct = {
      output: tokenA.address,
      input: tokenB.address,
      minimumInput: amountB,
      maximumInput: amountB,
      maximumIORatio: ratio_A,
      orders: [takeOrderConfigStruct],
    };

    const amountA = amountB.mul(ratio_A).div(ONE);
    await tokenA.transfer(bob.address, amountA);
    await tokenA.connect(bob).approve(orderBook.address, amountA);

    const txTakeOrders = await orderBook
      .connect(bob)
      .takeOrders(takeOrdersConfigStruct);

    const takeOrderEvents = (await getEvents(
      txTakeOrders,
      "TakeOrder",
      orderBook
    )) as Array<TakeOrderEvent["args"]>;

    const tokenAAliceBalance = await tokenA.balanceOf(alice.address);
    const tokenBAliceBalance = await tokenB.balanceOf(alice.address);
    const tokenABobBalance = await tokenA.balanceOf(bob.address);
    const tokenBBobBalance = await tokenB.balanceOf(bob.address);

    assert(tokenAAliceBalance.isZero()); // Alice has not yet withdrawn
    assert(tokenBAliceBalance.isZero());
    assert(tokenABobBalance.isZero());
    assert(tokenBBobBalance.eq(amountB));

    await orderBook.connect(alice).withdraw({
      token: tokenA.address,
      vaultId: aliceInputVault,
      amount: amountA,
    });

    const tokenAAliceBalanceWithdrawn = await tokenA.balanceOf(alice.address);
    assert(tokenAAliceBalanceWithdrawn.eq(amountA));

    // Subgraph check
    await waitForSubgraphToBeSynced();

    for (let i = 0; i < takeOrderEvents.length; i++) {
      // ID: tx.hash - N (N-th order taken)
      const takeOrderEntity_ID = `${txTakeOrders.hash.toLowerCase()}-${i}`;
      const { sender, config, input, output } = takeOrderEvents[i];

      const { order, inputIOIndex, outputIOIndex } = config;
      const inputToken = `${order.validInputs[inputIOIndex.toNumber()].token}`;
      const outputToken = `${
        order.validOutputs[outputIOIndex.toNumber()].token
      }`;

      const query = `{
        takeOrderEntity (id: "${takeOrderEntity_ID}") {
          input
          output
          inputIOIndex
          outputIOIndex
          sender {
            id
          }
          inputToken {
            id
          }
          outputToken {
            id
          }
        }
      }`;

      const response = (await subgraph({ query })) as FetchResult;
      const data = response.data.takeOrderEntity;

      assert.equal(data.input, input.toString());
      assert.equal(data.output, output.toString());
      assert.equal(data.inputIOIndex, inputIOIndex.toString());
      assert.equal(data.outputIOIndex, outputIOIndex.toString());

      assert.equal(data.sender.id, sender.toLowerCase());
      assert.equal(data.inputToken.id, inputToken.toLowerCase());
      assert.equal(data.outputToken.id, outputToken.toLowerCase());
    }
  });

  xit("should take multiple orders on the good path (clear multiple orders directly from buyer wallet)", async function () {
    const signers = await ethers.getSigners();

    const [, alice, bob, carol] = signers;

    const aliceInputVault = ethers.BigNumber.from(randomUint256());
    const aliceOutputVault = ethers.BigNumber.from(randomUint256());
    const bobInputVault = ethers.BigNumber.from(randomUint256());
    const bobOutputVault = ethers.BigNumber.from(randomUint256());

    const aliceOrder = encodeMeta("Order_A");
    const bobOrder = encodeMeta("Order_B");

    // ORDERS

    const ratio_A = ethers.BigNumber.from("90" + eighteenZeros);

    const OrderConfig_A: OrderConfigStruct = await getOrderConfig(
      ratio_A,
      max_uint256,
      tokenA.address,
      18,
      aliceInputVault,
      tokenB.address,
      18,
      aliceOutputVault,
      aliceOrder
    );

    const OrderConfig_B: OrderConfigStruct = await getOrderConfig(
      ratio_A,
      max_uint256,
      tokenA.address,
      18,
      bobInputVault,
      tokenB.address,
      18,
      bobOutputVault,
      bobOrder
    );

    const txAddOrderAlice = await orderBook
      .connect(alice)
      .addOrder(OrderConfig_A);
    const txAddOrderBob = await orderBook.connect(bob).addOrder(OrderConfig_B);

    const { order: Order_A } = (await getEventArgs(
      txAddOrderAlice,
      "AddOrder",
      orderBook
    )) as AddOrderEvent["args"];
    const { order: Order_B } = (await getEventArgs(
      txAddOrderBob,
      "AddOrder",
      orderBook
    )) as AddOrderEvent["args"];

    // DEPOSIT

    const amountB = ethers.BigNumber.from("2" + eighteenZeros);

    const depositConfigStructAlice: DepositConfigStruct = {
      token: tokenB.address,
      vaultId: aliceOutputVault,
      amount: amountB,
    };
    const depositConfigStructBob: DepositConfigStruct = {
      token: tokenB.address,
      vaultId: bobOutputVault,
      amount: amountB,
    };

    await tokenB.transfer(alice.address, amountB);
    await tokenB.transfer(bob.address, amountB);
    await tokenB
      .connect(alice)
      .approve(orderBook.address, depositConfigStructAlice.amount);
    await tokenB
      .connect(bob)
      .approve(orderBook.address, depositConfigStructBob.amount);

    // Alice deposits tokenB into her output vault
    await orderBook.connect(alice).deposit(depositConfigStructAlice);
    // Bob deposits tokenB into his output vault
    await orderBook.connect(bob).deposit(depositConfigStructBob);

    // TAKE ORDER

    // Carol takes orders with direct wallet transfer
    const takeOrderConfigStructAlice: TakeOrderConfigStruct = {
      order: Order_A,
      inputIOIndex: 0,
      outputIOIndex: 0,
      signedContext: [],
    };
    const takeOrderConfigStructBob: TakeOrderConfigStruct = {
      order: Order_B,
      inputIOIndex: 0,
      outputIOIndex: 0,
      signedContext: [],
    };

    const takeOrdersConfigStruct: TakeOrdersConfigStruct = {
      output: tokenA.address,
      input: tokenB.address,
      minimumInput: amountB.mul(2),
      maximumInput: amountB.mul(2),
      maximumIORatio: ratio_A,
      orders: [takeOrderConfigStructAlice, takeOrderConfigStructBob],
    };

    const amountA = amountB.mul(ratio_A).div(ONE);
    await tokenA.transfer(carol.address, amountA.mul(2));
    await tokenA.connect(carol).approve(orderBook.address, amountA.mul(2));

    const txTakeOrders = await orderBook
      .connect(carol)
      .takeOrders(takeOrdersConfigStruct);

    console.log("txTakeOrders: ", txTakeOrders.hash);

    const events = (await getEvents(
      txTakeOrders,
      "TakeOrder",
      orderBook
    )) as TakeOrderEvent["args"][];

    const contextEvents = (await getEvents(
      txTakeOrders,
      "Context",
      orderBook
    )) as ContextEvent["args"][];

    assert(
      events.length === 2,
      `wrong number of TakeOrder events
      expected  2
      got       ${events.length}`
    );

    const [takeOrderAlice, takeOrderBob] = events;

    assert(takeOrderAlice.sender === carol.address, "wrong sender");
    assert(takeOrderAlice.input.eq(amountB), "wrong input");
    assert(takeOrderAlice.output.eq(amountA), "wrong output");
    compareStructs(takeOrderAlice.config, takeOrderConfigStructAlice);

    assert(takeOrderBob.sender === carol.address, "wrong sender");
    assert(takeOrderBob.input.eq(amountB), "wrong input");
    assert(takeOrderBob.output.eq(amountA), "wrong output");
    compareStructs(takeOrderBob.config, takeOrderConfigStructBob);

    const tokenAAliceBalance = await tokenA.balanceOf(alice.address);
    const tokenBAliceBalance = await tokenB.balanceOf(alice.address);
    const tokenABobBalance = await tokenA.balanceOf(bob.address);
    const tokenBBobBalance = await tokenB.balanceOf(bob.address);
    const tokenACarolBalance = await tokenA.balanceOf(carol.address);
    const tokenBCarolBalance = await tokenB.balanceOf(carol.address);

    assert(tokenAAliceBalance.isZero()); // Alice has not yet withdrawn
    assert(tokenBAliceBalance.isZero());
    assert(tokenABobBalance.isZero()); // Bob has not yet withdrawn
    assert(tokenBBobBalance.isZero());
    assert(tokenACarolBalance.isZero());
    assert(tokenBCarolBalance.eq(amountB.mul(2)));

    await orderBook.connect(alice).withdraw({
      token: tokenA.address,
      vaultId: aliceInputVault,
      amount: amountA,
    });
    await orderBook.connect(bob).withdraw({
      token: tokenA.address,
      vaultId: bobInputVault,
      amount: amountA,
    });

    const tokenAAliceBalanceWithdrawn = await tokenA.balanceOf(alice.address);
    const tokenABobBalanceWithdrawn = await tokenA.balanceOf(bob.address);
    assert(tokenAAliceBalanceWithdrawn.eq(amountA));
    assert(tokenABobBalanceWithdrawn.eq(amountA));

    const see = contextEvents[0];
    console.log("finished");
    console.log("Msg.sender: ", see.sender);
    console.log("contract ob: ", orderBook.address);
    console.log("===============");
    console.log("Topics");
    console.log("AddOrder", orderBook.interface.getEventTopic("AddOrder"));
    console.log("AfterClear", orderBook.interface.getEventTopic("AfterClear"));
    console.log("Clear", orderBook.interface.getEventTopic("Clear"));
    console.log("Context", orderBook.interface.getEventTopic("Context"));
    console.log("Deposit", orderBook.interface.getEventTopic("Deposit"));
    console.log(
      "Initialized",
      orderBook.interface.getEventTopic("Initialized")
    );
    console.log("MetaV1", orderBook.interface.getEventTopic("MetaV1"));
    console.log(
      "OrderExceedsMaxRatio",
      orderBook.interface.getEventTopic("OrderExceedsMaxRatio")
    );
    console.log(
      "OrderNotFound",
      orderBook.interface.getEventTopic("OrderNotFound")
    );
    console.log(
      "OrderZeroAmount",
      orderBook.interface.getEventTopic("OrderZeroAmount")
    );
    console.log(
      "RemoveOrder",
      orderBook.interface.getEventTopic("RemoveOrder")
    );
    console.log(
      "RemoveOrder",
      orderBook.interface.getEventTopic("RemoveOrder")
    );
    console.log("TakeOrder", orderBook.interface.getEventTopic("TakeOrder"));
    console.log("Withdraw", orderBook.interface.getEventTopic("Withdraw"));
    console.log("===============");

    // "Deposit(address,tuple)": EventFragment;
    // "Initialized(uint8)": EventFragment;

    // "MetaV1(address,uint256,bytes)": EventFragment;
    // "OrderExceedsMaxRatio(address,address,uint256)": EventFragment;
    // "OrderNotFound(address,address,uint256)": EventFragment;
    // "OrderZeroAmount(address,address,uint256)": EventFragment;
    // "RemoveOrder(address,tuple,uint256)": EventFragment;
    // "TakeOrder(address,tuple,uint256,uint256)": EventFragment;
    // "Withdraw(address,tuple,uint256)": EventFragment;
    orderBook.interface.events;
    console.log("context: ");
    console.log(JSON.stringify(see.context, null, 2));
    // await waitForSubgraphToBeSynced();
  });

  it("should query TakeOrderEntity correctly with signedContext", async function () {
    const [, alice, bob, goodSigner] = signers;

    const aliceInputVault = ethers.BigNumber.from(randomUint256());
    const aliceOutputVault = ethers.BigNumber.from(randomUint256());

    const aliceOrder = encodeMeta("Order_A");

    // ASK ORDER

    const ratio_A = ethers.BigNumber.from("90" + eighteenZeros);

    const OrderConfig_A: OrderConfigStruct = await getOrderConfig(
      ratio_A,
      max_uint256,
      tokenA.address,
      18,
      aliceInputVault,
      tokenB.address,
      18,
      aliceOutputVault,
      aliceOrder
    );

    const txAddOrder = await orderBook.connect(alice).addOrder(OrderConfig_A);

    const { order: Order_A } = (await getEventArgs(
      txAddOrder,
      "AddOrder",
      orderBook
    )) as AddOrderEvent["args"];

    // DEPOSIT

    const amountB = ethers.BigNumber.from("2" + eighteenZeros);

    const depositConfigStructAlice: DepositConfigStruct = {
      token: tokenB.address,
      vaultId: aliceOutputVault,
      amount: amountB,
    };

    await tokenB.transfer(alice.address, amountB);
    await tokenB
      .connect(alice)
      .approve(orderBook.address, depositConfigStructAlice.amount);

    // Alice deposits tokenB into her output vault
    const txDepositOrderAlice = await orderBook
      .connect(alice)
      .deposit(depositConfigStructAlice);

    const { sender: depositAliceSender, config: depositAliceConfig } =
      (await getEventArgs(
        txDepositOrderAlice,
        "Deposit",
        orderBook
      )) as DepositEvent["args"];

    assert(depositAliceSender === alice.address);
    compareStructs(depositAliceConfig, depositConfigStructAlice);

    // TODO: REMOVE

    const context0 = [1, 2, 3];
    const hash0 = solidityKeccak256(["uint256[]"], [context0]);
    const goodSignature0 = await goodSigner.signMessage(arrayify(hash0));

    const context1 = [4, 5, 6];
    const hash1 = solidityKeccak256(["uint256[]"], [context1]);
    const goodSignature1 = await goodSigner.signMessage(arrayify(hash1));

    const signedContexts0: SignedContextV1Struct[] = [
      {
        signer: goodSigner.address,
        signature: goodSignature0,
        context: context0,
      },
      {
        signer: goodSigner.address,
        signature: goodSignature1,
        context: context1,
      },
    ];

    //////////////

    // TAKE ORDER

    // Bob takes order with direct wallet transfer
    const takeOrderConfigStruct: TakeOrderConfigStruct = {
      order: Order_A,
      inputIOIndex: 0,
      outputIOIndex: 0,
      signedContext: signedContexts0,
      // signedContext: [],
    };

    const takeOrdersConfigStruct: TakeOrdersConfigStruct = {
      output: tokenA.address,
      input: tokenB.address,
      minimumInput: amountB,
      maximumInput: amountB,
      maximumIORatio: ratio_A,
      orders: [takeOrderConfigStruct],
    };

    const amountA = amountB.mul(ratio_A).div(ONE);
    await tokenA.transfer(bob.address, amountA);
    await tokenA.connect(bob).approve(orderBook.address, amountA);

    const txTakeOrders = await orderBook
      .connect(bob)
      .takeOrders(takeOrdersConfigStruct);

    const takeOrderEvents = (await getEvents(
      txTakeOrders,
      "TakeOrder",
      orderBook
    )) as Array<TakeOrderEvent["args"]>;

    const contextEvents = (await getEvents(
      txTakeOrders,
      "Context",
      orderBook
    )) as ContextEvent["args"][];

    console.log("finished");
    for (let i = 0; i < contextEvents.length; i++) {
      const contextEvent = contextEvents[0];
      console.log("=============================");
      console.log("=============================");
      console.log("Context number: ", i);
      console.log("Msg.sender: ", contextEvent.sender);
      console.log("contract ob: ", orderBook.address);
      console.log("context: ");
      console.log(JSON.stringify(contextEvent.context, null, 2));
      ////
    }
    console.log("=============================");
    console.log("=============================");

    const tokenAAliceBalance = await tokenA.balanceOf(alice.address);
    const tokenBAliceBalance = await tokenB.balanceOf(alice.address);
    const tokenABobBalance = await tokenA.balanceOf(bob.address);
    const tokenBBobBalance = await tokenB.balanceOf(bob.address);

    assert(tokenAAliceBalance.isZero()); // Alice has not yet withdrawn
    assert(tokenBAliceBalance.isZero());
    assert(tokenABobBalance.isZero());
    assert(tokenBBobBalance.eq(amountB));

    await orderBook.connect(alice).withdraw({
      token: tokenA.address,
      vaultId: aliceInputVault,
      amount: amountA,
    });

    const tokenAAliceBalanceWithdrawn = await tokenA.balanceOf(alice.address);
    assert(tokenAAliceBalanceWithdrawn.eq(amountA));

    // Subgraph check
    await waitForSubgraphToBeSynced();

    for (let i = 0; i < takeOrderEvents.length; i++) {
      // ID: tx.hash - N (N-th order taken)
      const takeOrderEntity_ID = `${txTakeOrders.hash.toLowerCase()}-${i}`;
      const { sender, config, input, output } = takeOrderEvents[i];

      const { order, inputIOIndex, outputIOIndex } = config;
      const inputToken = `${order.validInputs[inputIOIndex.toNumber()].token}`;
      const outputToken = `${
        order.validOutputs[outputIOIndex.toNumber()].token
      }`;

      const query = `{
        takeOrderEntity (id: "${takeOrderEntity_ID}") {
          input
          output
          inputIOIndex
          outputIOIndex
          sender {
            id
          }
          inputToken {
            id
          }
          outputToken {
            id
          }
        }
      }`;

      const response = (await subgraph({ query })) as FetchResult;
      const data = response.data.takeOrderEntity;

      assert.equal(data.input, input.toString());
      assert.equal(data.output, output.toString());
      assert.equal(data.inputIOIndex, inputIOIndex.toString());
      assert.equal(data.outputIOIndex, outputIOIndex.toString());

      assert.equal(data.sender.id, sender.toLowerCase());
      assert.equal(data.inputToken.id, inputToken.toLowerCase());
      assert.equal(data.outputToken.id, outputToken.toLowerCase());
    }
  });
});
