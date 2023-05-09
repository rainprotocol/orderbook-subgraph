/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
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
} from "../../../../common";

export type DeployerDiscoverableMetaV1ConstructionConfigStruct = {
  deployer: PromiseOrValue<string>;
  meta: PromiseOrValue<BytesLike>;
};

export type DeployerDiscoverableMetaV1ConstructionConfigStructOutput = [
  string,
  string
] & { deployer: string; meta: string };

export interface IInterpreterCallerConsumerInterface extends utils.Interface {
  functions: {
    "checkIsRainMetaV1(bytes)": FunctionFragment;
    "checkMeta(bytes,bytes)": FunctionFragment;
    "deployTouchExpression(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "checkIsRainMetaV1"
      | "checkMeta"
      | "deployTouchExpression"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "checkIsRainMetaV1",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "checkMeta",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "deployTouchExpression",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "checkIsRainMetaV1",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "checkMeta", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deployTouchExpression",
    data: BytesLike
  ): Result;

  events: {
    "MetaV1(address,uint256,bytes)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "MetaV1"): EventFragment;
}

export interface MetaV1EventObject {
  sender: string;
  subject: BigNumber;
  meta: string;
}
export type MetaV1Event = TypedEvent<
  [string, BigNumber, string],
  MetaV1EventObject
>;

export type MetaV1EventFilter = TypedEventFilter<MetaV1Event>;

export interface IInterpreterCallerConsumer extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IInterpreterCallerConsumerInterface;

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
    checkIsRainMetaV1(
      meta_: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    checkMeta(
      expectedHash_: PromiseOrValue<BytesLike>,
      meta_: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    deployTouchExpression(
      deployer_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  checkIsRainMetaV1(
    meta_: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  checkMeta(
    expectedHash_: PromiseOrValue<BytesLike>,
    meta_: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  deployTouchExpression(
    deployer_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    checkIsRainMetaV1(
      meta_: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    checkMeta(
      expectedHash_: PromiseOrValue<BytesLike>,
      meta_: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    deployTouchExpression(
      deployer_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "MetaV1(address,uint256,bytes)"(
      sender?: null,
      subject?: null,
      meta?: null
    ): MetaV1EventFilter;
    MetaV1(sender?: null, subject?: null, meta?: null): MetaV1EventFilter;
  };

  estimateGas: {
    checkIsRainMetaV1(
      meta_: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    checkMeta(
      expectedHash_: PromiseOrValue<BytesLike>,
      meta_: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    deployTouchExpression(
      deployer_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    checkIsRainMetaV1(
      meta_: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    checkMeta(
      expectedHash_: PromiseOrValue<BytesLike>,
      meta_: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    deployTouchExpression(
      deployer_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
