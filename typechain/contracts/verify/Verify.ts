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
} from "../../common";

export type EvidenceStruct = {
  account: PromiseOrValue<string>;
  data: PromiseOrValue<BytesLike>;
};

export type EvidenceStructOutput = [string, string] & {
  account: string;
  data: string;
};

export type VerifyConfigStruct = {
  admin: PromiseOrValue<string>;
  callback: PromiseOrValue<string>;
};

export type VerifyConfigStructOutput = [string, string] & {
  admin: string;
  callback: string;
};

export type StateStruct = {
  addedSince: PromiseOrValue<BigNumberish>;
  approvedSince: PromiseOrValue<BigNumberish>;
  bannedSince: PromiseOrValue<BigNumberish>;
};

export type StateStructOutput = [number, number, number] & {
  addedSince: number;
  approvedSince: number;
  bannedSince: number;
};

export interface VerifyInterface extends utils.Interface {
  functions: {
    "APPROVER()": FunctionFragment;
    "APPROVER_ADMIN()": FunctionFragment;
    "BANNER()": FunctionFragment;
    "BANNER_ADMIN()": FunctionFragment;
    "DEFAULT_ADMIN_ROLE()": FunctionFragment;
    "REMOVER()": FunctionFragment;
    "REMOVER_ADMIN()": FunctionFragment;
    "accountStatusAtTime(address,uint256)": FunctionFragment;
    "add(bytes)": FunctionFragment;
    "approve((address,bytes)[])": FunctionFragment;
    "ban((address,bytes)[])": FunctionFragment;
    "callback()": FunctionFragment;
    "getRoleAdmin(bytes32)": FunctionFragment;
    "grantRole(bytes32,address)": FunctionFragment;
    "hasRole(bytes32,address)": FunctionFragment;
    "initialize(bytes)": FunctionFragment;
    "remove((address,bytes)[])": FunctionFragment;
    "renounceRole(bytes32,address)": FunctionFragment;
    "requestApprove((address,bytes)[])": FunctionFragment;
    "requestBan((address,bytes)[])": FunctionFragment;
    "requestRemove((address,bytes)[])": FunctionFragment;
    "revokeRole(bytes32,address)": FunctionFragment;
    "state(address)": FunctionFragment;
    "statusAtTime((uint32,uint32,uint32),uint256)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "APPROVER"
      | "APPROVER_ADMIN"
      | "BANNER"
      | "BANNER_ADMIN"
      | "DEFAULT_ADMIN_ROLE"
      | "REMOVER"
      | "REMOVER_ADMIN"
      | "accountStatusAtTime"
      | "add"
      | "approve"
      | "ban"
      | "callback"
      | "getRoleAdmin"
      | "grantRole"
      | "hasRole"
      | "initialize"
      | "remove"
      | "renounceRole"
      | "requestApprove"
      | "requestBan"
      | "requestRemove"
      | "revokeRole"
      | "state"
      | "statusAtTime"
      | "supportsInterface"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "APPROVER", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "APPROVER_ADMIN",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "BANNER", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "BANNER_ADMIN",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "REMOVER", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "REMOVER_ADMIN",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "accountStatusAtTime",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "add",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [EvidenceStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "ban",
    values: [EvidenceStruct[]]
  ): string;
  encodeFunctionData(functionFragment: "callback", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "remove",
    values: [EvidenceStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "requestApprove",
    values: [EvidenceStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "requestBan",
    values: [EvidenceStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "requestRemove",
    values: [EvidenceStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "state",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "statusAtTime",
    values: [StateStruct, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(functionFragment: "APPROVER", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "APPROVER_ADMIN",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "BANNER", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "BANNER_ADMIN",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "REMOVER", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "REMOVER_ADMIN",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "accountStatusAtTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "add", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ban", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "callback", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "remove", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requestApprove",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "requestBan", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "requestRemove",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "state", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "statusAtTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;

  events: {
    "Approve(address,tuple)": EventFragment;
    "Ban(address,tuple)": EventFragment;
    "Initialize(address,tuple)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "Remove(address,tuple)": EventFragment;
    "RequestApprove(address,tuple)": EventFragment;
    "RequestBan(address,tuple)": EventFragment;
    "RequestRemove(address,tuple)": EventFragment;
    "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
    "RoleGranted(bytes32,address,address)": EventFragment;
    "RoleRevoked(bytes32,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approve"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Ban"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialize"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Remove"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RequestApprove"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RequestBan"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RequestRemove"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
}

export interface ApproveEventObject {
  sender: string;
  evidence: EvidenceStructOutput;
}
export type ApproveEvent = TypedEvent<
  [string, EvidenceStructOutput],
  ApproveEventObject
>;

export type ApproveEventFilter = TypedEventFilter<ApproveEvent>;

export interface BanEventObject {
  sender: string;
  evidence: EvidenceStructOutput;
}
export type BanEvent = TypedEvent<
  [string, EvidenceStructOutput],
  BanEventObject
>;

export type BanEventFilter = TypedEventFilter<BanEvent>;

export interface InitializeEventObject {
  sender: string;
  config: VerifyConfigStructOutput;
}
export type InitializeEvent = TypedEvent<
  [string, VerifyConfigStructOutput],
  InitializeEventObject
>;

export type InitializeEventFilter = TypedEventFilter<InitializeEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface RemoveEventObject {
  sender: string;
  evidence: EvidenceStructOutput;
}
export type RemoveEvent = TypedEvent<
  [string, EvidenceStructOutput],
  RemoveEventObject
>;

export type RemoveEventFilter = TypedEventFilter<RemoveEvent>;

export interface RequestApproveEventObject {
  sender: string;
  evidence: EvidenceStructOutput;
}
export type RequestApproveEvent = TypedEvent<
  [string, EvidenceStructOutput],
  RequestApproveEventObject
>;

export type RequestApproveEventFilter = TypedEventFilter<RequestApproveEvent>;

export interface RequestBanEventObject {
  sender: string;
  evidence: EvidenceStructOutput;
}
export type RequestBanEvent = TypedEvent<
  [string, EvidenceStructOutput],
  RequestBanEventObject
>;

export type RequestBanEventFilter = TypedEventFilter<RequestBanEvent>;

export interface RequestRemoveEventObject {
  sender: string;
  evidence: EvidenceStructOutput;
}
export type RequestRemoveEvent = TypedEvent<
  [string, EvidenceStructOutput],
  RequestRemoveEventObject
>;

export type RequestRemoveEventFilter = TypedEventFilter<RequestRemoveEvent>;

export interface RoleAdminChangedEventObject {
  role: string;
  previousAdminRole: string;
  newAdminRole: string;
}
export type RoleAdminChangedEvent = TypedEvent<
  [string, string, string],
  RoleAdminChangedEventObject
>;

export type RoleAdminChangedEventFilter =
  TypedEventFilter<RoleAdminChangedEvent>;

export interface RoleGrantedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleGrantedEvent = TypedEvent<
  [string, string, string],
  RoleGrantedEventObject
>;

export type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;

export interface RoleRevokedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleRevokedEvent = TypedEvent<
  [string, string, string],
  RoleRevokedEventObject
>;

export type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;

export interface Verify extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: VerifyInterface;

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
    APPROVER(overrides?: CallOverrides): Promise<[string]>;

    APPROVER_ADMIN(overrides?: CallOverrides): Promise<[string]>;

    BANNER(overrides?: CallOverrides): Promise<[string]>;

    BANNER_ADMIN(overrides?: CallOverrides): Promise<[string]>;

    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;

    REMOVER(overrides?: CallOverrides): Promise<[string]>;

    REMOVER_ADMIN(overrides?: CallOverrides): Promise<[string]>;

    accountStatusAtTime(
      account_: PromiseOrValue<string>,
      timestamp_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    add(
      data_: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    approve(
      evidences_: EvidenceStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    ban(
      evidences_: EvidenceStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    callback(overrides?: CallOverrides): Promise<[string]>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    initialize(
      data_: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    remove(
      evidences_: EvidenceStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    requestApprove(
      evidences_: EvidenceStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    requestBan(
      evidences_: EvidenceStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    requestRemove(
      evidences_: EvidenceStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    state(
      account_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[StateStructOutput]>;

    statusAtTime(
      state_: StateStruct,
      timestamp_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { status_: BigNumber }>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  APPROVER(overrides?: CallOverrides): Promise<string>;

  APPROVER_ADMIN(overrides?: CallOverrides): Promise<string>;

  BANNER(overrides?: CallOverrides): Promise<string>;

  BANNER_ADMIN(overrides?: CallOverrides): Promise<string>;

  DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

  REMOVER(overrides?: CallOverrides): Promise<string>;

  REMOVER_ADMIN(overrides?: CallOverrides): Promise<string>;

  accountStatusAtTime(
    account_: PromiseOrValue<string>,
    timestamp_: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  add(
    data_: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  approve(
    evidences_: EvidenceStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  ban(
    evidences_: EvidenceStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callback(overrides?: CallOverrides): Promise<string>;

  getRoleAdmin(
    role: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  grantRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  hasRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  initialize(
    data_: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  remove(
    evidences_: EvidenceStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounceRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  requestApprove(
    evidences_: EvidenceStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  requestBan(
    evidences_: EvidenceStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  requestRemove(
    evidences_: EvidenceStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  revokeRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  state(
    account_: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<StateStructOutput>;

  statusAtTime(
    state_: StateStruct,
    timestamp_: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  supportsInterface(
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    APPROVER(overrides?: CallOverrides): Promise<string>;

    APPROVER_ADMIN(overrides?: CallOverrides): Promise<string>;

    BANNER(overrides?: CallOverrides): Promise<string>;

    BANNER_ADMIN(overrides?: CallOverrides): Promise<string>;

    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

    REMOVER(overrides?: CallOverrides): Promise<string>;

    REMOVER_ADMIN(overrides?: CallOverrides): Promise<string>;

    accountStatusAtTime(
      account_: PromiseOrValue<string>,
      timestamp_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    add(
      data_: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    approve(
      evidences_: EvidenceStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    ban(evidences_: EvidenceStruct[], overrides?: CallOverrides): Promise<void>;

    callback(overrides?: CallOverrides): Promise<string>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    initialize(
      data_: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    remove(
      evidences_: EvidenceStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    requestApprove(
      evidences_: EvidenceStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    requestBan(
      evidences_: EvidenceStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    requestRemove(
      evidences_: EvidenceStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    state(
      account_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<StateStructOutput>;

    statusAtTime(
      state_: StateStruct,
      timestamp_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "Approve(address,tuple)"(
      sender?: null,
      evidence?: null
    ): ApproveEventFilter;
    Approve(sender?: null, evidence?: null): ApproveEventFilter;

    "Ban(address,tuple)"(sender?: null, evidence?: null): BanEventFilter;
    Ban(sender?: null, evidence?: null): BanEventFilter;

    "Initialize(address,tuple)"(
      sender?: null,
      config?: null
    ): InitializeEventFilter;
    Initialize(sender?: null, config?: null): InitializeEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "Remove(address,tuple)"(sender?: null, evidence?: null): RemoveEventFilter;
    Remove(sender?: null, evidence?: null): RemoveEventFilter;

    "RequestApprove(address,tuple)"(
      sender?: null,
      evidence?: null
    ): RequestApproveEventFilter;
    RequestApprove(sender?: null, evidence?: null): RequestApproveEventFilter;

    "RequestBan(address,tuple)"(
      sender?: null,
      evidence?: null
    ): RequestBanEventFilter;
    RequestBan(sender?: null, evidence?: null): RequestBanEventFilter;

    "RequestRemove(address,tuple)"(
      sender?: null,
      evidence?: null
    ): RequestRemoveEventFilter;
    RequestRemove(sender?: null, evidence?: null): RequestRemoveEventFilter;

    "RoleAdminChanged(bytes32,bytes32,bytes32)"(
      role?: PromiseOrValue<BytesLike> | null,
      previousAdminRole?: PromiseOrValue<BytesLike> | null,
      newAdminRole?: PromiseOrValue<BytesLike> | null
    ): RoleAdminChangedEventFilter;
    RoleAdminChanged(
      role?: PromiseOrValue<BytesLike> | null,
      previousAdminRole?: PromiseOrValue<BytesLike> | null,
      newAdminRole?: PromiseOrValue<BytesLike> | null
    ): RoleAdminChangedEventFilter;

    "RoleGranted(bytes32,address,address)"(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleGrantedEventFilter;
    RoleGranted(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleGrantedEventFilter;

    "RoleRevoked(bytes32,address,address)"(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleRevokedEventFilter;
    RoleRevoked(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleRevokedEventFilter;
  };

  estimateGas: {
    APPROVER(overrides?: CallOverrides): Promise<BigNumber>;

    APPROVER_ADMIN(overrides?: CallOverrides): Promise<BigNumber>;

    BANNER(overrides?: CallOverrides): Promise<BigNumber>;

    BANNER_ADMIN(overrides?: CallOverrides): Promise<BigNumber>;

    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    REMOVER(overrides?: CallOverrides): Promise<BigNumber>;

    REMOVER_ADMIN(overrides?: CallOverrides): Promise<BigNumber>;

    accountStatusAtTime(
      account_: PromiseOrValue<string>,
      timestamp_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    add(
      data_: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    approve(
      evidences_: EvidenceStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    ban(
      evidences_: EvidenceStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    callback(overrides?: CallOverrides): Promise<BigNumber>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      data_: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    remove(
      evidences_: EvidenceStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    requestApprove(
      evidences_: EvidenceStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    requestBan(
      evidences_: EvidenceStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    requestRemove(
      evidences_: EvidenceStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    state(
      account_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    statusAtTime(
      state_: StateStruct,
      timestamp_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    APPROVER(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    APPROVER_ADMIN(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    BANNER(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    BANNER_ADMIN(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    DEFAULT_ADMIN_ROLE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    REMOVER(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    REMOVER_ADMIN(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    accountStatusAtTime(
      account_: PromiseOrValue<string>,
      timestamp_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    add(
      data_: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    approve(
      evidences_: EvidenceStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    ban(
      evidences_: EvidenceStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    callback(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      data_: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    remove(
      evidences_: EvidenceStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    requestApprove(
      evidences_: EvidenceStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    requestBan(
      evidences_: EvidenceStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    requestRemove(
      evidences_: EvidenceStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    state(
      account_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    statusAtTime(
      state_: StateStruct,
      timestamp_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
