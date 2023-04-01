import assert from "assert";
import { expect } from "chai";
import { FetchResult } from "apollo-fetch";
import { orderBook, signers, subgraph } from "./0_initialization.test";
import { RainterpreterExpressionDeployer, ReserveToken18 } from "../typechain";
import {
  MemoryType,
  ONE,
  Opcode,
  assertError,
  basicDeploy,
  compareStructs,
  eighteenZeros,
  fixedPointDiv,
  generateEvaluableConfig,
  max_uint256,
  memoryOperand,
  op,
  randomUint256,
} from "../utils";
import { ethers } from "hardhat";
import { encodeMeta } from "../utils/orderBook/order";
import { concat } from "ethers/lib/utils";
import {
  AddOrderEvent,
  DepositEvent,
  IOStructOutput,
  OrderConfigStruct,
  RemoveOrderEvent,
  WithdrawConfigStruct,
  WithdrawEvent,
} from "../typechain/contracts/orderbook/OrderBook";
import {
  getEventArgs,
  getTxTimeblock,
  waitForSubgraphToBeSynced,
} from "./utils";
import { DepositConfigStruct } from "../typechain/contracts/orderbook/IOrderBookV1";

describe("Vault entity", () => {
  let tokenA: ReserveToken18;
  let tokenB: ReserveToken18;

  beforeEach(async () => {
    tokenA = (await basicDeploy("ReserveToken18", {})) as ReserveToken18;
    tokenB = (await basicDeploy("ReserveToken18", {})) as ReserveToken18;
  });

  it("should query the Vault after adding an order", async () => {
    const [, alice] = signers;

    const aliceInputVault = ethers.BigNumber.from(randomUint256());
    const aliceOutputVault = ethers.BigNumber.from(randomUint256());

    // TODO: This is a WRONG encoding meta (FIX: @naneez)
    const aliceOrder = encodeMeta("Order_A");

    // Order_A
    const ratio_A = ethers.BigNumber.from("90" + eighteenZeros);
    const constants_A = [max_uint256, ratio_A];
    const aOpMax = op(
      Opcode.read_memory,
      memoryOperand(MemoryType.Constant, 0)
    );
    const aRatio = op(
      Opcode.read_memory,
      memoryOperand(MemoryType.Constant, 1)
    );
    // prettier-ignore
    const source_A = concat([
      aOpMax,
      aRatio,
    ]);

    const EvaluableConfig_A = await generateEvaluableConfig(
      [source_A, []],
      constants_A
    );

    const orderConfig_A: OrderConfigStruct = {
      validInputs: [
        { token: tokenA.address, decimals: 18, vaultId: aliceInputVault },
      ],
      validOutputs: [
        { token: tokenB.address, decimals: 18, vaultId: aliceOutputVault },
      ],
      evaluableConfig: EvaluableConfig_A,
      meta: aliceOrder,
    };

    const txOrder_A = await orderBook.connect(alice).addOrder(orderConfig_A);

    const {
      sender: sender_A,
      expressionDeployer: ExpressionDeployer_A,
      order: order_A,
      orderHash,
    } = (await getEventArgs(
      txOrder_A,
      "AddOrder",
      orderBook
    )) as AddOrderEvent["args"];

    assert(
      ExpressionDeployer_A === EvaluableConfig_A.deployer,
      "wrong expression deployer"
    );
    assert(sender_A === alice.address, "wrong sender");
    compareStructs(order_A, orderConfig_A);

    await waitForSubgraphToBeSynced();

    // Subgraph check
    const vault_input_ID = `${aliceInputVault.toString()}-${alice.address.toLowerCase()}`;
    const vault_output_ID = `${aliceOutputVault.toString()}-${alice.address.toLowerCase()}`;

    // #{vaultId}-{owner}-{token}
    const tokenVault_Input_ID = `${aliceInputVault.toString()}-${alice.address.toLowerCase()}-${tokenA.address.toLowerCase()}`;
    const tokenVault_Output_ID = `${aliceOutputVault.toString()}-${alice.address.toLowerCase()}-${tokenB.address.toLowerCase()}`;

    const query = `{
      vaultInput: vault (id: "${vault_input_ID}") {
        owner
        tokenVaults {
          id
        }
        deposits {
          id
        }
        withdraws {
          id
        }
      }
      vaultOutput: vault (id: "${vault_output_ID}") {
        owner
        tokenVaults {
          id
        }
        deposits {
          id
        }
        withdraws {
          id
        }
      }
    }`;

    const response = (await subgraph({ query })) as FetchResult;

    const dataInput = response.data.vaultInput;
    const dataOutput = response.data.vaultOutput;

    // VaultInput
    assert.equal(dataInput.owner, alice.address.toLowerCase());
    expect(dataInput.tokenVaults).to.deep.include({
      id: tokenVault_Input_ID,
    });
    expect(dataInput.deposits).to.be.empty;
    expect(dataInput.withdraws).to.be.empty;

    // VaultOutput
    assert.equal(dataOutput.owner, alice.address.toLowerCase());
    expect(dataOutput.tokenVaults).to.deep.include({
      id: tokenVault_Output_ID,
    });
    expect(dataOutput.deposits).to.be.empty;
    expect(dataOutput.withdraws).to.be.empty;
  });

  it("should query the Vault after deposits", async function() {
    const signers = await ethers.getSigners();

    const [, alice] = signers;

    const aliceOutputVault = ethers.BigNumber.from(randomUint256());
    const amount = ethers.BigNumber.from("1000" + eighteenZeros);

    await tokenA.transfer(alice.address, amount);
    await tokenB.transfer(alice.address, amount);

    // Deposit config using different tokens
    const depositConfigStructAlice_A: DepositConfigStruct = {
      token: tokenA.address,
      vaultId: aliceOutputVault,
      amount: amount,
    };
    const depositConfigStructAlice_B: DepositConfigStruct = {
      token: tokenB.address,
      vaultId: aliceOutputVault,
      amount: amount,
    };

    await tokenA
      .connect(alice)
      .approve(orderBook.address, depositConfigStructAlice_A.amount);
    await tokenB
      .connect(alice)
      .approve(orderBook.address, depositConfigStructAlice_B.amount);

    // Alice deposits both tokens into her output vault
    const txDepositOrderAlice_A = await orderBook
      .connect(alice)
      .deposit(depositConfigStructAlice_A);
    const txDepositOrderAlice_B = await orderBook
      .connect(alice)
      .deposit(depositConfigStructAlice_B);

    const {
      sender: depositAliceSender_A,
      config: depositAliceConfig_A,
    } = (await getEventArgs(
      txDepositOrderAlice_A,
      "Deposit",
      orderBook
    )) as DepositEvent["args"];
    const {
      sender: depositAliceSender_B,
      config: depositAliceConfig_B,
    } = (await getEventArgs(
      txDepositOrderAlice_B,
      "Deposit",
      orderBook
    )) as DepositEvent["args"];

    // Checking Config A
    assert(depositAliceSender_A === alice.address);
    compareStructs(depositAliceConfig_A, depositConfigStructAlice_A);
    // Checking Config B
    assert(depositAliceSender_B === alice.address);
    compareStructs(depositAliceConfig_B, depositConfigStructAlice_B);

    // Both config used the same VaultID
    assert(
      depositAliceConfig_A.vaultId.eq(depositAliceConfig_B.vaultId),
      "Wrong: Not the same VaultID in deposits"
    );

    await waitForSubgraphToBeSynced();

    // Subgraph check
    const vault_ID = `${depositAliceConfig_A.vaultId.toString()}-${alice.address.toLowerCase()}`;

    // #{vaultId}-{owner}-{token}
    const tokenVault_A_ID = `${depositAliceConfig_A.vaultId.toString()}-${alice.address.toLowerCase()}-${tokenA.address.toLowerCase()}`;
    const tokenVault_B_ID = `${depositAliceConfig_B.vaultId.toString()}-${alice.address.toLowerCase()}-${tokenB.address.toLowerCase()}`;

    const query = `{
        vault (id: "${vault_ID}") {
          owner
          tokenVaults {
            id
          }
          deposits {
            id
          }
        }
      }`;

    const response = (await subgraph({ query })) as FetchResult;

    const data = response.data.vault;

    assert.equal(data.owner, alice.address.toLowerCase());
    expect(data.tokenVaults).to.deep.include({
      id: tokenVault_A_ID,
    });
    expect(data.tokenVaults).to.deep.include({
      id: tokenVault_B_ID,
    });

    // TODO: Should change the ID to other diff than Tx.hash(). @naneez @vishal
    expect(data.deposits).to.deep.include({
      id: txDepositOrderAlice_A.hash.toLowerCase(),
    });
    expect(data.deposits).to.deep.include({
      id: txDepositOrderAlice_B.hash.toLowerCase(),
    });
  });

  it("should update the Vault after adding an order and deposit", async () => {
    const [, alice] = signers;

    const aliceInputVault = ethers.BigNumber.from(randomUint256());
    const aliceOutputVault = ethers.BigNumber.from(randomUint256());

    // TODO: This is a WRONG encoding meta (FIX: @naneez)
    const aliceOrder = encodeMeta("Order_A");

    // Order_A
    const ratio_A = ethers.BigNumber.from("90" + eighteenZeros);
    const constants_A = [max_uint256, ratio_A];
    const aOpMax = op(
      Opcode.read_memory,
      memoryOperand(MemoryType.Constant, 0)
    );
    const aRatio = op(
      Opcode.read_memory,
      memoryOperand(MemoryType.Constant, 1)
    );
    // prettier-ignore
    const source_A = concat([
      aOpMax,
      aRatio,
    ]);

    const EvaluableConfig_A = await generateEvaluableConfig(
      [source_A, []],
      constants_A
    );

    const orderConfig_A: OrderConfigStruct = {
      validInputs: [
        { token: tokenA.address, decimals: 18, vaultId: aliceInputVault },
      ],
      validOutputs: [
        { token: tokenB.address, decimals: 18, vaultId: aliceOutputVault },
      ],
      evaluableConfig: EvaluableConfig_A,
      meta: aliceOrder,
    };

    const txOrder_A = await orderBook.connect(alice).addOrder(orderConfig_A);

    const {
      sender: sender_A,
      expressionDeployer: ExpressionDeployer_A,
      order: order_A,
      orderHash,
    } = (await getEventArgs(
      txOrder_A,
      "AddOrder",
      orderBook
    )) as AddOrderEvent["args"];

    assert(
      ExpressionDeployer_A === EvaluableConfig_A.deployer,
      "wrong expression deployer"
    );
    assert(sender_A === alice.address, "wrong sender");
    compareStructs(order_A, orderConfig_A);

    // Deposit into the same INPUT vault
    const amount = ethers.BigNumber.from("1000" + eighteenZeros);
    await tokenA.transfer(alice.address, amount);
    const depositConfigStructAlice: DepositConfigStruct = {
      token: tokenB.address,
      vaultId: aliceInputVault,
      amount: amount,
    };
    await tokenA
      .connect(alice)
      .approve(orderBook.address, depositConfigStructAlice.amount);

    // Alice deposits tokenA into her output vault
    const txDepositOrderAlice = await orderBook
      .connect(alice)
      .deposit(depositConfigStructAlice);

    const {
      sender: depositAliceSender,
      config: depositAliceConfig,
    } = (await getEventArgs(
      txDepositOrderAlice,
      "Deposit",
      orderBook
    )) as DepositEvent["args"];

    assert(depositAliceSender === alice.address);
    compareStructs(depositAliceConfig, depositConfigStructAlice);

    // Wait for sync
    await waitForSubgraphToBeSynced();

    // Subgraph check
    const vault_input_ID = `${aliceInputVault.toString()}-${alice.address.toLowerCase()}`;

    const query = `{
      vault (id: "${vault_input_ID}") {
        deposits {
          id
        }
      }
    }`;

    const response = (await subgraph({ query })) as FetchResult;

    const data = response.data.vault;

    // TODO: Should change the ID to other diff than Tx.hash(). @naneez @vishal
    expect(data.deposits).to.deep.include({
      id: txDepositOrderAlice.hash.toLowerCase(),
    });
  });

  it("should update the Vault after withdrawals from vaults", async function() {
    const signers = await ethers.getSigners();
    const [, alice] = signers;

    const vaultId = ethers.BigNumber.from(1);

    // DEPOSIT
    const amount = ethers.BigNumber.from("1000" + eighteenZeros);
    await tokenA.transfer(alice.address, amount);

    const depositConfigStruct: DepositConfigStruct = {
      token: tokenA.address,
      vaultId,
      amount,
    };

    await tokenA
      .connect(alice)
      .approve(orderBook.address, depositConfigStruct.amount);

    // Alice deposits tokenA into her non-append-only vault
    const txDeposit = await orderBook
      .connect(alice)
      .deposit(depositConfigStruct);

    const {
      sender: depositSender,
      config: depositConfig,
    } = (await getEventArgs(
      txDeposit,
      "Deposit",
      orderBook
    )) as DepositEvent["args"];

    assert(depositSender === alice.address);
    compareStructs(depositConfig, depositConfigStruct);

    const aliceTokenABalance0 = await tokenA.balanceOf(alice.address);

    const withdrawConfigStruct: WithdrawConfigStruct = {
      token: tokenA.address,
      vaultId: vaultId,
      amount,
    };

    const txWithdraw = await orderBook
      .connect(alice)
      .withdraw(withdrawConfigStruct);

    const {
      sender: withdrawSender,
      config: withdrawConfig,
    } = (await getEventArgs(
      txWithdraw,
      "Withdraw",
      orderBook
    )) as WithdrawEvent["args"];

    assert(withdrawSender === alice.address);
    compareStructs(withdrawConfig, withdrawConfigStruct);

    const aliceTokenABalance1 = await tokenA.balanceOf(alice.address);

    assert(aliceTokenABalance0.isZero());
    assert(aliceTokenABalance1.eq(amount));

    // Checking the VaultIDs
    assert(
      depositConfig.vaultId.eq(withdrawConfig.vaultId),
      "Deposit and Withdraw does not have the same VaultID"
    );

    // Wait for sync
    await waitForSubgraphToBeSynced();

    // Subgraph check
    const vault_input_ID = `${depositConfig.vaultId.toString()}-${alice.address.toLowerCase()}`;

    const query = `{
     vault (id: "${vault_input_ID}") {
      withdraws {
         id
       }
     }
   }`;

    const response = (await subgraph({ query })) as FetchResult;

    const data = response.data.vault;

    // TODO: Should change the ID to other diff than Tx.hash(). @naneez @vishal
    expect(data.withdraws).to.deep.include({
      id: txWithdraw.hash.toLowerCase(),
    });
  });
});