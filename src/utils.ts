import {
  Bytes,
  BigInt,
  TypedMap,
  JSONValue,
  Address,
  ethereum,
  crypto,
} from "@graphprotocol/graph-ts";
import {
  Account,
  ERC20,
  MetaContentV1,
  Order,
  OrderBook,
  OrderClear,
  RainMetaV1,
  TakeOrderEntity,
  TokenVault,
  Transaction,
  Vault,
  VaultDeposit,
  VaultWithdraw,
} from "../generated/schema";
import { ReserveToken } from "../generated/OrderBook/ReserveToken";
import { ClearAliceStruct } from "../generated/OrderBook/OrderBook";

export const RAIN_META_DOCUMENT_HEX = "0xff0a89c674ee7874";

/**
 * From a given hexadecimal string, check if it's have an even length
 */
export function getEvenHex(value_: string): string {
  if (value_.length % 2) {
    value_ = value_.slice(0, 2) + "0" + value_.slice(2);
  }

  return value_;
}

export function stringToArrayBuffer(val: string): ArrayBuffer {
  const buff = new ArrayBuffer(val.length / 2);
  const view = new DataView(buff);
  for (let i = 0, j = 0; i < val.length; i = i + 2, j++) {
    view.setUint8(j, u8(Number.parseInt(`${val.at(i)}${val.at(i + 1)}`, 16)));
  }
  return buff;
}

export function createMetaContentV1(
  id: string,
  metaContentV1Object: TypedMap<string, JSONValue>,
  document: Bytes
): MetaContentV1 {
  let metaContentV1 = MetaContentV1.load(id);
  if (!metaContentV1) {
    metaContentV1 = new MetaContentV1(id);
    metaContentV1.payload = metaContentV1Object.mustGet("0").toString();
    metaContentV1.magicNumber = BigInt.fromU64(
      metaContentV1Object.mustGet("1").toU64()
    );
    metaContentV1.contentType = metaContentV1Object.mustGet("2").toString();
    if (metaContentV1Object.isSet("3")) {
      metaContentV1.contentEncoding = metaContentV1Object
        .mustGet("3")
        .toString();
    }
    if (metaContentV1Object.isSet("4")) {
      metaContentV1.contentLanguage = metaContentV1Object
        .mustGet("4")
        .toString();
    }
    metaContentV1.documents = [];
  }
  let documents = metaContentV1.documents;
  if (documents) documents.push(document);
  metaContentV1.documents = documents;
  metaContentV1.save();

  return metaContentV1;
}

export function createAccount(address: Bytes): Account {
  let account = Account.load(address);
  if (!account) {
    account = new Account(address);
    account.save();
  }
  return account;
}

export function createToken(address: Bytes): ERC20 {
  let token = ERC20.load(address);
  let reserveToken = ReserveToken.bind(Address.fromBytes(address));
  if (!token) {
    token = new ERC20(address);

    let decimals = reserveToken.try_decimals();
    let name = reserveToken.try_name();
    let symbol = reserveToken.try_symbol();
    token.decimals = !decimals.reverted ? decimals.value : 0;
    token.name = !name.reverted ? name.value : "NONE";
    token.symbol = !symbol.reverted ? symbol.value : "NONE";
    token.totalSupply = BigInt.zero();
  }
  let totalSupply = reserveToken.try_totalSupply();
  token.totalSupply = !totalSupply.reverted
    ? totalSupply.value
    : token.totalSupply;
  token.save();
  return token;
}

export function createVault(vaultId: string, owner: Bytes): Vault {
  let vault = Vault.load(`${vaultId}-${owner.toHex()}`);
  if (!vault) {
    vault = new Vault(`${vaultId}-${owner.toHex()}`);
    vault.owner = createAccount(owner).id;
    vault.save();
  }
  return vault;
}

export function createTokenVault(
  vaultId: string,
  owner: Bytes,
  token: Bytes
): TokenVault {
  let tokenVault = TokenVault.load(
    `${vaultId}-${owner.toHex()}-${token.toHex()}`
  );
  if (!tokenVault) {
    tokenVault = new TokenVault(`${vaultId}-${owner.toHex()}-${token.toHex()}`);
    tokenVault.owner = createAccount(owner).id;
    tokenVault.token = createToken(token).id;
    tokenVault.balance = BigInt.zero();
    tokenVault.vault = createVault(vaultId, owner).id;
    tokenVault.orders = [];
    tokenVault.orderClears = [];
    tokenVault.save();
  }
  return tokenVault;
}

export function createOrder(order: ClearAliceStruct): Order {
  let tupleEvaluable: Array<ethereum.Value> = [
    ethereum.Value.fromAddress(order.evaluable.interpreter),
    ethereum.Value.fromAddress(order.evaluable.store),
    ethereum.Value.fromAddress(order.evaluable.expression),
  ];

  let evaluable = changetype<ethereum.Tuple>(tupleEvaluable);

  let tupleValidInputs: Array<ethereum.Tuple> = [];
  for (let i = 0; i < order.validInputs.length; i++) {
    let VI: Array<ethereum.Value> = [
      ethereum.Value.fromAddress(order.validInputs[i].token),
      ethereum.Value.fromI32(order.validInputs[i].decimals),
      ethereum.Value.fromUnsignedBigInt(order.validInputs[i].vaultId),
    ];

    tupleValidInputs.push(changetype<ethereum.Tuple>(VI));
  }

  let tupleValidOutputs: Array<ethereum.Tuple> = [];
  for (let i = 0; i < order.validOutputs.length; i++) {
    let VO: Array<ethereum.Value> = [
      ethereum.Value.fromAddress(order.validOutputs[i].token),
      ethereum.Value.fromI32(order.validOutputs[i].decimals),
      ethereum.Value.fromUnsignedBigInt(order.validOutputs[i].vaultId),
    ];

    tupleValidOutputs.push(changetype<ethereum.Tuple>(VO));
  }

  let tupleArray: Array<ethereum.Value> = [
    ethereum.Value.fromAddress(order.owner),
    ethereum.Value.fromBoolean(order.handleIO),
    ethereum.Value.fromTuple(evaluable),
    ethereum.Value.fromTupleArray(tupleValidInputs),
    ethereum.Value.fromTupleArray(tupleValidOutputs),
  ];

  let tuple = changetype<ethereum.Tuple>(tupleArray);
  let encodedOrder = ethereum.encode(ethereum.Value.fromTuple(tuple))!;
  let keccak256 = crypto.keccak256(encodedOrder);
  let orderHashHex = getEvenHex(keccak256.toHex());

  let order_ = Order.load(orderHashHex);
  if (order_) return order_;
  else return new Order(orderHashHex);
}

function hexToBI(hexString: string): BigInt {
  return BigInt.fromUnsignedBytes(
    changetype<Bytes>(Bytes.fromHexString(hexString).reverse())
  );
}

export function createTakeOrderConfig(txHash: string): TakeOrderEntity {
  for (let i = 0; ; i++) {
    let orderClear = TakeOrderEntity.load(`${txHash}-${i}`);
    if (!orderClear) {
      return new TakeOrderEntity(`${txHash}-${i}`);
    }
  }
  return new TakeOrderEntity("");
}

export function createOrderClear(txHash: string): OrderClear {
  for (let i = 0; ; i++) {
    let orderClear = OrderClear.load(`${txHash}-${i}`);
    if (!orderClear) {
      return new OrderClear(`${txHash}-${i}`);
    }
  }
  return new OrderClear("");
}

export function createVaultDeposit(txHash: string): VaultDeposit {
  for (let i = 0; ; i++) {
    let orderClear = VaultDeposit.load(`${txHash}-${i}`);
    if (!orderClear) {
      return new VaultDeposit(`${txHash}-${i}`);
    }
  }
  return new VaultDeposit("");
}

export function createVaultWithdraw(txHash: string): VaultWithdraw {
  for (let i = 0; ; i++) {
    let orderClear = VaultWithdraw.load(`${txHash}-${i}`);
    if (!orderClear) {
      return new VaultWithdraw(`${txHash}-${i}`);
    }
  }
  return new VaultWithdraw("");
}

export function getOB(obAddress_: Address): OrderBook {
  let orderBook = OrderBook.load(obAddress_);
  if (!orderBook) {
    orderBook = new OrderBook(obAddress_);
    orderBook.address = obAddress_;
    orderBook.save();
  }
  return orderBook;
}

export function getRainMetaV1(meta_: Bytes): RainMetaV1 {
  const metaV1_ID = getKeccak256FromBytes(meta_);

  let metaV1 = RainMetaV1.load(metaV1_ID);

  if (!metaV1) {
    metaV1 = new RainMetaV1(metaV1_ID);
    metaV1.metaBytes = meta_;
    metaV1.save();
  }

  return metaV1;
}

export function getKeccak256FromBytes(data_: Bytes): Bytes {
  return Bytes.fromByteArray(crypto.keccak256(Bytes.fromByteArray(data_)));
}

export function isHexadecimalString(str: string): boolean {
  // Check if string is empty
  if (str.length == 0) {
    return false;
  }

  // Check if each character is a valid hexadecimal character
  for (let i = 0; i < str.length; i++) {
    let charCode = str.charCodeAt(i);
    if (
      !(
        (charCode >= 48 && charCode <= 57) || // 0-9
        (charCode >= 65 && charCode <= 70) || // A-F
        (charCode >= 97 && charCode <= 102)
      )
    ) {
      // a-f
      return false;
    }
  }

  return true;
}

export function createTransaction(
  hash: string,
  block: ethereum.Block
): Transaction {
  let transaction = Transaction.load(hash);
  if (!transaction) {
    transaction = new Transaction(hash);
    transaction.blockNumber = block.number;
    transaction.timestamp = block.timestamp;
    transaction.save();
  }
  return transaction;
}
