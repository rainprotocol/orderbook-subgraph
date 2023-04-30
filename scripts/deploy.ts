import { execSync } from "child_process";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
import { program } from "commander";
import { artifacts, ethers } from "hardhat";
import { FetchResult, createApolloFetch } from "apollo-fetch";
import { inflateJson } from "../utils";
import { decodeRainMetaDocument } from "../utils/meta/cbor";
import { MAGIC_NUMBERS } from "../test/utils";
import "colors";
import { exit } from "process";

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


const writeFile = (_path: string, file: any): void => {
  try {
    fs.writeFileSync(_path, file);
  } catch (error) {
    console.log(error);
  }
};

const getRPCURL = (network: string): string => {
  if(network == "mumbai") return "https://rpc-mumbai.maticvigil.com";
  if(network == "mainnet") return "https://1rpc.io/eth";
  if(network == "goerli") return "https://rpc.ankr.com/eth_goerli";
  if(network == "matic") return "https://polygon-rpc.com";
  return "http://localhost:8545"
}

const checkContract = async (address: string, network: string) => {
  const provider = new ethers.providers.JsonRpcProvider(getRPCURL(network));
  const code = await provider.getCode(address);
  if(code.length < 3) throw new Error("Contract address does not have any bytecode.".red);
}

const getSubgraph = (network: string): string => {
  if (network === "mumbai")
    return "https://api.thegraph.com/subgraphs/name/rainprotocol/interpreter-registry";
  else if (network === "matic")
    return "https://api.thegraph.com/subgraphs/name/rainprotocol/interpreter-registry-polygon";
  else if (network == "mainnet")
    return "https://api.thegraph.com/subgraphs/name/rainprotocol/interpreter-registry-ethereum";
  else throw new Error("Unsupported network.")
}

const getABIPayload = (meta: any[]): any => {
  for(let i=0; i< meta.length; i++){
    const magicNumber = meta[i].get(1);
    if(magicNumber == MAGIC_NUMBERS.SOLIDITY_ABIV2) return meta[i].get(0);
  }
}

const checkMetaFromSubgraph = async (network: string, contract: string): Promise<number> => {
  const subgraphEndpoint = getSubgraph(network);
  const subgraph = createApolloFetch({uri: subgraphEndpoint});

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

  const response = (await subgraph({query})) as FetchResult;
  const data = response.data.contract;
  if (data == null) {
    console.log(`Contract ${contract} is not available on ${network} registry subgraph`.yellow);
    return -1;
  }
  
  const decoded = decodeRainMetaDocument(data.meta.metaBytes)
  const onchainABI = JSON.parse(inflateJson(getABIPayload(decoded)));
  
  if(checkABI(onchainABI)){
    console.log("Contract ABI Matches with Local ABI".green);
    // return data.deployTransaction.blockNumber;
    return -1;
  }else{
    throw new Error("Contract ABI doesn't match with onchain ABI".red);
  }
}

const checkABI = (onchainABI: any): boolean => {
  const localABI = artifacts.readArtifactSync("OrderBook").abi;
  let onchainEvents = [];
  let localEvents = [];
  
  for(let i=0;i<onchainABI.length;i++){
    const type = onchainABI[i].type;
    if (type == "event") {
      onchainEvents.push(onchainABI[i])
    }
  }

  for(let i=0;i<localABI.length;i++){
    const type = localABI[i].type;
    if (type == "event") {
      localEvents.push(localABI[i])
    }
  }

  if (JSON.stringify(onchainEvents) == JSON.stringify(localEvents)){
    return true;
  } else {
    return false;
  }
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
    );

  program.parse();

  
  const options = program.opts();

  await checkContract(options.contractAddress, options.network);

  const _network = options.network;
  const _contractAddress = options.contractAddress;
  const _blockNumber = await checkMetaFromSubgraph(_network, _contractAddress);
  const _graphAccessToken = options.graphAccessToken;
  const _subgraphName = options.subgraphName;
  const _endpoint = "--node https://api.thegraph.com/deploy/";
  const _subgraphTemplate = options.subgraphTemplate;
  const _api_key = options.etherscanAPIKey;

  // Add the address to the subgraph.yaml file
  if (_blockNumber < 0) {
    if (_api_key == null) throw new Error("please try again with passing --etherscanAPIKey and --blocknumber options".cyan);
    const api = require("etherscan-api").init(_api_key);
    const sourceCode = await api.contract.getsourcecode(_contractAddress)
    const onchainABI = JSON.parse(sourceCode.result[0].ABI)
    if (checkABI(onchainABI)) console.log("Contract ABI Matches with Local ABI".green) 
    else throw new Error("Contract ABI doesn't match with onchain ABI".red);
  }

  exec(`npx graph auth --product hosted-service ${_graphAccessToken}`)

  let config = { orderbook: _contractAddress, blockNumber: _blockNumber, network: _network };

  writeFile(path.resolve(__dirname, `../config/${_network}.json`) ,JSON.stringify(config, null, 2))

  exec(
    `npx mustache config/${_network}.json ${_subgraphTemplate} subgraph.yaml`
  );

  // Generate all teh SG code
  exec("npx graph codegen && npx graph build");

  // Deploy the Subgraph
  exec(
    `npx graph deploy ${_endpoint} ${_subgraphName}`
  );
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
