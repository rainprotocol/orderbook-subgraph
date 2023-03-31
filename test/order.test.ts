import assert from "assert";
import { expect } from "chai";
import { FetchResult } from "apollo-fetch";
import { orderBook, signers, subgraph } from "./0_initialization.test";
import { RainterpreterExpressionDeployer, ReserveToken18 } from "../typechain";
import {
  MemoryType,
  ONE,
  Opcode,
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
  IOStructOutput,
  OrderConfigStruct,
} from "../typechain/contracts/orderbook/OrderBook";
import {
  getEventArgs,
  getTxTimeblock,
  waitForSubgraphToBeSynced,
} from "./utils";

async function getInterpretersFromDeployer(deployerAddress: string) {
  const expressionDeployer = (await ethers.getContractAt(
    "RainterpreterExpressionDeployer",
    deployerAddress
  )) as RainterpreterExpressionDeployer;

  return {
    deployer: deployerAddress,
    store: await expressionDeployer.store(),
    rainterpreter: await expressionDeployer.interpreter(),
  };
}

/**
 * @param hexOrderHash_ Order hash emitted
 * @param arrayIO_ The order IO data (input OR output)
 * @param dataIO_ The arrays of (input OR output) ID's to check agaisnt `arrayIO_`
 */
function checkIO(
  hexOrderHash_: string,
  arrayIO_: IOStructOutput[],
  dataIO_: any
) {
  const length = arrayIO_.length;
  for (let i = 0; i < length; i++) {
    const IOToken = arrayIO_[i].token.toLowerCase();
    const IOVault = arrayIO_[i].vaultId;

    // ID = `order.hash() - IO.token - IO.vaultId`
    const IO_ID = `${hexOrderHash_.toLowerCase()}-${IOToken}-${IOVault}`;
    expect(dataIO_).to.deep.include({
      id: IO_ID,
    });
  }
}

describe("Order entity", () => {
  let tokenA: ReserveToken18;
  let tokenB: ReserveToken18;

  beforeEach(async () => {
    tokenA = (await basicDeploy("ReserveToken18", {})) as ReserveToken18;
    tokenB = (await basicDeploy("ReserveToken18", {})) as ReserveToken18;
  });

  it("should query the Order after adding an order", async () => {
    const [, alice, bob] = signers;

    const aliceInputVault = ethers.BigNumber.from(randomUint256());
    const aliceOutputVault = ethers.BigNumber.from(randomUint256());
    const bobInputVault = ethers.BigNumber.from(randomUint256());
    const bobOutputVault = ethers.BigNumber.from(randomUint256());

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
    // Get Interpreters from ExpressionDeployer address

    const {
      deployer,
      store,
      rainterpreter,
    } = await getInterpretersFromDeployer(ExpressionDeployer_A);

    const [, addTimestamp] = await getTxTimeblock(txOrder_A);

    const query = `{
      order (id: "${orderHash.toHexString().toLowerCase()}") {
        transactionHash
        owner
        interpreter
        interpreterStore
        expressionDeployer
        expression
        orderActive
        handleIO
        timestamp
        meta {
          id
        }
        validInputs {
          id
        }
        validOutputs {
          id
        }
      }
    }`;

    const response = (await subgraph({ query })) as FetchResult;

    const data = response.data.order;

    assert.equal(data.transactionHash, txOrder_A.hash.toLowerCase());
    assert.equal(data.owner, sender_A.toLowerCase());

    assert.equal(data.interpreter, rainterpreter.toLowerCase());
    assert.equal(data.interpreterStore, store.toLowerCase());
    assert.equal(data.expressionDeployer, deployer.toLowerCase());
    assert.equal(
      data.expression,
      order_A.evaluable.expression.toLowerCase(),
      "Wrong expression address"
    );
    assert.equal(data.orderActive, true);
    assert.equal(data.handleIO, order_A.handleIO);
    assert.equal(data.timestamp, addTimestamp);

    // TODO: Add suport for MetaV1 entities @naneez
    // assert.equal(data.meta.id, '');

    // TODO: Review checks @vishal
    // Checking every validInputs
    checkIO(orderHash.toHexString(), order_A.validInputs, data.validInputs);

    // Checking every validOutputs
    checkIO(orderHash.toHexString(), order_A.validOutputs, data.validOutputs);
  });

  it("should query multiple Orders when adding orders");
  it("should update the orderActive field when removing an order");
  it("should update orderActive field when removing and adding again an order");
});
