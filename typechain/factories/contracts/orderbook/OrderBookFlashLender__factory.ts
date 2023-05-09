/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  OrderBookFlashLender,
  OrderBookFlashLenderInterface,
} from "../../../contracts/orderbook/OrderBookFlashLender";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ActiveDebt",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "result",
        type: "bytes32",
      },
    ],
    name: "FlashLenderCallbackFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroReceiver",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroToken",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "flashFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC3156FlashBorrower",
        name: "receiver_",
        type: "address",
      },
      {
        internalType: "address",
        name: "token_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data_",
        type: "bytes",
      },
    ],
    name: "flashLoan",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token_",
        type: "address",
      },
    ],
    name: "maxFlashLoan",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052600080546001600160a01b0319908116825560018054909116905560025534801561002e57600080fd5b50610baf8061003e6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80635cffe9de14610046578063613255ab1461006e578063d9d98ce41461008f575b600080fd5b610059610054366004610938565b6100a2565b60405190151581526020015b60405180910390f35b61008161007c3660046109d7565b610351565b604051908152602001610065565b61008161009d3660046109fb565b6103f2565b60006100ac6103fb565b73ffffffffffffffffffffffffffffffffffffffff85166100f9576040517fad1991f500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8616610146576040517f6ba9ecd800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001805473ffffffffffffffffffffffffffffffffffffffff8088167fffffffffffffffffffffffff0000000000000000000000000000000000000000928316179092556000805492891692909116919091179055600284905583156101c7576101c773ffffffffffffffffffffffffffffffffffffffff8616878661046c565b6040517f23e30c8b00000000000000000000000000000000000000000000000000000000815260009073ffffffffffffffffffffffffffffffffffffffff8816906323e30c8b906102269033908a908a9087908b908b90600401610a27565b6020604051808303816000875af1158015610245573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102699190610aad565b90507f439148f0bbc682ca079e46d6e2c2f0c1e3b820f1a291b069d8882abf8cf18dd981146102cc576040517f5b62c548000000000000000000000000000000000000000000000000000000008152600481018290526024015b60405180910390fd5b60025494508415610308576000546001546103029173ffffffffffffffffffffffffffffffffffffffff91821691163088610545565b60006002555b600080547fffffffffffffffffffffffff00000000000000000000000000000000000000009081169091556001805490911690556103446103fb565b5060019695505050505050565b600061035b6105a9565b6103f2576040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff8316906370a0823190602401602060405180830381865afa1580156103c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103ed9190610aad565b6103f5565b60005b92915050565b6104036105a9565b1561046a576000546001546002546040517f60817cfa00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff938416600482015292909116602483015260448201526064016102c3565b565b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526105409084907fa9059cbb00000000000000000000000000000000000000000000000000000000906064015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff00000000000000000000000000000000000000000000000000000000909316929092179091526105f8565b505050565b60405173ffffffffffffffffffffffffffffffffffffffff808516602483015283166044820152606481018290526105a39085907f23b872dd00000000000000000000000000000000000000000000000000000000906084016104be565b50505050565b6000805473ffffffffffffffffffffffffffffffffffffffff161515806105e7575060015473ffffffffffffffffffffffffffffffffffffffff1615155b806105f3575060025415155b905090565b600061065a826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166107049092919063ffffffff16565b80519091501561054057808060200190518101906106789190610ac6565b610540576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f7420737563636565640000000000000000000000000000000000000000000060648201526084016102c3565b6060610713848460008561071b565b949350505050565b6060824710156107ad576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c000000000000000000000000000000000000000000000000000060648201526084016102c3565b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040516107d69190610b0c565b60006040518083038185875af1925050503d8060008114610813576040519150601f19603f3d011682016040523d82523d6000602084013e610818565b606091505b509150915061082987838387610834565b979650505050505050565b606083156108ca5782516000036108c35773ffffffffffffffffffffffffffffffffffffffff85163b6108c3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016102c3565b5081610713565b61071383838151156108df5781518083602001fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102c39190610b28565b73ffffffffffffffffffffffffffffffffffffffff8116811461093557600080fd5b50565b60008060008060006080868803121561095057600080fd5b853561095b81610913565b9450602086013561096b81610913565b935060408601359250606086013567ffffffffffffffff8082111561098f57600080fd5b818801915088601f8301126109a357600080fd5b8135818111156109b257600080fd5b8960208285010111156109c457600080fd5b9699959850939650602001949392505050565b6000602082840312156109e957600080fd5b81356109f481610913565b9392505050565b60008060408385031215610a0e57600080fd5b8235610a1981610913565b946020939093013593505050565b600073ffffffffffffffffffffffffffffffffffffffff808916835280881660208401525085604083015284606083015260a060808301528260a0830152828460c0840137600060c0848401015260c07fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8501168301019050979650505050505050565b600060208284031215610abf57600080fd5b5051919050565b600060208284031215610ad857600080fd5b815180151581146109f457600080fd5b60005b83811015610b03578181015183820152602001610aeb565b50506000910152565b60008251610b1e818460208701610ae8565b9190910192915050565b6020815260008251806020840152610b47816040850160208701610ae8565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fea264697066735822122090a9e46c5a3ef30a70bba8c22ca0f8fc89efcedbda4ff0869ebbfb00ae3d6b9164736f6c63430008130033";

type OrderBookFlashLenderConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OrderBookFlashLenderConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class OrderBookFlashLender__factory extends ContractFactory {
  constructor(...args: OrderBookFlashLenderConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<OrderBookFlashLender> {
    return super.deploy(overrides || {}) as Promise<OrderBookFlashLender>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): OrderBookFlashLender {
    return super.attach(address) as OrderBookFlashLender;
  }
  override connect(signer: Signer): OrderBookFlashLender__factory {
    return super.connect(signer) as OrderBookFlashLender__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OrderBookFlashLenderInterface {
    return new utils.Interface(_abi) as OrderBookFlashLenderInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OrderBookFlashLender {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as OrderBookFlashLender;
  }
}
