/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ICloneableV1,
  ICloneableV1Interface,
} from "../../../../lib/rain.interface.factory/src/ICloneableV1";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class ICloneableV1__factory {
  static readonly abi = _abi;
  static createInterface(): ICloneableV1Interface {
    return new utils.Interface(_abi) as ICloneableV1Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ICloneableV1 {
    return new Contract(address, _abi, signerOrProvider) as ICloneableV1;
  }
}
