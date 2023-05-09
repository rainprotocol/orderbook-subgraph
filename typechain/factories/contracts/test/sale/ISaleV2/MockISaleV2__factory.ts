/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  MockISaleV2,
  MockISaleV2Interface,
} from "../../../../../contracts/test/sale/ISaleV2/MockISaleV2";

const _abi = [
  {
    inputs: [],
    name: "remainingTokenInventory",
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
  {
    inputs: [],
    name: "reserve",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "saleStatus",
    outputs: [
      {
        internalType: "enum SaleStatus",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "reserve_",
        type: "address",
      },
    ],
    name: "setReserve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum SaleStatus",
        name: "saleStatus_",
        type: "uint8",
      },
    ],
    name: "setSaleStatus",
    outputs: [],
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
    name: "setToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalReserveReceived",
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
  "0x608060405234801561001057600080fd5b50610365806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063cd3293de1161005b578063cd3293de14610168578063ec14b06e146101ad578063f9020e33146101b6578063fc0c546a146101e857600080fd5b8063144fa6d71461008d57806347e4bbb9146100e45780634891ad88146101005780639cecc80a14610113575b600080fd5b6100e261009b366004610261565b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b005b6100ed60035481565b6040519081526020015b60405180910390f35b6100e261010e36600461029e565b610208565b6100e2610121366004610261565b600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6000546101889073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100f7565b6100ed60025481565b6000546101db9074010000000000000000000000000000000000000000900460ff1681565b6040516100f791906102ee565b6001546101889073ffffffffffffffffffffffffffffffffffffffff1681565b600080548291907fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff1674010000000000000000000000000000000000000000836003811115610259576102596102bf565b021790555050565b60006020828403121561027357600080fd5b813573ffffffffffffffffffffffffffffffffffffffff8116811461029757600080fd5b9392505050565b6000602082840312156102b057600080fd5b81356004811061029757600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6020810160048310610329577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b9190529056fea2646970667358221220bfb8c5d7966a70447c68b9d61ce29bf269968312f6f91f17aa70110c84d1d3b864736f6c63430008130033";

type MockISaleV2ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockISaleV2ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockISaleV2__factory extends ContractFactory {
  constructor(...args: MockISaleV2ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MockISaleV2> {
    return super.deploy(overrides || {}) as Promise<MockISaleV2>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MockISaleV2 {
    return super.attach(address) as MockISaleV2;
  }
  override connect(signer: Signer): MockISaleV2__factory {
    return super.connect(signer) as MockISaleV2__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockISaleV2Interface {
    return new utils.Interface(_abi) as MockISaleV2Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockISaleV2 {
    return new Contract(address, _abi, signerOrProvider) as MockISaleV2;
  }
}
