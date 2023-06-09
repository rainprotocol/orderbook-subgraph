/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ISaleV2,
  ISaleV2Interface,
} from "../../../../lib/rain.interface.sale/src/ISaleV2";

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

export class ISaleV2__factory {
  static readonly abi = _abi;
  static createInterface(): ISaleV2Interface {
    return new utils.Interface(_abi) as ISaleV2Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ISaleV2 {
    return new Contract(address, _abi, signerOrProvider) as ISaleV2;
  }
}
