/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  LibMemoryKVTest,
  LibMemoryKVTestInterface,
} from "../../../../contracts/test/kv/LibMemoryKVTest";

const _abi = [
  {
    inputs: [
      {
        internalType: "MemoryKVPtr",
        name: "ptr",
        type: "uint256",
      },
    ],
    name: "InvalidPtr",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "MemoryKV",
        name: "kv_",
        type: "uint256",
      },
      {
        internalType: "MemoryKVKey",
        name: "k_",
        type: "uint256",
      },
    ],
    name: "getPtr",
    outputs: [
      {
        internalType: "MemoryKVPtr",
        name: "ptr_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "MemoryKVPtr",
        name: "ptr_",
        type: "uint256",
      },
    ],
    name: "readPtrVal",
    outputs: [
      {
        internalType: "MemoryKVVal",
        name: "val_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "MemoryKV",
        name: "kv_",
        type: "uint256",
      },
      {
        internalType: "MemoryKVKey",
        name: "k_",
        type: "uint256",
      },
      {
        internalType: "MemoryKVVal",
        name: "v_",
        type: "uint256",
      },
    ],
    name: "scenario0",
    outputs: [
      {
        internalType: "uint256[]",
        name: "array_",
        type: "uint256[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "MemoryKV",
        name: "kv_",
        type: "uint256",
      },
      {
        internalType: "MemoryKVKey",
        name: "k_",
        type: "uint256",
      },
      {
        internalType: "MemoryKVVal",
        name: "v_",
        type: "uint256",
      },
    ],
    name: "scenario1",
    outputs: [
      {
        internalType: "MemoryKVPtr",
        name: "ptr_",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "MemoryKV",
        name: "kv_",
        type: "uint256",
      },
      {
        internalType: "MemoryKVKey",
        name: "k_",
        type: "uint256",
      },
    ],
    name: "scenario2",
    outputs: [
      {
        internalType: "MemoryKVPtr",
        name: "ptr_",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "MemoryKV",
        name: "kv_",
        type: "uint256",
      },
      {
        internalType: "MemoryKVKey",
        name: "k_",
        type: "uint256",
      },
      {
        internalType: "MemoryKVVal",
        name: "v_",
        type: "uint256",
      },
    ],
    name: "scenario3",
    outputs: [
      {
        internalType: "MemoryKVVal",
        name: "val_",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "MemoryKV",
        name: "kv_",
        type: "uint256",
      },
      {
        internalType: "MemoryKVKey",
        name: "k_",
        type: "uint256",
      },
      {
        internalType: "MemoryKVVal",
        name: "v0_",
        type: "uint256",
      },
      {
        internalType: "MemoryKVVal",
        name: "v1_",
        type: "uint256",
      },
    ],
    name: "scenario4",
    outputs: [
      {
        internalType: "MemoryKVVal",
        name: "val_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "MemoryKV",
        name: "kv_",
        type: "uint256",
      },
      {
        internalType: "MemoryKVKey",
        name: "k0_",
        type: "uint256",
      },
      {
        internalType: "MemoryKVVal",
        name: "v0_",
        type: "uint256",
      },
      {
        internalType: "MemoryKVKey",
        name: "k1_",
        type: "uint256",
      },
      {
        internalType: "MemoryKVVal",
        name: "v1_",
        type: "uint256",
      },
    ],
    name: "scenario5",
    outputs: [
      {
        internalType: "uint256[]",
        name: "array_",
        type: "uint256[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "MemoryKV",
        name: "kv0_",
        type: "uint256",
      },
      {
        internalType: "MemoryKV",
        name: "kv1_",
        type: "uint256",
      },
      {
        internalType: "MemoryKVKey",
        name: "k_",
        type: "uint256",
      },
      {
        internalType: "MemoryKVVal",
        name: "v0_",
        type: "uint256",
      },
      {
        internalType: "MemoryKVVal",
        name: "v1_",
        type: "uint256",
      },
    ],
    name: "scenario6",
    outputs: [
      {
        internalType: "MemoryKVVal",
        name: "val0_",
        type: "uint256",
      },
      {
        internalType: "MemoryKVVal",
        name: "val1_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "MemoryKV",
        name: "kv_",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "kvPair_",
        type: "uint256[]",
      },
    ],
    name: "scenario7",
    outputs: [
      {
        internalType: "uint256[]",
        name: "array_",
        type: "uint256[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "MemoryKV",
        name: "kv_",
        type: "uint256",
      },
      {
        internalType: "MemoryKVKey",
        name: "k_",
        type: "uint256",
      },
      {
        internalType: "MemoryKVVal",
        name: "v_",
        type: "uint256",
      },
    ],
    name: "setVal",
    outputs: [
      {
        internalType: "MemoryKV",
        name: "kvSetVal_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "MemoryKV",
        name: "kv_",
        type: "uint256",
      },
    ],
    name: "toUint256Array",
    outputs: [
      {
        internalType: "uint256[]",
        name: "array_",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061099b806100206000396000f3fe608060405234801561001057600080fd5b50600436106100d45760003560e01c806344d5e8b911610081578063b2292fa71161005b578063b2292fa7146101b9578063e7de6a85146101cc578063fb8f8bcd146101df57600080fd5b806344d5e8b9146101805780635ecd68e11461019357806398765099146101a657600080fd5b80631733cdc8116100b25780631733cdc8146101475780631f2159931461015a5780632100fbf51461016d57600080fd5b80630554f74f146100d95780631327afdb1461010657806314e7a51e14610127575b600080fd5b6100ec6100e736600461067a565b6101f2565b604080519283526020830191909152015b60405180910390f35b6101196101143660046106b5565b61026f565b6040519081526020016100fd565b61013a6101353660046106b5565b61029e565b6040516100fd91906106e1565b6101196101553660046106b5565b6102be565b61013a610168366004610725565b6102ed565b61011961017b366004610725565b610318565b61013a61018e36600461076d565b61033e565b61013a6101a136600461067a565b6103d7565b6101196101b4366004610855565b610406565b6101196101c7366004610887565b61045d565b6101196101da3660046106b5565b610469565b6101196101ed366004610887565b610482565b6000806102008786866104af565b965061020a610508565b6102158686856104af565b955061021f610508565b600061022b8887610510565b905061023681610539565b925060006102448888610510565b905061024f81610539565b925061025a84610584565b61026383610584565b50509550959350505050565b6000610279610508565b6102848484846104af565b905061028e610508565b61029781610584565b9392505050565b60606102ab8484846104af565b93506102b6846105bb565b949350505050565b60006102cb8484846104af565b935060006102d98585610510565b90506102e481610539565b95945050505050565b60606102f7610508565b610300826105bb565b905061030a610508565b6103138161064b565b919050565b6000610322610508565b61032b82610539565b9050610335610508565b61031381610584565b60606000805b6001845161035291906108d8565b8110156103cd5781610363816108eb565b9250506103b984828151811061037b5761037b610923565b6020026020010151858360016103919190610952565b815181106103a1576103a1610923565b6020026020010151876104af9092919063ffffffff16565b94506103c6600282610952565b9050610344565b506102b6846105bb565b60606103e48686866104af565b95506103f18684846104af565b95506103fc866105bb565b9695505050505050565b60006104138585856104af565b945061041d610508565b6104288585846104af565b9450610432610508565b600061043e8686610510565b905061044981610539565b915061045482610584565b50949350505050565b60006102978383610510565b60006104768484846104af565b93506102b68484610510565b600061048c610508565b6104968383610510565b90506104a0610508565b6104a981610584565b92915050565b6000806104bc8585610510565b905061ffff81156104d2578360208301526104fe565b60405191506060820160405284825283602083015280861660408301528160028760101c0160101b1795505b5093949350505050565b6040516000a0565b61ffff828116905b811561053257815183146105325760408201519150610518565b5092915050565b60008160000361057c576040517f295cd2220000000000000000000000000000000000000000000000000000000081526004810183905260240160405180910390fd5b506020015190565b6040518181527fe6fc1df15bb41e2a123ea1d440db6747be3ed04da67b92ac280ad10a97b799d8906020015b60405180910390a150565b606061ffff8216601083901c60008167ffffffffffffffff8111156105e2576105e261073e565b60405190808252806020026020018201604052801561060b578160200160208202803683370190505b50905060208101602082510281015b80821015610640578451825260208086015190830152604094850151949091019061061a565b509095945050505050565b7f268c78c0f09f13742966c15f2d15fde62853a37d13746874208d5aa07c53331d816040516105b091906106e1565b600080600080600060a0868803121561069257600080fd5b505083359560208501359550604085013594606081013594506080013592509050565b6000806000606084860312156106ca57600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b81811015610719578351835292840192918401916001016106fd565b50909695505050505050565b60006020828403121561073757600080fd5b5035919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000806040838503121561078057600080fd5b8235915060208084013567ffffffffffffffff808211156107a057600080fd5b818601915086601f8301126107b457600080fd5b8135818111156107c6576107c661073e565b8060051b6040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0603f830116810181811085821117156108095761080961073e565b60405291825284820192508381018501918983111561082757600080fd5b938501935b828510156108455784358452938501939285019261082c565b8096505050505050509250929050565b6000806000806080858703121561086b57600080fd5b5050823594602084013594506040840135936060013592509050565b6000806040838503121561089a57600080fd5b50508035926020909101359150565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b818103818111156104a9576104a96108a9565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361091c5761091c6108a9565b5060010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b808201808211156104a9576104a96108a956fea264697066735822122082ca09a24221961bed9d3e7e9fc4b876215f86dc74176072fd6b4c80fbf5710a64736f6c63430008130033";

type LibMemoryKVTestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LibMemoryKVTestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LibMemoryKVTest__factory extends ContractFactory {
  constructor(...args: LibMemoryKVTestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<LibMemoryKVTest> {
    return super.deploy(overrides || {}) as Promise<LibMemoryKVTest>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): LibMemoryKVTest {
    return super.attach(address) as LibMemoryKVTest;
  }
  override connect(signer: Signer): LibMemoryKVTest__factory {
    return super.connect(signer) as LibMemoryKVTest__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LibMemoryKVTestInterface {
    return new utils.Interface(_abi) as LibMemoryKVTestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LibMemoryKVTest {
    return new Contract(address, _abi, signerOrProvider) as LibMemoryKVTest;
  }
}
