import {
  Bounty,
  IO,
  MetaContentV1,
  Order,
  OrderBook,
  OrderClear,
  OrderClearStateChange,
  RainMetaV1,
  TakeOrderEntity,
  TokenVault,
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
  BigInt,
  ByteArray,
  Bytes,
  JSONValue,
  JSONValueKind,
  TypedMap,
  crypto,
  json,
  log,
} from "@graphprotocol/graph-ts";
import {
  RAIN_META_DOCUMENT_HEX,
  createAccount,
  createOrder,
  createOrderClear,
  createToken,
  createTokenVault,
  createVault,
  getKeccak256FromBytes,
  getOB,
  getRainMetaV1,
  hashTakeOrderConfig,
  isHexadecimalString,
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
    let token = createToken(event.params.order.validInputs[i].token);
    let vault = createVault(
      event.params.order.validInputs[i].vaultId.toString(),
      event.params.order.owner
    );
    let input = new IO(
      `${event.params.orderHash.toHex()}-${token.id.toHex()}-${
        event.params.order.validInputs[i].vaultId
      }`
    );
    input.token = token.id;
    input.decimals = event.params.order.validInputs[i].decimals;
    input.vault = vault.id;
    input.order = event.params.orderHash.toHex();
    input.save();

    let tokenVault = createTokenVault(
      event.params.order.validInputs[i].vaultId.toString(),
      event.params.sender,
      event.params.order.validInputs[i].token
    );

    if (tokenVault) {
      let orders = tokenVault.orders;
      if (orders) orders.push(order.id);
      tokenVault.orders = orders;
      tokenVault.save();
    }
  }

  for (let i = 0; i < event.params.order.validOutputs.length; i++) {
    let token = createToken(event.params.order.validOutputs[i].token);
    let vault = createVault(
      event.params.order.validOutputs[i].vaultId.toString(),
      event.params.order.owner
    );
    let output = new IO(
      `${event.params.orderHash.toHex()}-${token.id.toHex()}-${
        event.params.order.validOutputs[i].vaultId
      }`
    );
    output.token = token.id;
    output.decimals = event.params.order.validOutputs[i].decimals;
    output.vault = vault.id;
    output.order = event.params.orderHash.toHex();
    output.save();

    let tokenVault = createTokenVault(
      event.params.order.validOutputs[i].vaultId.toString(),
      event.params.sender,
      event.params.order.validOutputs[i].token
    );

    if (tokenVault) {
      let orders = tokenVault.orders;
      if (orders) orders.push(order.id);
      tokenVault.orders = orders;
      tokenVault.save();
    }
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
  let orderClear = createOrderClear(event.transaction.hash);
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
    event.params.config.vaultId.toString(),
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
    event.params.config.vaultId.toString(),
    event.params.sender
  ).id;
  vaultDeposit.amount = event.params.config.amount;
  vaultDeposit.tokenVault = tokenVault.id;
  vaultDeposit.vault = createVault(
    event.params.config.vaultId.toString(),
    event.params.sender
  ).id;
  vaultDeposit.save();
}

export function handleOrderExceedsMaxRatio(event: OrderExceedsMaxRatio): void {}

export function handleOrderNotFound(event: OrderNotFound): void {}

export function handleOrderZeroAmount(event: OrderZeroAmount): void {}

export function handleRemoveOrder(event: RemoveOrder): void {
  let order = Order.load(event.params.orderHash.toHex());
  if (order) {
    order.orderActive = false;
    order.save();
  }
}

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
    event.params.config.vaultId.toString(),
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
    event.params.config.vaultId.toString(),
    event.params.sender
  ).id;
  vaultWithdraw.requestedAmount = event.params.config.amount;
  vaultWithdraw.amount = event.params.amount;
  vaultWithdraw.tokenVault = tokenVault.id;
  vaultWithdraw.vault = createVault(
    event.params.config.vaultId.toString(),
    event.params.sender
  ).id;
  vaultWithdraw.save();
}

export function handleInitialized(event: Initialized): void {
  let orderBook = getOB(event.address);
  orderBook.address = event.address;
  orderBook.deployer = event.transaction.from;
  orderBook.save();
}

export function handleMetaV1(event: MetaV1): void {
  const metaV1 = getRainMetaV1(event.params.meta);
  let subjectHex = event.params.subject.toHex();

  if (subjectHex.length % 2) {
    subjectHex = subjectHex.slice(0, 2) + "0" + subjectHex.slice(2);
  }

  // If the subject is equal to the OB address, then the meta data is the OB meta
  if (subjectHex == event.address.toHex()) {
    const orderBook = getOB(event.address);
    orderBook.meta = metaV1.id;
    orderBook.save();
  } else {
    // If not, the subject is an OrderHash then it's an Order meta
    const orderHash = event.params.subject.toHex();
    const order = Order.load(orderHash);
    if (order) {
      order.meta = metaV1.id;
      order.save();
    }
  }

  // Converts the emitted target from Bytes to a Hexadecimal value
  let meta = event.params.meta.toHex();

  // Decode the meta only if incluse the RainMeta magic number.
  if (meta.includes(RAIN_META_DOCUMENT_HEX)) {
    meta = meta.replace(RAIN_META_DOCUMENT_HEX, "");
    const data = new CBORDecoder(stringToArrayBuffer(meta));
    const res = data.parse();

    const contentArr: ContentMeta[] = [];

    if (res.isSequence) {
      const dataString = res.toString();
      const jsonArr = json.fromString(dataString).toArray();
      for (let i = 0; i < jsonArr.length; i++) {
        const jsonValue = jsonArr[i];

        // if some value is not a JSON/Map, then is not following the RainMeta design.
        // So, return here to avoid assignation.
        if (jsonValue.kind != JSONValueKind.OBJECT) return;

        const jsonContent = jsonValue.toObject();

        // If some content is not valid, then skip it since is bad formed
        if (!ContentMeta.validate(jsonContent)) return;

        const content = new ContentMeta(jsonContent, metaV1.id);
        contentArr.push(content);
      }
    } else if (res.isObj) {
      const dataString = res.toString();
      const jsonObj = json.fromString(dataString).toObject();

      if (!ContentMeta.validate(jsonObj)) return;
      const content = new ContentMeta(jsonObj, metaV1.id);
      contentArr.push(content);
      //
    } else {
      // If the response is NOT a Sequence or an Object, then the meta have an
      // error or it's bad formed.
      // In this case, we skip to continue the decoding and assignation process.
      return;
    }

    for (let i = 0; i < contentArr.length; i++) {
      contentArr[i].generate();
    }
  } else {
    // The meta emitted does not include the RainMeta magic number, so does not
    // follow the RainMeta Desing
    return;
  }
}

export class ContentMeta {
  rainMetaId: Bytes;
  payload: Bytes = Bytes.empty();
  magicNumber: BigInt = BigInt.zero();
  contentType: string = "";
  contentEncoding: string = "";
  contentLanguage: string = "";

  constructor(
    metaContentV1Object_: TypedMap<string, JSONValue>,
    rainMetaID_: Bytes
  ) {
    const payload = metaContentV1Object_.get("0");
    const magicNumber = metaContentV1Object_.get("1");
    const contentType = metaContentV1Object_.get("2");
    const contentEncoding = metaContentV1Object_.get("3");
    const contentLanguage = metaContentV1Object_.get("4");

    // RainMetaV1 ID
    this.rainMetaId = rainMetaID_;

    // Mandatories keys
    if (payload) {
      let auxPayload = payload.toString();
      if (auxPayload.startsWith("h'")) {
        auxPayload = auxPayload.replace("h'", "");
      }
      if (auxPayload.endsWith("'")) {
        auxPayload = auxPayload.replace("'", "");
      }

      this.payload = Bytes.fromHexString(auxPayload);
    }

    // if (payload) this.payload = payload.toString();
    if (magicNumber) this.magicNumber = magicNumber.toBigInt();

    // Keys optionals
    if (contentType) this.contentType = contentType.toString();
    if (contentEncoding) this.contentEncoding = contentEncoding.toString();
    if (contentLanguage) this.contentLanguage = contentLanguage.toString();
  }

  /**
   * Validate that the keys exist on the map
   */
  static validate(metaContentV1Object: TypedMap<string, JSONValue>): boolean {
    const payload = metaContentV1Object.get("0");
    const magicNumber = metaContentV1Object.get("1");
    const contentType = metaContentV1Object.get("2");
    const contentEncoding = metaContentV1Object.get("3");
    const contentLanguage = metaContentV1Object.get("4");

    // Only payload and magicNumber are mandatory on RainMetaV1
    // See: https://github.com/rainprotocol/specs/blob/main/metadata-v1.md
    if (payload && magicNumber) {
      if (
        payload.kind == JSONValueKind.STRING ||
        magicNumber.kind == JSONValueKind.NUMBER
      ) {
        // Check if payload is a valid Bytes (hexa)
        let auxPayload = payload.toString();
        if (auxPayload.startsWith("h'")) {
          auxPayload = auxPayload.replace("h'", "");
        }
        if (auxPayload.endsWith("'")) {
          auxPayload = auxPayload.replace("'", "");
        }

        // If the payload is not a valid bytes value
        if (!isHexadecimalString(auxPayload)) {
          return false;
        }

        // Check the type of optionals keys
        if (contentType) {
          if (contentType.kind != JSONValueKind.STRING) {
            return false;
          }
        }
        if (contentEncoding) {
          if (contentEncoding.kind != JSONValueKind.STRING) {
            return false;
          }
        }
        if (contentLanguage) {
          if (contentLanguage.kind != JSONValueKind.STRING) {
            return false;
          }
        }

        return true;
      }
    }

    return false;
  }

  private getContentId(): Bytes {
    // Values as Bytes
    const payloadB = this.payload;
    const magicNumberB = Bytes.fromHexString(this.magicNumber.toHex());
    const contentTypeB = Bytes.fromUTF8(this.contentType);
    const contentEncodingB = Bytes.fromUTF8(this.contentEncoding);
    const contentLanguageB = Bytes.fromUTF8(this.contentLanguage);

    // payload +  magicNumber + contentType + contentEncoding + contentLanguage
    const contentId = getKeccak256FromBytes(
      payloadB
        .concat(magicNumberB)
        .concat(contentTypeB)
        .concat(contentEncodingB)
        .concat(contentLanguageB)
    );

    return contentId;
  }

  /**
   * Create or generate a MetaContentV1 entity based on the current fields:
   *
   * - If the MetaContentV1 does not exist, create the MetaContentV1 entity and
   * made the relation to the rainMetaId.
   *
   * - If the MetaContentV1 does exist, add the relation to the rainMetaId.
   */
  generate(): MetaContentV1 {
    const contentId = this.getContentId();

    let metaContent = MetaContentV1.load(contentId);

    if (!metaContent) {
      metaContent = new MetaContentV1(contentId);

      metaContent.payload = this.payload;
      metaContent.magicNumber = this.magicNumber;
      metaContent.documents = [];

      if (this.contentType != "") metaContent.contentType = this.contentType;

      if (this.contentEncoding != "")
        metaContent.contentEncoding = this.contentEncoding;

      if (this.contentLanguage != "")
        metaContent.contentLanguage = this.contentLanguage;
    }

    const aux = metaContent.documents;
    if (!aux.includes(this.rainMetaId)) aux.push(this.rainMetaId);

    metaContent.documents = aux;

    metaContent.save();

    return metaContent;
  }
}
