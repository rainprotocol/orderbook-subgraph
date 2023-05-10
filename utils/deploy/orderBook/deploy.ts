import { ethers } from "hardhat";
import { OrderBook, Rainterpreter, RainterpreterExpressionDeployer, RainterpreterExtern, RainterpreterStore } from "../../../typechain";
import { DeployerDiscoverableMetaV1ConstructionConfigStruct } from "../../../typechain/contracts/factory/CloneFactory";

import { getRainMetaDocumentFromContract } from "../../meta";
import { rainterpreterExpressionDeployerDeploy } from "../interpreter/shared/rainterpreterExpressionDeployer/deploy";

export const deployOrderBook = async (): Promise<OrderBook> => {
  const touchDeployer = await getTouchDeployer();
  const config_: DeployerDiscoverableMetaV1ConstructionConfigStruct = {
    meta: getRainMetaDocumentFromContract("orderbook"),
    deployer: touchDeployer.address,
  };
  const orderBookFactory = await ethers.getContractFactory("OrderBook", {});
  const orderBook = (await orderBookFactory.deploy(config_)) as OrderBook;

  return orderBook;
};

export const getTouchDeployer =
  async (): Promise<RainterpreterExpressionDeployer> => {
    const interpreter: Rainterpreter = await rainterpreterDeploy();
    const store: RainterpreterStore = await rainterpreterStoreDeploy();
    const expressionDeployer: RainterpreterExpressionDeployer =
      await rainterpreterExpressionDeployerDeploy(interpreter, store);

    return expressionDeployer;
  };

  export const rainterpreterDeploy = async () => {
    return (await basicDeploy("Rainterpreter", {})) as Rainterpreter;
  };
  
  export const rainterpreterStoreDeploy = async () => {
    return (await basicDeploy("RainterpreterStore", {})) as RainterpreterStore;
  };
  
  export const rainterpreterExtern = async () => {
    return (await basicDeploy("RainterpreterExtern", {})) as RainterpreterExtern;
  };
  
  export const basicDeploy = async (name: string, libs = {}, args = []) => {
    const factory = await ethers.getContractFactory(name, {
      libraries: libs,
    });
  
    const contract = await factory.deploy(...args);
  
    await contract.deployed();
  
    return contract;
  };
  