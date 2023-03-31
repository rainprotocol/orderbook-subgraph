import {
  Bounty,
  IO,
  Order,
  OrderBook,
  OrderClear,
  OrderClearStateChange,
  RainMetaV1,
  TakeOrderEntity,
  VaultDeposit,
  VaultWithdraw,
} from "../generated/schema";
import {
  AddOrder,
  AfterClear,
  Clear,
  Context,
  Deposit,
  MetaV1,
  OrderExceedsMaxRatio,
  OrderNotFound,
  OrderZeroAmount,
  RemoveOrder,
  TakeOrder,
  Withdraw,
  Initialized,
  ClearAliceStruct,
} from "../generated/OrderBook/OrderBook";
import {
  Address,
  ByteArray,
  Bytes,
  JSONValue,
  crypto,
  json,
  log,
} from "@graphprotocol/graph-ts";
import {
  createAccount,
  createMetaContentV1,
  createOrder,
  createToken,
  createTokenVault,
  createVault,
  hashTakeOrderConfig,
  stringToArrayBuffer,
} from "./utiils";
import { CBORDecoder } from "@rainprotocol/assemblyscript-cbor";
import {
  Obj,
  Sequence,
} from "@rainprotocol/assemblyscript-cbor/assembly/types";

export function handleAddOrder(event: AddOrder): void {
  let order = new Order(event.params.orderHash.toHex());
  order.transactionHash = event.transaction.hash;
  order.owner = createAccount(event.params.order.owner).id;
  order.expressionDeployer = event.params.expressionDeployer;
  order.expression = event.params.order.evaluable.expression;
  order.interpreter = event.params.order.evaluable.interpreter;
  order.interpreterStore = event.params.order.evaluable.store;
  order.handleIO = event.params.order.handleIO;
  order.orderActive = true;

  for (let i = 0; i < event.params.order.validInputs.length; i++) {
    let input = new IO(`${event.params.orderHash.toHex()}-${i.toString()}`);
    input.token = createToken(event.params.order.validInputs[i].token).id;
    input.decimals = event.params.order.validInputs[i].decimals;
    input.vault = createVault(
      event.params.order.validInputs[i].vaultId.toString(),
      event.params.order.owner
    ).id;
    input.order = event.params.orderHash.toHex();
    input.save();
  }

  for (let i = 0; i < event.params.order.validOutputs.length; i++) {
    let input = new IO(`${event.params.orderHash.toHex()}-${i.toString()}`);
    input.token = createToken(event.params.order.validOutputs[i].token).id;
    input.decimals = event.params.order.validOutputs[i].decimals;
    input.vault = createVault(
      event.params.order.validOutputs[i].vaultId.toString(),
      event.params.order.owner
    ).id;
    input.order = event.params.orderHash.toHex();
    input.save();
  }

  order.timestamp = event.block.timestamp;
  order.save();
}

export function handleAfterClear(event: AfterClear): void {
  let orderClearStateChange = new OrderClearStateChange(
    event.block.timestamp.toString()
  );
  orderClearStateChange.orderClear = event.block.timestamp.toString();
  orderClearStateChange.aInput = event.params.clearStateChange.aliceInput;
  orderClearStateChange.aOutput = event.params.clearStateChange.aliceOutput;
  orderClearStateChange.bInput = event.params.clearStateChange.bobInput;
  orderClearStateChange.bOutput = event.params.clearStateChange.bobOutput;
  orderClearStateChange.save();

  let bounty = Bounty.load(event.block.timestamp.toString());
  if (bounty) {
    bounty.bountyAmountA = event.params.clearStateChange.aliceOutput.minus(
      event.params.clearStateChange.bobInput
    );
    bounty.bountyAmountB = event.params.clearStateChange.bobOutput.minus(
      event.params.clearStateChange.aliceInput
    );
    bounty.save();
  }
}

export function handleClear(event: Clear): void {
  let orderClear = new OrderClear(event.block.timestamp.toString());
  orderClear.sender = createAccount(event.params.sender).id;
  orderClear.clearer = createAccount(event.params.sender).id;
  orderClear.orderA = createOrder(event.params.alice).id;
  orderClear.orderB = createOrder(
    changetype<ClearAliceStruct>(event.params.bob)
  ).id;
  orderClear.owners = [
    createAccount(event.params.alice.owner).id,
    createAccount(event.params.bob.owner).id,
  ];
  orderClear.aInputIOIndex = event.params.clearConfig.aliceInputIOIndex;
  orderClear.aOutputIOIndex = event.params.clearConfig.aliceOutputIOIndex;
  orderClear.bInputIOIndex = event.params.clearConfig.bobInputIOIndex;
  orderClear.bOutputIOIndex = event.params.clearConfig.bobOutputIOIndex;
  orderClear.save();

  let bounty = new Bounty(event.block.timestamp.toString());
  bounty.clearer = createAccount(event.params.sender).id;
  bounty.orderClear = orderClear.id;
  bounty.bountyVaultA = createVault(
    event.params.clearConfig.aliceBountyVaultId.toString(),
    event.params.sender
  ).id;
  bounty.bountyVaultB = createVault(
    event.params.clearConfig.bobBountyVaultId.toString(),
    event.params.sender
  ).id;

  bounty.bountyTokenA = createToken(
    event.params.alice.validOutputs[
      event.params.clearConfig.aliceOutputIOIndex.toI32()
    ].token
  ).id;
  bounty.bountyTokenB = createToken(
    event.params.bob.validOutputs[
      event.params.clearConfig.bobOutputIOIndex.toI32()
    ].token
  ).id;
  bounty.save();
}

export function handleContext(event: Context): void {}

export function handleDeposit(event: Deposit): void {
  let tokenVault = createTokenVault(
    event.params.config.vaultId.toHex(),
    event.params.sender,
    event.params.config.token
  );

  if (tokenVault) {
    tokenVault.balance = tokenVault.balance.plus(event.params.config.amount);
    tokenVault.save();
  }

  let vaultDeposit = new VaultDeposit(event.transaction.hash);
  vaultDeposit.sender = createAccount(event.params.sender).id;
  vaultDeposit.token = createToken(event.params.config.token).id;
  vaultDeposit.vaultId = event.params.config.vaultId;
  vaultDeposit.vault = createVault(
    event.params.config.vaultId.toHex(),
    event.params.sender
  ).id;
  vaultDeposit.amount = event.params.config.amount;
  vaultDeposit.tokenVault = tokenVault.id;
  vaultDeposit.save();
}

export function handleOrderExceedsMaxRatio(event: OrderExceedsMaxRatio): void {}

export function handleOrderNotFound(event: OrderNotFound): void {}

export function handleOrderZeroAmount(event: OrderZeroAmount): void {}

export function handleRemoveOrder(event: RemoveOrder): void {}

export function handleTakeOrder(event: TakeOrder): void {
  let orderEntity = new TakeOrderEntity(
    hashTakeOrderConfig(event.params.config)
  );
  orderEntity.sender = createAccount(event.params.sender).id;
  orderEntity.order = createOrder(
    changetype<ClearAliceStruct>(event.params.config.order)
  ).id;
  orderEntity.input = event.params.input;
  orderEntity.output = event.params.output;
  orderEntity.inputIOIndex = event.params.config.inputIOIndex;
  orderEntity.outputIOIndex = event.params.config.outputIOIndex;
  orderEntity.inputToken = createToken(
    event.params.config.order.validInputs[
      event.params.config.inputIOIndex.toI32()
    ].token
  ).id;
  orderEntity.inputToken = createToken(
    event.params.config.order.validOutputs[
      event.params.config.outputIOIndex.toI32()
    ].token
  ).id;
  orderEntity.save();
}

export function handleWithdraw(event: Withdraw): void {
  let tokenVault = createTokenVault(
    event.params.config.vaultId.toHex(),
    event.params.sender,
    event.params.config.token
  );

  if (tokenVault) {
    tokenVault.balance = tokenVault.balance.minus(event.params.config.amount);
    tokenVault.save();
  }

  let vaultWithdraw = new VaultWithdraw(event.transaction.hash);
  vaultWithdraw.sender = createAccount(event.params.sender).id;
  vaultWithdraw.token = createToken(event.params.config.token).id;
  vaultWithdraw.vaultId = event.params.config.vaultId;
  vaultWithdraw.vault = createVault(
    event.params.config.vaultId.toHex(),
    event.params.sender
  ).id;
  vaultWithdraw.requestedAmount = event.params.config.amount;
  vaultWithdraw.amount = event.params.amount;
  vaultWithdraw.tokenVault = tokenVault.id;
  vaultWithdraw.save();
}

export function handleInitialized(event: Initialized): void {
  let orderBook = new OrderBook(event.address);

  orderBook.address = event.address;
  orderBook.deployer = event.transaction.from;
  orderBook.save();
}

export function handleMetaV1(event: MetaV1): void {
  // TODO: Use `event.params.subject.toHex()` to check if the Subject match with the
  // MetaV1 emmiter. if that's the case, then this MetaV1 event is from OB construction
  // and should be added to the OB entity. Otherwise, is emitted somewhere else (like AddOrder)
  // const addBN = Address.fromBigInt(event.params.subject);
  // const addHS = Address.fromHexString(event.params.subject.toHexString());

  // // let orderBook = new OrderBook(event.address);

  // // let rainMetaV1_ID = Bytes.fromByteArray(
  // //   crypto.keccak256(Bytes.fromByteArray(event.params.meta))
  // // );
  // // let rainMetaV1 = new RainMetaV1(rainMetaV1_ID);
  // // rainMetaV1.metaBytes = event.params.meta;
  // // rainMetaV1.orderBook = event.address;
  // // rainMetaV1.save();

  // let metaData = event.params.meta.toHex().slice(18);
  // let data = new CBORDecoder(stringToArrayBuffer(metaData));
  // const res = data.parse();

  // if (res.isSequence) {
  //   log.info(`res.isSequence: ${res.isSequence}`, []);
  //   const dataString = res.toString();
  //   log.info(`dataString: ${dataString}`, []);

  //   let jsonArr = json.fromString(dataString).toArray();
  //   log.info(`jsonArr.length: ${jsonArr.length}`, []);
  //   for (let i = 0; i < jsonArr.length; i++) {
  //     let metaContent = jsonArr[i].toObject();
  //     // const payload = metaContent.get("0") as JSONValue;

  //     // let id = `${event.transaction.hash.toHex()}-${i.toString()}`;
  //     // let _metaContentV1 = createMetaContentV1(id, metaContent, rainMetaV1_ID);
  //   }
  // } else if (res.isObj) {
  //   // It's a map and not a sequence
  // } else {
  //   return;
  // }
}
