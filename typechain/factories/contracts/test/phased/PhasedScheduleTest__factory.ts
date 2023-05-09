/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  PhasedScheduleTest,
  PhasedScheduleTestInterface,
} from "../../../../contracts/test/phased/PhasedScheduleTest";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "BadPhase",
    type: "error",
  },
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
        indexed: false,
        internalType: "uint256",
        name: "newPhase",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "scheduledTime",
        type: "uint256",
      },
    ],
    name: "PhaseScheduled",
    type: "event",
  },
  {
    inputs: [],
    name: "currentPhase",
    outputs: [
      {
        internalType: "uint256",
        name: "phase_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32[8]",
        name: "phaseTimes_",
        type: "uint32[8]",
      },
      {
        internalType: "uint256",
        name: "timestamp_",
        type: "uint256",
      },
    ],
    name: "phaseAtTime",
    outputs: [
      {
        internalType: "uint256",
        name: "phase_",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "phaseTimes",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "testScheduleNextPhase",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32[8]",
        name: "phaseTimes_",
        type: "uint32[8]",
      },
      {
        internalType: "uint256",
        name: "phase_",
        type: "uint256",
      },
    ],
    name: "timeForPhase",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp_",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061001961001e565b610194565b600054600163ffffffff909116106100385761003861017e565b604080516101008101825263ffffffff80825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e081019190915261008960008260086100cd565b50604080513381526000602082018190528183015290517fba85f6676f17ca992195e3cb204ae48c68666b109edc14a794e5d894387d25d39181900360600190a150565b6001830191839082156101595791602002820160005b8382111561012757835183826101000a81548163ffffffff021916908363ffffffff16021790555092602001926004016020816003010492830192600103026100e3565b80156101575782816101000a81549063ffffffff0219169055600401602081600301049283019260010302610127565b505b50610165929150610169565b5090565b5b80821115610165576000815560010161016a565b634e487b7160e01b600052600160045260246000fd5b61070e806101a36000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c80635d521c10116100505780635d521c101461009a57806393c96557146100ad578063e2c45a40146100d557600080fd5b8063055ad42e1461006c5780631cf355e814610087575b600080fd5b6100746100df565b6040519081526020015b60405180910390f35b610074610095366004610579565b610149565b6100746100a8366004610579565b610188565b6100c06100bb366004610603565b6101cf565b60405163ffffffff909116815260200161007e565b6100dd6101ff565b005b60408051610100810191829052600091610144919083906008908280855b82829054906101000a900463ffffffff1663ffffffff16815260200190600401906020826003010492830192600103820291508084116100fd579050505050505042610188565b905090565b600080821161015957600061017b565b8261016560018461064b565b600881106101755761017561065e565b60200201515b63ffffffff169392505050565b60005b60088110156101c9578281600881106101a6576101a661065e565b602002015163ffffffff1682106101c957806101c18161068d565b91505061018b565b92915050565b600081600881106101df57600080fd5b60089182820401919006600402915054906101000a900463ffffffff1681565b60006102096100df565b90506102148161023e565b6102286102228260016106c5565b42610283565b61023b6102368260016106c5565b61023e565b50565b80806102486100df565b1461027f576040517f301c306b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5050565b804211156102f2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f4e4558545f54494d455f5041535400000000000000000000000000000000000060448201526064015b60405180910390fd5b63ffffffff811061035f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f4e4558545f54494d455f554e494e495449414c495a454400000000000000000060448201526064016102e9565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82018061038b6100df565b146103f2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f4e4558545f50484153450000000000000000000000000000000000000000000060448201526064016102e9565b600081600881106104055761040561065e565b60088104919091015460079091166004026101000a900463ffffffff9081161461048b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f4e4558545f54494d455f5345540000000000000000000000000000000000000060448201526064016102e9565b816000826008811061049f5761049f61065e565b600891828204019190066004026101000a81548163ffffffff021916908363ffffffff1602179055507fba85f6676f17ca992195e3cb204ae48c68666b109edc14a794e5d894387d25d33384846040516105249392919073ffffffffffffffffffffffffffffffffffffffff9390931683526020830191909152604082015260600190565b60405180910390a1505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b803563ffffffff8116811461057457600080fd5b919050565b600080610120838503121561058d57600080fd5b83601f84011261059c57600080fd5b60405161010080820182811067ffffffffffffffff821117156105c1576105c1610531565b604052840181868211156105d457600080fd5b855b828110156105f5576105e781610560565b8252602091820191016105d6565b509196903595509350505050565b60006020828403121561061557600080fd5b5035919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b818103818111156101c9576101c961061c565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036106be576106be61061c565b5060010190565b808201808211156101c9576101c961061c56fea26469706673582212204f0fea2c0e89e9a3f8da256ebfbd563af9dd2faea56c5b04415d51996f40b02564736f6c63430008130033";

type PhasedScheduleTestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PhasedScheduleTestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PhasedScheduleTest__factory extends ContractFactory {
  constructor(...args: PhasedScheduleTestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PhasedScheduleTest> {
    return super.deploy(overrides || {}) as Promise<PhasedScheduleTest>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): PhasedScheduleTest {
    return super.attach(address) as PhasedScheduleTest;
  }
  override connect(signer: Signer): PhasedScheduleTest__factory {
    return super.connect(signer) as PhasedScheduleTest__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PhasedScheduleTestInterface {
    return new utils.Interface(_abi) as PhasedScheduleTestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PhasedScheduleTest {
    return new Contract(address, _abi, signerOrProvider) as PhasedScheduleTest;
  }
}
