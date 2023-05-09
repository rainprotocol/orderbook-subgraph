/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IERC3156FlashBorrower,
  IERC3156FlashBorrowerInterface,
} from "../../../../../lib/rain.interface.orderbook/src/ierc3156/IERC3156FlashBorrower";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "initiator",
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
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
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

export class IERC3156FlashBorrower__factory {
  static readonly abi = _abi;
  static createInterface(): IERC3156FlashBorrowerInterface {
    return new utils.Interface(_abi) as IERC3156FlashBorrowerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IERC3156FlashBorrower {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IERC3156FlashBorrower;
  }
}
