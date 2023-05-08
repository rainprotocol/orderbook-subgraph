/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  ERC3156FlashBorrowerBuyTest,
  ERC3156FlashBorrowerBuyTestInterface,
} from "../../../../contracts/test/erc3156/ERC3156FlashBorrowerBuyTest";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenA_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data_",
        type: "bytes",
      },
    ],
    name: "onFlashLoan",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506113ef806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c806323e30c8b14610030575b600080fd5b61004361003e3660046107fe565b610055565b60405190815260200160405180910390f35b60008061006483850185610cff565b905061008873ffffffffffffffffffffffffffffffffffffffff88166001886102e8565b600061009d87670e27c49886e600008361037a565b82516040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152919250829173ffffffffffffffffffffffffffffffffffffffff909116906370a0823190602401602060405180830381865afa15801561010f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101339190610f5c565b1461019f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600760248201527f5052455f4255590000000000000000000000000000000000000000000000000060448201526064015b60405180910390fd5b81516040517f095ea7b30000000000000000000000000000000000000000000000000000000081523360048201526024810183905273ffffffffffffffffffffffffffffffffffffffff9091169063095ea7b3906044016020604051808303816000875af1158015610215573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102399190610f75565b506040517f7a8048df0000000000000000000000000000000000000000000000000000000081523390637a8048df90610276908590600401611130565b60408051808303816000875af1158015610294573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102b891906112c8565b507f439148f0bbc682ca079e46d6e2c2f0c1e3b820f1a291b069d8882abf8cf18dd99a9950505050505050505050565b6040805173ffffffffffffffffffffffffffffffffffffffff8416602482015260448082018490528251808303909101815260649091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb0000000000000000000000000000000000000000000000000000000017905261037590849061039a565b505050565b60006103908484670de0b6b3a7640000856104a6565b90505b9392505050565b60006103fc826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166105059092919063ffffffff16565b805190915015610375578080602001905181019061041a9190610f75565b610375576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152608401610196565b6000806104b4868686610514565b905060018360028111156104ca576104ca6112ec565b1480156104e75750600084806104e2576104e261131b565b868809115b156104fa576104f760018261134a565b90505b90505b949350505050565b606061039084846000856105e1565b600080807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8587098587029250828110838203039150508060000361056c578382816105625761056261131b565b0492505050610393565b80841161057857600080fd5b60008486880960026001871981018816978890046003810283188082028403028082028403028082028403028082028403028082028403029081029092039091026000889003889004909101858311909403939093029303949094049190911702949350505050565b606082471015610673576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c00000000000000000000000000000000000000000000000000006064820152608401610196565b6000808673ffffffffffffffffffffffffffffffffffffffff16858760405161069c919061138a565b60006040518083038185875af1925050503d80600081146106d9576040519150601f19603f3d011682016040523d82523d6000602084013e6106de565b606091505b50915091506106ef878383876106fa565b979650505050505050565b606083156107905782516000036107895773ffffffffffffffffffffffffffffffffffffffff85163b610789576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610196565b50816104fd565b6104fd83838151156107a55781518083602001fd5b806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161019691906113a6565b73ffffffffffffffffffffffffffffffffffffffff811681146107fb57600080fd5b50565b60008060008060008060a0878903121561081757600080fd5b8635610822816107d9565b95506020870135610832816107d9565b94506040870135935060608701359250608087013567ffffffffffffffff8082111561085d57600080fd5b818901915089601f83011261087157600080fd5b81358181111561088057600080fd5b8a602082850101111561089257600080fd5b6020830194508093505050509295509295509295565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040516060810167ffffffffffffffff811182821017156108fa576108fa6108a8565b60405290565b60405160c0810167ffffffffffffffff811182821017156108fa576108fa6108a8565b6040516080810167ffffffffffffffff811182821017156108fa576108fa6108a8565b60405160a0810167ffffffffffffffff811182821017156108fa576108fa6108a8565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156109b0576109b06108a8565b604052919050565b600067ffffffffffffffff8211156109d2576109d26108a8565b5060051b60200190565b80151581146107fb57600080fd5b80356109f5816109dc565b919050565b600060608284031215610a0c57600080fd5b610a146108d7565b90508135610a21816107d9565b81526020820135610a31816107d9565b60208201526040820135610a44816107d9565b604082015292915050565b600082601f830112610a6057600080fd5b81356020610a75610a70836109b8565b610969565b82815260609283028501820192828201919087851115610a9457600080fd5b8387015b85811015610af45781818a031215610ab05760008081fd5b610ab86108d7565b8135610ac3816107d9565b81528186013560ff81168114610ad95760008081fd5b81870152604082810135908201528452928401928101610a98565b5090979650505050505050565b600082601f830112610b1257600080fd5b813567ffffffffffffffff811115610b2c57610b2c6108a8565b610b5d60207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601610969565b818152846020838601011115610b7257600080fd5b816020850160208301376000918101602001919091529392505050565b600082601f830112610ba057600080fd5b81356020610bb0610a70836109b8565b82815260059290921b84018101918181019086841115610bcf57600080fd5b8286015b84811015610cf457803567ffffffffffffffff80821115610bf357600080fd5b908801906060828b037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0011215610c2a5760008081fd5b610c326108d7565b86830135610c3f816107d9565b815260408381013583811115610c555760008081fd5b8401603f81018d13610c675760008081fd5b88810135610c77610a70826109b8565b81815260059190911b82018301908a8101908f831115610c975760008081fd5b928401925b82841015610cb55783358252928b0192908b0190610c9c565b858c0152505050606084013583811115610ccf5760008081fd5b610cdd8d8a83880101610b01565b918301919091525085525050918301918301610bd3565b509695505050505050565b600060208284031215610d1157600080fd5b67ffffffffffffffff8083351115610d2857600080fd5b8235830160c08186031215610d3c57600080fd5b610d44610900565b610d4e82356107d9565b81358152610d5f60208301356107d9565b602082013560208201526040820135604082015260608201356060820152608082013560808201528260a08301351115610d9857600080fd5b60a08201358201915085601f830112610db057600080fd5b610dbd610a7083356109b8565b82358082526020808301929160051b850101881015610ddb57600080fd5b602084015b6020853560051b860101811015610f4c578581351115610dff57600080fd5b803585017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0608081838d03011215610e3657600080fd5b610e3e610923565b8860208401351115610e4f57600080fd5b6020830135830160e083828f03011215610e6857600080fd5b610e70610946565b9250610e7f60208201356107d9565b60208101358352610e92604082016109ea565b6020840152610ea48d606083016109fa565b60408401528960c08201351115610eba57600080fd5b610ecd8d602060c0840135840101610a4f565b60608401528960e08201351115610ee357600080fd5b610ef68d602060e0840135840101610a4f565b60808401525081815260408301356020820152606083013560408201528860808401351115610f2457600080fd5b610f378c60206080860135860101610b8f565b60608201528552505060209283019201610de0565b5060a08301525095945050505050565b600060208284031215610f6e57600080fd5b5051919050565b600060208284031215610f8757600080fd5b8151610393816109dc565b600081518084526020808501945080840160005b83811015610ff1578151805173ffffffffffffffffffffffffffffffffffffffff1688528381015160ff16848901526040908101519088015260609096019590820190600101610fa6565b509495945050505050565b60005b83811015611017578181015183820152602001610fff565b50506000910152565b60008151808452611038816020860160208601610ffc565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b600081518084526020808501808196508360051b810191508286016000805b86811015611122578385038a528251805173ffffffffffffffffffffffffffffffffffffffff1686528681015160608888018190528151908801819052608088019189019085905b808210156110f15782518452928a0192918a0191600191909101906110d1565b5050506040808301519250878203818901525061110e8183611020565b9b88019b9650505091850191600101611089565b509298975050505050505050565b6000602080835260e080840173ffffffffffffffffffffffffffffffffffffffff808751168487015283870151604082821681890152808901519150606082818a0152808a01519250608083818b0152808b015193508360a08b015260a08b0151935060c0808b01528584518088526101009750878c019150878160051b8d01018a8701965060005b828110156112b6578d82037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000184528751805186845280518b16878501528d810151151560a08501528881015180518c1660c0860152808f01518c168e8601528901518b168c8501528781015161012085018e905261123c610160860182610f92565b918801518583037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80016101408701529190506112788183610f92565b9150508d8201518e8501528882015189850152878201519150838103888501526112a2818361106a565b998e0199958e0195935050506001016111b9565b509d9c50505050505050505050505050565b600080604083850312156112db57600080fd5b505080516020909101519092909150565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b80820180821115611384577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b92915050565b6000825161139c818460208701610ffc565b9190910192915050565b602081526000610393602083018461102056fea26469706673582212203b1575698913d76c791b3ab501c01ec965fe02c24efa284221a91140785b25a764736f6c63430008130033";

type ERC3156FlashBorrowerBuyTestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC3156FlashBorrowerBuyTestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC3156FlashBorrowerBuyTest__factory extends ContractFactory {
  constructor(...args: ERC3156FlashBorrowerBuyTestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC3156FlashBorrowerBuyTest> {
    return super.deploy(
      overrides || {}
    ) as Promise<ERC3156FlashBorrowerBuyTest>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ERC3156FlashBorrowerBuyTest {
    return super.attach(address) as ERC3156FlashBorrowerBuyTest;
  }
  override connect(signer: Signer): ERC3156FlashBorrowerBuyTest__factory {
    return super.connect(signer) as ERC3156FlashBorrowerBuyTest__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC3156FlashBorrowerBuyTestInterface {
    return new utils.Interface(_abi) as ERC3156FlashBorrowerBuyTestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC3156FlashBorrowerBuyTest {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ERC3156FlashBorrowerBuyTest;
  }
}