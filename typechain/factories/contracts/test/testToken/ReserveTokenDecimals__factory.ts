/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  ReserveTokenDecimals,
  ReserveTokenDecimalsInterface,
} from "../../../../contracts/test/testToken/ReserveTokenDecimals";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "decimals_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "_decimals",
    outputs: [
      {
        internalType: "uint8",
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
        name: "account_",
        type: "address",
      },
    ],
    name: "addFreezable",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "freezables",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "initialSupply",
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
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
    inputs: [
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
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
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
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60c060405234801561001057600080fd5b506040516115f83803806115f883398101604081905261002f91610040565b60ff1660805260001960a052610059565b60006020828403121561005257600080fd5b5051919050565b60805160a05161156c61008c6000396000818161020101526106750152600081816101a301526101da015261156c6000f3fe608060405234801561001057600080fd5b50600436106101365760003560e01c806348422faa116100b25780638129fc1c11610081578063a457c2d711610066578063a457c2d714610324578063a9059cbb14610337578063dd62ed3e1461034a57600080fd5b80638129fc1c1461031457806395d89b411461031c57600080fd5b806348422faa1461024b5780635bb9058b1461026e57806370a08231146102cb57806379cc67901461030157600080fd5b8063313ce56711610109578063378dc3dc116100ee578063378dc3dc146101fc578063395093511461022357806342966c681461023657600080fd5b8063313ce567146101a157806332424aa3146101d557600080fd5b806306fdde031461013b578063095ea7b31461015957806318160ddd1461017c57806323b872dd1461018e575b600080fd5b610143610390565b60405161015091906111a9565b60405180910390f35b61016c61016736600461123e565b610422565b6040519015158152602001610150565b6035545b604051908152602001610150565b61016c61019c366004611268565b61043c565b7f00000000000000000000000000000000000000000000000000000000000000005b60405160ff9091168152602001610150565b6101c37f000000000000000000000000000000000000000000000000000000000000000081565b6101807f000000000000000000000000000000000000000000000000000000000000000081565b61016c61023136600461123e565b610460565b6102496102443660046112a4565b6104ac565b005b61016c6102593660046112bd565b60976020526000908152604090205460ff1681565b61024961027c3660046112bd565b73ffffffffffffffffffffffffffffffffffffffff16600090815260976020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055565b6101806102d93660046112bd565b73ffffffffffffffffffffffffffffffffffffffff1660009081526033602052604090205490565b61024961030f36600461123e565b6104b9565b6102496104d2565b6101436106fe565b61016c61033236600461123e565b61070d565b61016c61034536600461123e565b6107de565b6101806103583660046112df565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260346020908152604080832093909416825291909152205490565b60606036805461039f90611312565b80601f01602080910402602001604051908101604052809291908181526020018280546103cb90611312565b80156104185780601f106103ed57610100808354040283529160200191610418565b820191906000526020600020905b8154815290600101906020018083116103fb57829003601f168201915b5050505050905090565b6000336104308185856107ec565b60019150505b92915050565b60003361044a8582856109a0565b610455858585610a77565b506001949350505050565b33600081815260346020908152604080832073ffffffffffffffffffffffffffffffffffffffff8716845290915281205490919061043090829086906104a7908790611365565b6107ec565b6104b63382610cf8565b50565b6104c48233836109a0565b6104ce8282610cf8565b5050565b600054610100900460ff16158080156104f25750600054600160ff909116105b8061050c5750303b15801561050c575060005460ff166001145b61059d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a656400000000000000000000000000000000000060648201526084015b60405180910390fd5b600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905580156105fb57600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff166101001790555b61066f6040518060400160405280600b81526020017f55534420436c61737369630000000000000000000000000000000000000000008152506040518060400160405280600581526020017f5553444343000000000000000000000000000000000000000000000000000000815250610ec7565b610699337f0000000000000000000000000000000000000000000000000000000000000000610f68565b80156104b657600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150565b60606037805461039f90611312565b33600081815260346020908152604080832073ffffffffffffffffffffffffffffffffffffffff87168452909152812054909190838110156107d1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f0000000000000000000000000000000000000000000000000000006064820152608401610594565b61045582868684036107ec565b600033610430818585610a77565b73ffffffffffffffffffffffffffffffffffffffff831661088e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f72657373000000000000000000000000000000000000000000000000000000006064820152608401610594565b73ffffffffffffffffffffffffffffffffffffffff8216610931576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f73730000000000000000000000000000000000000000000000000000000000006064820152608401610594565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526034602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b73ffffffffffffffffffffffffffffffffffffffff8381166000908152603460209081526040808320938616835292905220547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610a715781811015610a64576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610594565b610a7184848484036107ec565b50505050565b73ffffffffffffffffffffffffffffffffffffffff8316610b1a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f64726573730000000000000000000000000000000000000000000000000000006064820152608401610594565b73ffffffffffffffffffffffffffffffffffffffff8216610bbd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f65737300000000000000000000000000000000000000000000000000000000006064820152608401610594565b610bc8838383611069565b73ffffffffffffffffffffffffffffffffffffffff831660009081526033602052604090205481811015610c7e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e636500000000000000000000000000000000000000000000000000006064820152608401610594565b73ffffffffffffffffffffffffffffffffffffffff80851660008181526033602052604080822086860390559286168082529083902080548601905591517fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610ceb9086815260200190565b60405180910390a3610a71565b73ffffffffffffffffffffffffffffffffffffffff8216610d9b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360448201527f73000000000000000000000000000000000000000000000000000000000000006064820152608401610594565b610da782600083611069565b73ffffffffffffffffffffffffffffffffffffffff821660009081526033602052604090205481811015610e5d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60448201527f63650000000000000000000000000000000000000000000000000000000000006064820152608401610594565b73ffffffffffffffffffffffffffffffffffffffff831660008181526033602090815260408083208686039055603580548790039055518581529192917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9101610993565b505050565b600054610100900460ff16610f5e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e670000000000000000000000000000000000000000006064820152608401610594565b6104ce82826110f9565b73ffffffffffffffffffffffffffffffffffffffff8216610fe5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610594565b610ff160008383611069565b80603560008282546110039190611365565b909155505073ffffffffffffffffffffffffffffffffffffffff82166000818152603360209081526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b73ffffffffffffffffffffffffffffffffffffffff821660009081526097602052604090205460ff1615610ec2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600660248201527f46524f5a454e00000000000000000000000000000000000000000000000000006044820152606401610594565b600054610100900460ff16611190576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e670000000000000000000000000000000000000000006064820152608401610594565b603661119c838261141c565b506037610ec2828261141c565b600060208083528351808285015260005b818110156111d6578581018301518582016040015282016111ba565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461123957600080fd5b919050565b6000806040838503121561125157600080fd5b61125a83611215565b946020939093013593505050565b60008060006060848603121561127d57600080fd5b61128684611215565b925061129460208501611215565b9150604084013590509250925092565b6000602082840312156112b657600080fd5b5035919050565b6000602082840312156112cf57600080fd5b6112d882611215565b9392505050565b600080604083850312156112f257600080fd5b6112fb83611215565b915061130960208401611215565b90509250929050565b600181811c9082168061132657607f821691505b60208210810361135f577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b80820180821115610436577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b601f821115610ec257600081815260208120601f850160051c810160208610156113f55750805b601f850160051c820191505b8181101561141457828155600101611401565b505050505050565b815167ffffffffffffffff8111156114365761143661139f565b61144a816114448454611312565b846113ce565b602080601f83116001811461149d57600084156114675750858301515b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600386901b1c1916600185901b178555611414565b6000858152602081207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08616915b828110156114ea578886015182559484019460019091019084016114cb565b508582101561152657878501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600388901b60f8161c191681555b5050505050600190811b0190555056fea2646970667358221220752107cf36f157d383997ab915652c0fc3431380621d3c03a3836caf0e07722564736f6c63430008130033";

type ReserveTokenDecimalsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ReserveTokenDecimalsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ReserveTokenDecimals__factory extends ContractFactory {
  constructor(...args: ReserveTokenDecimalsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    decimals_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ReserveTokenDecimals> {
    return super.deploy(
      decimals_,
      overrides || {}
    ) as Promise<ReserveTokenDecimals>;
  }
  override getDeployTransaction(
    decimals_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(decimals_, overrides || {});
  }
  override attach(address: string): ReserveTokenDecimals {
    return super.attach(address) as ReserveTokenDecimals;
  }
  override connect(signer: Signer): ReserveTokenDecimals__factory {
    return super.connect(signer) as ReserveTokenDecimals__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ReserveTokenDecimalsInterface {
    return new utils.Interface(_abi) as ReserveTokenDecimalsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ReserveTokenDecimals {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ReserveTokenDecimals;
  }
}
