/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IFlowERC721V3,
  IFlowERC721V3Interface,
} from "../../../../lib/rain.interface.flow/src/IFlowERC721V3";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "string",
            name: "baseURI",
            type: "string",
          },
          {
            components: [
              {
                internalType: "contract IExpressionDeployerV1",
                name: "deployer",
                type: "address",
              },
              {
                internalType: "bytes[]",
                name: "sources",
                type: "bytes[]",
              },
              {
                internalType: "uint256[]",
                name: "constants",
                type: "uint256[]",
              },
            ],
            internalType: "struct EvaluableConfig",
            name: "evaluableConfig",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "contract IExpressionDeployerV1",
                name: "deployer",
                type: "address",
              },
              {
                internalType: "bytes[]",
                name: "sources",
                type: "bytes[]",
              },
              {
                internalType: "uint256[]",
                name: "constants",
                type: "uint256[]",
              },
            ],
            internalType: "struct EvaluableConfig[]",
            name: "flowConfig",
            type: "tuple[]",
          },
        ],
        indexed: false,
        internalType: "struct FlowERC721Config",
        name: "config",
        type: "tuple",
      },
    ],
    name: "Initialize",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "contract IInterpreterV1",
            name: "interpreter",
            type: "address",
          },
          {
            internalType: "contract IInterpreterStoreV1",
            name: "store",
            type: "address",
          },
          {
            internalType: "address",
            name: "expression",
            type: "address",
          },
        ],
        internalType: "struct Evaluable",
        name: "evaluable",
        type: "tuple",
      },
      {
        internalType: "uint256[]",
        name: "callerContext",
        type: "uint256[]",
      },
      {
        components: [
          {
            internalType: "address",
            name: "signer",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "context",
            type: "uint256[]",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct SignedContextV1[]",
        name: "signedContexts",
        type: "tuple[]",
      },
    ],
    name: "flow",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
            ],
            internalType: "struct ERC721SupplyChange[]",
            name: "mints",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
            ],
            internalType: "struct ERC721SupplyChange[]",
            name: "burns",
            type: "tuple[]",
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: "address",
                    name: "token",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "from",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "to",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                  },
                ],
                internalType: "struct ERC20Transfer[]",
                name: "erc20",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "address",
                    name: "token",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "from",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "to",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "id",
                    type: "uint256",
                  },
                ],
                internalType: "struct ERC721Transfer[]",
                name: "erc721",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "address",
                    name: "token",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "from",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "to",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "id",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                  },
                ],
                internalType: "struct ERC1155Transfer[]",
                name: "erc1155",
                type: "tuple[]",
              },
            ],
            internalType: "struct FlowTransferV1",
            name: "flow",
            type: "tuple",
          },
        ],
        internalType: "struct FlowERC721IOV1",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "contract IInterpreterV1",
            name: "interpreter",
            type: "address",
          },
          {
            internalType: "contract IInterpreterStoreV1",
            name: "store",
            type: "address",
          },
          {
            internalType: "address",
            name: "expression",
            type: "address",
          },
        ],
        internalType: "struct Evaluable",
        name: "evaluable",
        type: "tuple",
      },
      {
        internalType: "uint256[]",
        name: "callerContext",
        type: "uint256[]",
      },
      {
        components: [
          {
            internalType: "address",
            name: "signer",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "context",
            type: "uint256[]",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct SignedContextV1[]",
        name: "signedContexts",
        type: "tuple[]",
      },
    ],
    name: "previewFlow",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
            ],
            internalType: "struct ERC721SupplyChange[]",
            name: "mints",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
            ],
            internalType: "struct ERC721SupplyChange[]",
            name: "burns",
            type: "tuple[]",
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: "address",
                    name: "token",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "from",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "to",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                  },
                ],
                internalType: "struct ERC20Transfer[]",
                name: "erc20",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "address",
                    name: "token",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "from",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "to",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "id",
                    type: "uint256",
                  },
                ],
                internalType: "struct ERC721Transfer[]",
                name: "erc721",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "address",
                    name: "token",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "from",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "to",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "id",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                  },
                ],
                internalType: "struct ERC1155Transfer[]",
                name: "erc1155",
                type: "tuple[]",
              },
            ],
            internalType: "struct FlowTransferV1",
            name: "flow",
            type: "tuple",
          },
        ],
        internalType: "struct FlowERC721IOV1",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IFlowERC721V3__factory {
  static readonly abi = _abi;
  static createInterface(): IFlowERC721V3Interface {
    return new utils.Interface(_abi) as IFlowERC721V3Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IFlowERC721V3 {
    return new Contract(address, _abi, signerOrProvider) as IFlowERC721V3;
  }
}
