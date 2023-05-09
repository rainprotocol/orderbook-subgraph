/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export type EvaluableConfigStruct = {
  deployer: PromiseOrValue<string>;
  sources: PromiseOrValue<BytesLike>[];
  constants: PromiseOrValue<BigNumberish>[];
};

export type EvaluableConfigStructOutput = [string, string[], BigNumber[]] & {
  deployer: string;
  sources: string[];
  constants: BigNumber[];
};

export type FlowConfigStruct = {
  dummyConfig: EvaluableConfigStruct;
  config: EvaluableConfigStruct[];
};

export type FlowConfigStructOutput = [
  EvaluableConfigStructOutput,
  EvaluableConfigStructOutput[]
] & {
  dummyConfig: EvaluableConfigStructOutput;
  config: EvaluableConfigStructOutput[];
};

export type EvaluableStruct = {
  interpreter: PromiseOrValue<string>;
  store: PromiseOrValue<string>;
  expression: PromiseOrValue<string>;
};

export type EvaluableStructOutput = [string, string, string] & {
  interpreter: string;
  store: string;
  expression: string;
};

export type SignedContextV1Struct = {
  signer: PromiseOrValue<string>;
  context: PromiseOrValue<BigNumberish>[];
  signature: PromiseOrValue<BytesLike>;
};

export type SignedContextV1StructOutput = [string, BigNumber[], string] & {
  signer: string;
  context: BigNumber[];
  signature: string;
};

export type ERC20TransferStruct = {
  token: PromiseOrValue<string>;
  from: PromiseOrValue<string>;
  to: PromiseOrValue<string>;
  amount: PromiseOrValue<BigNumberish>;
};

export type ERC20TransferStructOutput = [string, string, string, BigNumber] & {
  token: string;
  from: string;
  to: string;
  amount: BigNumber;
};

export type ERC721TransferStruct = {
  token: PromiseOrValue<string>;
  from: PromiseOrValue<string>;
  to: PromiseOrValue<string>;
  id: PromiseOrValue<BigNumberish>;
};

export type ERC721TransferStructOutput = [string, string, string, BigNumber] & {
  token: string;
  from: string;
  to: string;
  id: BigNumber;
};

export type ERC1155TransferStruct = {
  token: PromiseOrValue<string>;
  from: PromiseOrValue<string>;
  to: PromiseOrValue<string>;
  id: PromiseOrValue<BigNumberish>;
  amount: PromiseOrValue<BigNumberish>;
};

export type ERC1155TransferStructOutput = [
  string,
  string,
  string,
  BigNumber,
  BigNumber
] & {
  token: string;
  from: string;
  to: string;
  id: BigNumber;
  amount: BigNumber;
};

export type FlowTransferV1Struct = {
  erc20: ERC20TransferStruct[];
  erc721: ERC721TransferStruct[];
  erc1155: ERC1155TransferStruct[];
};

export type FlowTransferV1StructOutput = [
  ERC20TransferStructOutput[],
  ERC721TransferStructOutput[],
  ERC1155TransferStructOutput[]
] & {
  erc20: ERC20TransferStructOutput[];
  erc721: ERC721TransferStructOutput[];
  erc1155: ERC1155TransferStructOutput[];
};

export interface IFlowV3Interface extends utils.Interface {
  functions: {
    "flow((address,address,address),uint256[],(address,uint256[],bytes)[])": FunctionFragment;
    "previewFlow((address,address,address),uint256[],(address,uint256[],bytes)[])": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "flow" | "previewFlow"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "flow",
    values: [
      EvaluableStruct,
      PromiseOrValue<BigNumberish>[],
      SignedContextV1Struct[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "previewFlow",
    values: [
      EvaluableStruct,
      PromiseOrValue<BigNumberish>[],
      SignedContextV1Struct[]
    ]
  ): string;

  decodeFunctionResult(functionFragment: "flow", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "previewFlow",
    data: BytesLike
  ): Result;

  events: {
    "Initialize(address,tuple)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialize"): EventFragment;
}

export interface InitializeEventObject {
  sender: string;
  config: FlowConfigStructOutput;
}
export type InitializeEvent = TypedEvent<
  [string, FlowConfigStructOutput],
  InitializeEventObject
>;

export type InitializeEventFilter = TypedEventFilter<InitializeEvent>;

export interface IFlowV3 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IFlowV3Interface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    flow(
      evaluable: EvaluableStruct,
      callerContext: PromiseOrValue<BigNumberish>[],
      signedContexts: SignedContextV1Struct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    previewFlow(
      evaluable: EvaluableStruct,
      callerContext: PromiseOrValue<BigNumberish>[],
      signedContexts: SignedContextV1Struct[],
      overrides?: CallOverrides
    ): Promise<
      [FlowTransferV1StructOutput] & {
        flowTransfer: FlowTransferV1StructOutput;
      }
    >;
  };

  flow(
    evaluable: EvaluableStruct,
    callerContext: PromiseOrValue<BigNumberish>[],
    signedContexts: SignedContextV1Struct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  previewFlow(
    evaluable: EvaluableStruct,
    callerContext: PromiseOrValue<BigNumberish>[],
    signedContexts: SignedContextV1Struct[],
    overrides?: CallOverrides
  ): Promise<FlowTransferV1StructOutput>;

  callStatic: {
    flow(
      evaluable: EvaluableStruct,
      callerContext: PromiseOrValue<BigNumberish>[],
      signedContexts: SignedContextV1Struct[],
      overrides?: CallOverrides
    ): Promise<FlowTransferV1StructOutput>;

    previewFlow(
      evaluable: EvaluableStruct,
      callerContext: PromiseOrValue<BigNumberish>[],
      signedContexts: SignedContextV1Struct[],
      overrides?: CallOverrides
    ): Promise<FlowTransferV1StructOutput>;
  };

  filters: {
    "Initialize(address,tuple)"(
      sender?: null,
      config?: null
    ): InitializeEventFilter;
    Initialize(sender?: null, config?: null): InitializeEventFilter;
  };

  estimateGas: {
    flow(
      evaluable: EvaluableStruct,
      callerContext: PromiseOrValue<BigNumberish>[],
      signedContexts: SignedContextV1Struct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    previewFlow(
      evaluable: EvaluableStruct,
      callerContext: PromiseOrValue<BigNumberish>[],
      signedContexts: SignedContextV1Struct[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    flow(
      evaluable: EvaluableStruct,
      callerContext: PromiseOrValue<BigNumberish>[],
      signedContexts: SignedContextV1Struct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    previewFlow(
      evaluable: EvaluableStruct,
      callerContext: PromiseOrValue<BigNumberish>[],
      signedContexts: SignedContextV1Struct[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
