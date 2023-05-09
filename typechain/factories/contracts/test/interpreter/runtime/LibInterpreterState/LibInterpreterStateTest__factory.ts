/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../../common";
import type {
  LibInterpreterStateTest,
  LibInterpreterStateTestInterface,
} from "../../../../../../contracts/test/interpreter/runtime/LibInterpreterState/LibInterpreterStateTest";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "sources_",
        type: "bytes[]",
      },
      {
        internalType: "uint256[]",
        name: "constants_",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "stackLength_",
        type: "uint256",
      },
      {
        internalType: "uint256[][]",
        name: "context_",
        type: "uint256[][]",
      },
      {
        internalType: "contract IInterpreterV1",
        name: "interpreter_",
        type: "address",
      },
    ],
    name: "serDeserialize",
    outputs: [
      {
        components: [
          {
            internalType: "StackPointer",
            name: "stackBottom",
            type: "uint256",
          },
          {
            internalType: "StackPointer",
            name: "constantsBottom",
            type: "uint256",
          },
          {
            internalType: "MemoryKV",
            name: "stateKV",
            type: "uint256",
          },
          {
            internalType: "FullyQualifiedNamespace",
            name: "namespace",
            type: "uint256",
          },
          {
            internalType: "contract IInterpreterStoreV1",
            name: "store",
            type: "address",
          },
          {
            internalType: "uint256[][]",
            name: "context",
            type: "uint256[][]",
          },
          {
            internalType: "bytes[]",
            name: "compiledSources",
            type: "bytes[]",
          },
        ],
        internalType: "struct InterpreterState",
        name: "state_",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IInterpreterV1",
        name: "interpreter_",
        type: "address",
      },
      {
        internalType: "bytes[]",
        name: "sources_",
        type: "bytes[]",
      },
      {
        internalType: "uint256[]",
        name: "constants_",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "stackLength_",
        type: "uint256",
      },
    ],
    name: "serialize",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610e37806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063aa93e39e1461003b578063e304329514610064575b600080fd5b61004e610049366004610955565b610084565b60405161005b9190610a3f565b60405180910390f35b610077610072366004610a52565b610181565b60405161005b9190610bba565b60606000610093858585610203565b67ffffffffffffffff8111156100ab576100ab610743565b6040519080825280601f01601f1916602001820160405280156100d5576020820181803683370190505b509050610178602082018686868a73ffffffffffffffffffffffffffffffffffffffff1663f933c72f6040518163ffffffff1660e01b8152600401600060405180830381865afa15801561012d573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526101739190810190610cea565b610284565b95945050505050565b6101d76040518060e0016040528060008152602001600081526020016000815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160608152602001606081525090565b60006101e583888888610084565b90506101f0816102ef565b60a0810194909452509195945050505050565b600080610211602082610d87565b9050610221845160209081020190565b61022b9082610d87565b905060005b855181101561027b5761025d86828151811061024e5761024e610d9a565b60200260200101515160200190565b6102679083610d87565b91508061027381610dc9565b915050610230565b50949350505050565b8461028f8184610582565b905061029b8185610593565b9050606060005b86518110156102e5578681815181106102bd576102bd610d9a565b602002602001015191506102d182856105ba565b6102db8383610619565b92506001016102a2565b5050505050505050565b6103456040518060e0016040528060008152602001600081526020016000815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160608152602001606081525090565b61039b6040518060e0016040528060008152602001600081526020016000815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160608152602001606081525090565b60408051600080825260208201909252906103c6565b60608152602001906001900390816103b15790505b5060a082015260006103d9845b60200190565b9050600061040f61040a837fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015190565b830190565b90506020820191506000610443837fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015190565b905060008167ffffffffffffffff81111561046057610460610743565b604051908082528060200260200182016040528015610489578160200160208202803683370190505b506020808201875285810190870181905294519091506104ab90602002850190565b9350600084815b858210156104d7576104cd6103d36104c8845190565b840190565b91506001016104b2565b8067ffffffffffffffff8111156104f0576104f0610743565b60405190808252806020026020018201604052801561052357816020015b606081526020019060019003908161050e5790505b5060c08901525b8587101561057457868860c00151848151811061054957610549610d9a565b60200260200101819052506105676103d3610562895190565b890190565b965060019092019161052a565b509598975050505050505050565b808252602090910190815b92915050565b60006105b3826105ad84518661058290919063ffffffff16565b90610639565b9392505050565b815161ffff907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000090840160028481019086015b8281101561061057805185811660020283015186169085161781526004016105ed565b50505050505050565b60006105b38261063384518661058290919063ffffffff16565b90610656565b600061064a60208301848451610675565b815160200283016105b3565b600061066c610664836103d3565b84845161069d565b815183016105b3565b8060200283015b8084101561069757835183526020938401939092019161067c565b50505050565b5b602081106106db5782518252602092830192909101907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe00161069e565b8015610715577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600882021c808351168119855116178352505b505050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461073e57600080fd5b919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156107b9576107b9610743565b604052919050565b600067ffffffffffffffff8211156107db576107db610743565b5060051b60200190565b600067ffffffffffffffff8211156107ff576107ff610743565b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01660200190565b600082601f83011261083c57600080fd5b8135602061085161084c836107c1565b610772565b82815260059290921b8401810191818101908684111561087057600080fd5b8286015b848110156108ef57803567ffffffffffffffff8111156108945760008081fd5b8701603f810189136108a65760008081fd5b8481013560406108b861084c836107e5565b8281528b828486010111156108cd5760008081fd5b8282850189830137600092810188019290925250845250918301918301610874565b509695505050505050565b600082601f83011261090b57600080fd5b8135602061091b61084c836107c1565b82815260059290921b8401810191818101908684111561093a57600080fd5b8286015b848110156108ef578035835291830191830161093e565b6000806000806080858703121561096b57600080fd5b6109748561071a565b9350602085013567ffffffffffffffff8082111561099157600080fd5b61099d8883890161082b565b945060408701359150808211156109b357600080fd5b506109c0878288016108fa565b949793965093946060013593505050565b60005b838110156109ec5781810151838201526020016109d4565b50506000910152565b60008151808452610a0d8160208601602086016109d1565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b6020815260006105b360208301846109f5565b600080600080600060a08688031215610a6a57600080fd5b853567ffffffffffffffff80821115610a8257600080fd5b610a8e89838a0161082b565b9650602091508188013581811115610aa557600080fd5b610ab18a828b016108fa565b96505060408801359450606088013581811115610acd57600080fd5b8801601f81018a13610ade57600080fd5b8035610aec61084c826107c1565b81815260059190911b8201840190848101908c831115610b0b57600080fd5b8584015b83811015610b4357803586811115610b275760008081fd5b610b358f89838901016108fa565b845250918601918601610b0f565b50809750505050505050610b596080870161071a565b90509295509295909350565b600081518084526020808501808196508360051b8101915082860160005b85811015610bad578284038952610b9b8483516109f5565b98850198935090840190600101610b83565b5091979650505050505050565b600060208083526101008301845182850152818501516040850152604085015160608501526060850151608085015273ffffffffffffffffffffffffffffffffffffffff60808601511660a085015260a085015160e060c086015281815180845261012093508387019150838160051b880101935084830192506000805b82811015610caa578886037ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffee0018452845180518088529088019088880190845b81811015610c945783518352928a0192918a0191600101610c78565b5090975050509386019392860192600101610c38565b505050505060c085015191507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08482030160e08501526101788183610b65565b600060208284031215610cfc57600080fd5b815167ffffffffffffffff811115610d1357600080fd5b8201601f81018413610d2457600080fd5b8051610d3261084c826107e5565b818152856020838501011115610d4757600080fd5b6101788260208301602086016109d1565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b8082018082111561058d5761058d610d58565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610dfa57610dfa610d58565b506001019056fea26469706673582212200ced065a7904f39002f43ec2bb91bf6fd7343099e4e6a79db0b984cc2f09cbb264736f6c63430008130033";

type LibInterpreterStateTestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LibInterpreterStateTestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LibInterpreterStateTest__factory extends ContractFactory {
  constructor(...args: LibInterpreterStateTestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<LibInterpreterStateTest> {
    return super.deploy(overrides || {}) as Promise<LibInterpreterStateTest>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): LibInterpreterStateTest {
    return super.attach(address) as LibInterpreterStateTest;
  }
  override connect(signer: Signer): LibInterpreterStateTest__factory {
    return super.connect(signer) as LibInterpreterStateTest__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LibInterpreterStateTestInterface {
    return new utils.Interface(_abi) as LibInterpreterStateTestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LibInterpreterStateTest {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as LibInterpreterStateTest;
  }
}
