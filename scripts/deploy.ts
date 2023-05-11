import { execSync } from "child_process";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
import { program } from "commander";
import { artifacts, ethers } from "hardhat";
import { ApolloFetch, FetchResult, createApolloFetch } from "apollo-fetch";
import { inflateJson } from "../utils";
import { decodeRainMetaDocument } from "../utils/meta/cbor";
import { MAGIC_NUMBERS } from "../test/utils";
import "colors";
import fetch, { Response } from "node-fetch";

dotenv.config();


/**
 * Execute Child Processes
 * @param cmd Command to execute
 * @returns The command ran it
 */
const exec = (cmd: string): string | Buffer => {
  const srcDir = path.join(__dirname, "..");
  try {
    return execSync(cmd, { cwd: srcDir, stdio: "inherit" });
  } catch (e) {
    throw new Error(`Failed to run command \`${cmd}\``);
  }
};

/**
 * Write the string content in given file object
 * @param _data content to be written
 * @param file file object
 */
const writeFile = (_data: string, file: any): void => {
  try {
    fs.writeFileSync(_data, file);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Returns the RPC url of given network
 * @param network name of network
 * @returns RPC url
 */
const getRPC_URL = (network: string): string => {
  if (network == "mumbai") return "https://rpc-mumbai.maticvigil.com";
  if (network == "mainnet") return "https://1rpc.io/eth";
  if (network == "goerli") return "https://rpc.ankr.com/eth_goerli";
  if (network == "matic") return "https://polygon-rpc.com";
  return "http://localhost:8545"
}

/**
 * Check the given address is a contract
 * @param address contract address
 * @param network network
 */
const checkContractForByteCode = async (address: string, network: string) => {
  const provider = new ethers.providers.JsonRpcProvider(getRPC_URL(network));
  const code = await provider.getCode(address);
  if (code.length < 3) throw new Error("Contract address does not have any bytecode.".red);
}

/**
 * Returns subgraph instance of given network
 * @param network network
 * @returns ApolloFetch
 */
const getInterpreterRegistrySubgraph = (network: string): ApolloFetch => {
  if (network === "mumbai")
    return createApolloFetch({ uri: "https://api.thegraph.com/subgraphs/name/rainprotocol/interpreter-registry" });
  else if (network === "matic")
    return createApolloFetch({ uri: "https://api.thegraph.com/subgraphs/name/rainprotocol/interpreter-registry-polygon" });
  else if (network === "mainnet")
    return createApolloFetch({ uri: "https://api.thegraph.com/subgraphs/name/rainprotocol/interpreter-registry-ethereum" });
  else throw new Error("Unsupported network.")
}

/**
 * Returns the CBOR encoded deflated contract ABI
 * @param meta CBOR encoded meta
 * @returns deflated json data
 */
const getABIPayload = (meta: any[]): any => {
  for (let i = 0; i < meta.length; i++) {
    const magicNumber = meta[i].get(1);
    if (magicNumber == MAGIC_NUMBERS.SOLIDITY_ABIV2) return meta[i].get(0);
  }
}

/**
 * Gets the onchain ABI of contract from registry subgraph
 * @param network network
 * @param contract contract address
 * @returns blocknumber
 */
const checkMetaFromSubgraph = async (network: string, contract: string): Promise<number> => {
  const subgraph = getInterpreterRegistrySubgraph(network);

  const query = `{
    contract(id: "${contract.toLowerCase()}") {
      meta {
        metaBytes
      }
      deployTransaction {
        blockNumber
      }
    }
  }`;

  const response = (await subgraph({ query })) as FetchResult;
  const data = response.data.contract;
  if (data == null) {
    console.log(`Contract ${contract} is not available on ${network} registry subgraph`.red);
    return 0;
  }

  const decoded = decodeRainMetaDocument(data.meta.metaBytes)
  const onchainABI = JSON.parse(inflateJson(getABIPayload(decoded)));

  if (checkABI(onchainABI)) {
    console.log("Contract ABI Matches with Local ABI".green);
    return data.deployTransaction.blockNumber;
  } else {
    console.log("Contract ABI doesn't match with onchain ABI".red);
    return 0
  }
}

/**
 * Checks the local ABI with onchainABI
 * @param onchainABI json object of onchain ABI
 * @returns boolean
 */
const checkABI = (onchainABI: any): boolean => {
  const localABI = artifacts.readArtifactSync("OrderBook").abi;
  let onchainEvents = [];
  let localEvents = [];

  for (let i = 0; i < onchainABI.length; i++) {
    const type = onchainABI[i].type;
    if (type == "event") {
      onchainEvents.push(onchainABI[i])
    }
  }

  for (let i = 0; i < localABI.length; i++) {
    const type = localABI[i].type;
    if (type == "event") {
      localEvents.push(localABI[i])
    }
  }

  if (JSON.stringify(onchainEvents) == JSON.stringify(localEvents)) {
    return true;
  } else {
    return false;
  }
}


/**
 * returns contracts source code from etherscan/polygonscan API
 * @param api etherscan/polygonscan API
 * @param contractAddress contract address
 * @param network network
 * @returns contract source code
 */
const getsourceCode = async (api_key: string, contractAddress: string, network: string): Promise<any> => {
  let sourceCode: Response;
  if (network == "matic"){
    sourceCode = await fetch(`https://api.polygonscan.com/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${api_key}`)
  } else if (network == "mumbai") {
    sourceCode = await fetch(`https://api-testnet.polygonscan.com/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${api_key}`)
  } else if (network == "mainnet") {
    sourceCode = await fetch(`https://api.etherscan.com/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${api_key}`)
  }
  return await sourceCode.json()
}

/**
 * Check local ABI with onchain ABI with explorer 
 * @param network network
 * @param api_key etherscan/polygonscan API key of user
 * @param contractAddress contract address
 * @returns boolean
 */
const checkABIfromExplorer = async (network: string, api_key: string, contractAddress: string): Promise<boolean> => {
  const sourceCode = await getsourceCode(api_key, contractAddress, network);
  const onchainABI = JSON.parse(sourceCode.result[0].ABI)
  if (checkABI(onchainABI)) {
    console.log("Contract ABI Matches with Local ABI".green);
    return true;
  }
  console.log("Contract ABI doesn't match with onchain ABI".red);
  return false;
}

/**
 * deploys a subgraph
 * @param network network for subgraph
 * @param contractAddress contract address
 * @param blockNumber blockNumber of contract deployment
 * @param graphAccessToken subgraph graph access token of user
 * @param subgraphName name of the subgraph endpoint
 * @param endpoint graphprotocol endpoint
 * @param subgraphTemplate path to subgraph.yaml template
 */
const deploySubgraph = (network: string, contractAddress: string, blockNumber: number, graphAccessToken: string, subgraphName: string, endpoint: string, subgraphTemplate: string) => {
  exec(`npx graph auth --product hosted-service ${graphAccessToken}`)

  let config = { orderbook: contractAddress, blockNumber: blockNumber, network: network };

  writeFile(path.resolve(__dirname, `../config/${network}.json`), JSON.stringify(config, null, 2))

  exec(
    `npx mustache config/${network}.json ${subgraphTemplate} subgraph.yaml`
  );

  // Generate SG build
  exec("npx graph codegen && npx graph build");

  // Deploy the Subgraph
  exec(
    `npx graph deploy ${endpoint} ${subgraphName}`
  );
}

const main = async () => {

  program
    .requiredOption("--contractAddress <string>", "Smart contract address")
    .requiredOption(
      "--network <string>",
      "name of the network",
    )
    .requiredOption(
      "--subgraphName <string>",
      "The subgraph name to deploy. Eg: 'username/subgraphName'."
    )
    .requiredOption(
      "--graphAccessToken <string>",
      "Graph access token for graph auth"
    )
    .option(
      "--subgraphTemplate <string>",
      "Specify a path to yaml file to be used as template. By the default use the root template.",
      "subgraph.template.yaml"
    )
    .option(
      "--blockNumber <string>",
      "block number of contract creation",
    )
    .option(
      "--etherscanAPIKey <string>",
      "etherscanAPIKey for selected network",
    )
    .option("--skipCheck");

  program.parse();


  const options = program.opts();

  await checkContractForByteCode(options.contractAddress, options.network);

  const _network = options.network;
  const _contractAddress = options.contractAddress;
  const _graphAccessToken = options.graphAccessToken;
  const _subgraphName = options.subgraphName;
  const _endpoint = "--node https://api.thegraph.com/deploy/";
  const _subgraphTemplate = options.subgraphTemplate;
  const _api_key = options.etherscanAPIKey;
  const _blockNumber = options.blockNumber;
  const _isSkip = options.skipCheck;

  if (_isSkip) {
    console.log("You are deploying the subgraph without any check, subgraph syncing may fail.".yellow);
    if (options.blockNumber == null) throw new Error("missing --blocknumber option".cyan)
    deploySubgraph(_network, _contractAddress, _blockNumber, _graphAccessToken, _subgraphName, _endpoint, _subgraphTemplate);
    return;
  }

  const registryResult = await checkMetaFromSubgraph(_network, _contractAddress);

  if (registryResult != 0) {
    deploySubgraph(_network, _contractAddress, registryResult, _graphAccessToken, _subgraphName, _endpoint, _subgraphTemplate);
    return;
  } else {
    console.log("ABI check with registry subgraph failed".red);
    console.log("Trying with etherscan/polygonscan".green);
    if (options.blockNumber == null) throw new Error("missing --blocknumber option".cyan)
    if (_api_key == null) throw new Error("missing --etherscanAPIKey option".cyan);
  }

  const explorerResult = await checkABIfromExplorer(_network, _api_key, _contractAddress);

  if (!explorerResult) {
    console.log("ABI check with etherscan/polygonscan failed".red);
    console.log("If you still want to deploy subgraph add --skipCheck option".cyan);
  } else {
    deploySubgraph(_network, _contractAddress, _blockNumber, _graphAccessToken, _subgraphName, _endpoint, _subgraphTemplate);
  }
};

main()
  .then(() => {
    const exit = process.exit;
    exit(0);
  })
  .catch((error) => {
    console.error(error);
    const exit = process.exit;
    exit(1);
  });
