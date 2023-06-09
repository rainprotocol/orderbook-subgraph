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
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export type IOStruct = {
  token: PromiseOrValue<string>;
  decimals: PromiseOrValue<BigNumberish>;
  vaultId: PromiseOrValue<BigNumberish>;
};

export type IOStructOutput = [string, number, BigNumber] & {
  token: string;
  decimals: number;
  vaultId: BigNumber;
};

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

export type OrderConfigStruct = {
  validInputs: IOStruct[];
  validOutputs: IOStruct[];
  evaluableConfig: EvaluableConfigStruct;
  meta: PromiseOrValue<BytesLike>;
};

export type OrderConfigStructOutput = [
  IOStructOutput[],
  IOStructOutput[],
  EvaluableConfigStructOutput,
  string
] & {
  validInputs: IOStructOutput[];
  validOutputs: IOStructOutput[];
  evaluableConfig: EvaluableConfigStructOutput;
  meta: string;
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

export type OrderStruct = {
  owner: PromiseOrValue<string>;
  handleIO: PromiseOrValue<boolean>;
  evaluable: EvaluableStruct;
  validInputs: IOStruct[];
  validOutputs: IOStruct[];
};

export type OrderStructOutput = [
  string,
  boolean,
  EvaluableStructOutput,
  IOStructOutput[],
  IOStructOutput[]
] & {
  owner: string;
  handleIO: boolean;
  evaluable: EvaluableStructOutput;
  validInputs: IOStructOutput[];
  validOutputs: IOStructOutput[];
};

export type ClearConfigStruct = {
  aliceInputIOIndex: PromiseOrValue<BigNumberish>;
  aliceOutputIOIndex: PromiseOrValue<BigNumberish>;
  bobInputIOIndex: PromiseOrValue<BigNumberish>;
  bobOutputIOIndex: PromiseOrValue<BigNumberish>;
  aliceBountyVaultId: PromiseOrValue<BigNumberish>;
  bobBountyVaultId: PromiseOrValue<BigNumberish>;
};

export type ClearConfigStructOutput = [
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber
] & {
  aliceInputIOIndex: BigNumber;
  aliceOutputIOIndex: BigNumber;
  bobInputIOIndex: BigNumber;
  bobOutputIOIndex: BigNumber;
  aliceBountyVaultId: BigNumber;
  bobBountyVaultId: BigNumber;
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

export type MultiClearStruct = {
  alice_: OrderStruct;
  bob_: OrderStruct;
  clearConfig_: ClearConfigStruct;
  aliceSignedContext_: SignedContextV1Struct[];
  bobSignedContext_: SignedContextV1Struct[];
};

export type MultiClearStructOutput = [
  OrderStructOutput,
  OrderStructOutput,
  ClearConfigStructOutput,
  SignedContextV1StructOutput[],
  SignedContextV1StructOutput[]
] & {
  alice_: OrderStructOutput;
  bob_: OrderStructOutput;
  clearConfig_: ClearConfigStructOutput;
  aliceSignedContext_: SignedContextV1StructOutput[];
  bobSignedContext_: SignedContextV1StructOutput[];
};

export type DepositConfigStruct = {
  token: PromiseOrValue<string>;
  vaultId: PromiseOrValue<BigNumberish>;
  amount: PromiseOrValue<BigNumberish>;
};

export type DepositConfigStructOutput = [string, BigNumber, BigNumber] & {
  token: string;
  vaultId: BigNumber;
  amount: BigNumber;
};

export type WithdrawConfigStruct = {
  token: PromiseOrValue<string>;
  vaultId: PromiseOrValue<BigNumberish>;
  amount: PromiseOrValue<BigNumberish>;
};

export type WithdrawConfigStructOutput = [string, BigNumber, BigNumber] & {
  token: string;
  vaultId: BigNumber;
  amount: BigNumber;
};

export interface OBMultiTxInterface extends utils.Interface {
  functions: {
    "OBContract()": FunctionFragment;
    "multiAddOrder(((address,uint8,uint256)[],(address,uint8,uint256)[],(address,bytes[],uint256[]),bytes)[])": FunctionFragment;
    "multiClear(((address,bool,(address,address,address),(address,uint8,uint256)[],(address,uint8,uint256)[]),(address,bool,(address,address,address),(address,uint8,uint256)[],(address,uint8,uint256)[]),(uint256,uint256,uint256,uint256,uint256,uint256),(address,uint256[],bytes)[],(address,uint256[],bytes)[])[])": FunctionFragment;
    "multiDeposit((address,uint256,uint256)[])": FunctionFragment;
    "multiWithdraw((address,uint256,uint256)[])": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "OBContract"
      | "multiAddOrder"
      | "multiClear"
      | "multiDeposit"
      | "multiWithdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "OBContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "multiAddOrder",
    values: [OrderConfigStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "multiClear",
    values: [MultiClearStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "multiDeposit",
    values: [DepositConfigStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "multiWithdraw",
    values: [WithdrawConfigStruct[]]
  ): string;

  decodeFunctionResult(functionFragment: "OBContract", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "multiAddOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "multiClear", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "multiDeposit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "multiWithdraw",
    data: BytesLike
  ): Result;

  events: {};
}

export interface OBMultiTx extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: OBMultiTxInterface;

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
    OBContract(overrides?: CallOverrides): Promise<[string]>;

    multiAddOrder(
      configs_: OrderConfigStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    multiClear(
      configs_: MultiClearStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    multiDeposit(
      configs_: DepositConfigStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    multiWithdraw(
      configs_: WithdrawConfigStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  OBContract(overrides?: CallOverrides): Promise<string>;

  multiAddOrder(
    configs_: OrderConfigStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  multiClear(
    configs_: MultiClearStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  multiDeposit(
    configs_: DepositConfigStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  multiWithdraw(
    configs_: WithdrawConfigStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    OBContract(overrides?: CallOverrides): Promise<string>;

    multiAddOrder(
      configs_: OrderConfigStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    multiClear(
      configs_: MultiClearStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    multiDeposit(
      configs_: DepositConfigStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    multiWithdraw(
      configs_: WithdrawConfigStruct[],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    OBContract(overrides?: CallOverrides): Promise<BigNumber>;

    multiAddOrder(
      configs_: OrderConfigStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    multiClear(
      configs_: MultiClearStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    multiDeposit(
      configs_: DepositConfigStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    multiWithdraw(
      configs_: WithdrawConfigStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    OBContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    multiAddOrder(
      configs_: OrderConfigStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    multiClear(
      configs_: MultiClearStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    multiDeposit(
      configs_: DepositConfigStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    multiWithdraw(
      configs_: WithdrawConfigStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
