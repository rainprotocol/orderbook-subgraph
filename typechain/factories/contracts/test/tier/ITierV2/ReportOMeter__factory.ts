/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  ReportOMeter,
  ReportOMeterInterface,
} from "../../../../../contracts/test/tier/ITierV2/ReportOMeter";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "report",
        type: "uint256",
      },
    ],
    name: "Report",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tierContract_",
        type: "address",
      },
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "context_",
        type: "uint256[]",
      },
    ],
    name: "gaugeReport",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tierContract_",
        type: "address",
      },
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tier_",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "context_",
        type: "uint256[]",
      },
    ],
    name: "gaugeReportTimeForTier",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610650806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063443b86951461003b578063cc91cb6014610050575b600080fd5b61004e6100493660046103ba565b610063565b005b61004e61005e366004610429565b61017d565b600160009081555a905060008673ffffffffffffffffffffffffffffffffffffffff1663caa0eb3b878787876040518563ffffffff1660e01b81526004016100ae94939291906104d5565b602060405180830381865afa1580156100cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100ef9190610515565b905060005a90506101406040518060400160405280601481526020017f7265706f72742074696d6520636f73743a202573000000000000000000000000815250828561013b919061052e565b61028f565b6040518281527fbb2c768e67d87cc5b47bd5461de6408dfc3229cdc6d42ee85b24ffe526aed4269060200160405180910390a15050505050505050565b600160009081555a905060008573ffffffffffffffffffffffffffffffffffffffff166388d686048686866040518463ffffffff1660e01b81526004016101c69392919061056e565b602060405180830381865afa1580156101e3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102079190610515565b905060005a90506102536040518060400160405280600f81526020017f7265706f727420636f73743a2025730000000000000000000000000000000000815250828561013b919061052e565b6040518281527fbb2c768e67d87cc5b47bd5461de6408dfc3229cdc6d42ee85b24ffe526aed4269060200160405180910390a150505050505050565b61032082826040516024016102a59291906105a7565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fb60e72cc00000000000000000000000000000000000000000000000000000000179052610324565b5050565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461036957600080fd5b919050565b60008083601f84011261038057600080fd5b50813567ffffffffffffffff81111561039857600080fd5b6020830191508360208260051b85010111156103b357600080fd5b9250929050565b6000806000806000608086880312156103d257600080fd5b6103db86610345565b94506103e960208701610345565b935060408601359250606086013567ffffffffffffffff81111561040c57600080fd5b6104188882890161036e565b969995985093965092949392505050565b6000806000806060858703121561043f57600080fd5b61044885610345565b935061045660208601610345565b9250604085013567ffffffffffffffff81111561047257600080fd5b61047e8782880161036e565b95989497509550505050565b81835260007f07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8311156104bc57600080fd5b8260051b80836020870137939093016020019392505050565b73ffffffffffffffffffffffffffffffffffffffff8516815283602082015260606040820152600061050b60608301848661048a565b9695505050505050565b60006020828403121561052757600080fd5b5051919050565b81810381811115610568577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b92915050565b73ffffffffffffffffffffffffffffffffffffffff8416815260406020820152600061059e60408301848661048a565b95945050505050565b604081526000835180604084015260005b818110156105d557602081870181015160608684010152016105b8565b5060006060828501015260607fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f830116840101915050826020830152939250505056fea26469706673582212202d0433b800d722bffe11ad0d25c8ddf797e5a6f22870fa52460e2f1327be415264736f6c63430008130033";

type ReportOMeterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ReportOMeterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ReportOMeter__factory extends ContractFactory {
  constructor(...args: ReportOMeterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ReportOMeter> {
    return super.deploy(overrides || {}) as Promise<ReportOMeter>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ReportOMeter {
    return super.attach(address) as ReportOMeter;
  }
  override connect(signer: Signer): ReportOMeter__factory {
    return super.connect(signer) as ReportOMeter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ReportOMeterInterface {
    return new utils.Interface(_abi) as ReportOMeterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ReportOMeter {
    return new Contract(address, _abi, signerOrProvider) as ReportOMeter;
  }
}
