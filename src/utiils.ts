import { Bytes, BigInt, TypedMap, JSONValue, Address } from "@graphprotocol/graph-ts";
import { Account, ERC20, MetaContentV1, TokenVault, Vault } from "../generated/schema";
import { ReserveToken } from "../generated/OrderBook/ReserveToken";

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
    token.decimals = !decimals.reverted ? decimals.value : 18;
    token.name = !name.reverted ? name.value : "NONE";
    token.symbol = !symbol.reverted ? symbol.value : "NONE";
    token.save();
  }
  return token;
}

export function createVault(vaultId: string, owner: Bytes): Vault {
    let vault = new Vault(`${vaultId}-${owner}`);
    if(!vault){
        vault = new Vault(`${vaultId}-${owner}`);
        vault.owner = createAccount(owner).id;
        vault.deposits = [];
        vault.withdraws = [];
        vault.save();
    }
    return vault;
}

export function createTokenVault(vaultId: string, owner: Bytes, token: Bytes): TokenVault {
    let tokenVault = TokenVault.load(`${vaultId}-${owner}-${token}`);
    if (!tokenVault){
        tokenVault = new TokenVault(`${vaultId}-${owner}-${token}`);
        tokenVault.owner = createAccount(owner).id;
        tokenVault.token = createToken(token).id;
        tokenVault.balance = BigInt.zero();
        tokenVault.save();
    }
    return tokenVault;    
}