import {
  IO,
  MetaContentV1,
  Order,
  OrderBook,
  RainMetaV1,
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
} from "../generated/OrderBook/OrderBook";
import { Bytes, crypto, json, log } from "@graphprotocol/graph-ts";
import {
  createAccount,
  createMetaContentV1,
  createToken,
  createTokenVault,
  createVault,
  stringToArrayBuffer,
} from "./utiils";
import { CBORDecoder } from "@rainprotocol/assemblyscript-cbor";

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
}

export function handleClear(event: Clear): void {}

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

export function handleMetaV1(event: MetaV1): void {
  let rainMetaV1ID = Bytes.fromByteArray(
    crypto.keccak256(Bytes.fromByteArray(event.params.meta))
  );
  let rainMetaV1 = new RainMetaV1(rainMetaV1ID);
  rainMetaV1.metaBytes = event.params.meta;
  rainMetaV1.orderBook = event.address;
  rainMetaV1.save();

  let metaData = event.params.meta.toHex().slice(18);
  let data = new CBORDecoder(stringToArrayBuffer(metaData));
  let jsonData = json.fromString(data.parse().stringify()).toArray();
  for (let i = 0; i < jsonData.length; i++) {
    let metaContentV1Object = jsonData[i].toObject();
    let id = `${event.transaction.hash.toHex()}-${i.toString()}`;
    let _metaContentV1 = createMetaContentV1(
      id,
      metaContentV1Object,
      rainMetaV1ID
    );
  }
}

export function handleOrderExceedsMaxRatio(event: OrderExceedsMaxRatio): void {}

export function handleOrderNotFound(event: OrderNotFound): void {}

export function handleOrderZeroAmount(event: OrderZeroAmount): void {}

export function handleRemoveOrder(event: RemoveOrder): void {}

export function handleTakeOrder(event: TakeOrder): void {}

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
  orderBook.deployer = event.transaction.from;
  orderBook.save();
}
