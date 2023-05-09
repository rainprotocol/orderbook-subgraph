/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  LibEvidenceTest,
  LibEvidenceTestInterface,
} from "../../../../../contracts/test/verify/LibEvidence/LibEvidenceTest";

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct Evidence",
        name: "evidence_",
        type: "tuple",
      },
    ],
    name: "updateEvidenceRefAndReturnEvidenceFromRef",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct Evidence",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct Evidence[]",
        name: "evidences_",
        type: "tuple[]",
      },
    ],
    name: "updateEvidenceRefsAndReturnEvidencesFromRefs",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct Evidence[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610621806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806307cb19f01461003b578063e94ec04814610064575b600080fd5b61004e61004936600461033c565b610084565b60405161005b919061048e565b60405180910390f35b61007761007236600461050e565b610135565b60405161005b9190610543565b60606000825167ffffffffffffffff8111156100a2576100a26101ad565b6040519080825280602002602001820160405280156100cb578160200160208202803683370190505b5090506000805b845181101561012a5761010a838683815181106100f1576100f161055d565b6020026020010151848181602002602001840152505050565b816101148161058c565b92505080806101229061058c565b9150506100d2565b50815b949350505050565b6040805180820182526000808252606060208301528251600180825281850190945291929091908160200160208202803683375050506020810184905290506000806101808161058c565b91505061018a8290565b60008151811061019c5761019c61055d565b602002602001015192505050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040805190810167ffffffffffffffff811182821017156101ff576101ff6101ad565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff8111828210171561024c5761024c6101ad565b604052919050565b60006040828403121561026657600080fd5b61026e6101dc565b9050813573ffffffffffffffffffffffffffffffffffffffff8116811461029457600080fd5b815260208281013567ffffffffffffffff808211156102b257600080fd5b818501915085601f8301126102c657600080fd5b8135818111156102d8576102d86101ad565b610308847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601610205565b9150808252868482850101111561031e57600080fd5b80848401858401376000908201840152918301919091525092915050565b6000602080838503121561034f57600080fd5b823567ffffffffffffffff8082111561036757600080fd5b818501915085601f83011261037b57600080fd5b81358181111561038d5761038d6101ad565b8060051b61039c858201610205565b91825283810185019185810190898411156103b657600080fd5b86860192505b838310156103f2578235858111156103d45760008081fd5b6103e28b89838a0101610254565b83525091860191908601906103bc565b9998505050505050505050565b73ffffffffffffffffffffffffffffffffffffffff81511682526000602080830151604082860152805180604087015260005b8181101561044e57828101840151878201606001528301610432565b5060006060828801015260607fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f830116870101935050505092915050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b82811015610501577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc08886030184526104ef8583516103ff565b945092850192908501906001016104b5565b5092979650505050505050565b60006020828403121561052057600080fd5b813567ffffffffffffffff81111561053757600080fd5b61012d84828501610254565b60208152600061055660208301846103ff565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036105e4577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b506001019056fea2646970667358221220c685002870b59c887401e29b641246a9a3460c117c3c277fbcb8c968d729906464736f6c63430008130033";

type LibEvidenceTestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LibEvidenceTestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LibEvidenceTest__factory extends ContractFactory {
  constructor(...args: LibEvidenceTestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<LibEvidenceTest> {
    return super.deploy(overrides || {}) as Promise<LibEvidenceTest>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): LibEvidenceTest {
    return super.attach(address) as LibEvidenceTest;
  }
  override connect(signer: Signer): LibEvidenceTest__factory {
    return super.connect(signer) as LibEvidenceTest__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LibEvidenceTestInterface {
    return new utils.Interface(_abi) as LibEvidenceTestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LibEvidenceTest {
    return new Contract(address, _abi, signerOrProvider) as LibEvidenceTest;
  }
}
