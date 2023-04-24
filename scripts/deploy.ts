import { execSync } from "child_process";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
import { program } from "commander";
import { artifacts, ethers, network } from "hardhat";
import { FetchResult, createApolloFetch } from "apollo-fetch";
import { getRainMetaDocumentFromContract, inflateJson } from "../utils";
import { decodeRainMetaDocument } from "../utils/meta/cbor";
import { MAGIC_NUMBERS } from "../test/utils";

dotenv.config();

interface DeployConfig {
  configPath: string;
  subgraphName: string;
  versionLabel: string;
  endpoint: string;
  ipfsEndpoint: string;
}

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
  if(network == "mainnet") return "https://eth.llamarpc.com";
  if(network == "goerli") return "https://rpc.ankr.com/eth_goerli";
  if(network == "matic") return "https://polygon-rpc.com";
  return "http://localhost:8545"
}

const checkContract = async (address: string, network: string) => {
  const provider = new ethers.providers.JsonRpcProvider(getRPCURL(network));

  const code = await provider.getCode(address);
  if(code.length < 3) throw new Error("Contract address does not have any bytecode.");
}

const getSubgraph = (network: string): string => {
  if (network === "mumbai")
    return "https://api.thegraph.com/subgraphs/name/rainprotocol/interpreter-registry";
  else if (network === "matic")
    return "https://api.thegraph.com/subgraphs/name/rainprotocol/interpreter-registry-polygon";
  else throw new Error("Unsupported network.")
}

const getABIPayload = (meta: any[]): any => {
  for(let i=0; i< meta.length; i++){
    const magicNumber = meta[i].get(1);
    if(magicNumber == MAGIC_NUMBERS.SOLIDITY_ABIV2) return meta[i].get(0);
  }
}

const checkMeta = async (network: string, contract: string): Promise<number> => {
  const subgraphEndpoint = getSubgraph(network);
  const supgraph = createApolloFetch({uri: subgraphEndpoint});

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

  const response = (await supgraph({query})) as FetchResult;
  const data = response.data.contract;
  if (data == null) throw new Error(`Contract ${contract} not available on ${network}`);
  
  const decoded = decodeRainMetaDocument(data.meta.metaBytes)
  const onchainABI = JSON.parse(inflateJson(getABIPayload(decoded)));
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
      localEvents.push(onchainABI[i])
    }
  }

  if (JSON.stringify(onchainEvents) == JSON.stringify(localEvents)){
    console.log("Contract ABI Matches with Local ABI");
    return data.deployTransaction.blockNumber
  } else {
    throw new Error("Contract ABI doesn't match with onchain ABI");
  }
}


const main = async () => {
  program
    .requiredOption("--contractAddress <string>", "Smart contract address")
    .requiredOption(
      "--network <string>",
      "Block Number to start indexing from.",
    )
    .requiredOption(
      "--subgraphName <string>",
      "The subgraph name to deploy. Eg: 'user/name'."
    )
    .requiredOption(
      "--graphAccessToken <string>",
      "Graph access token for graph auth"
    )
    .option(
      "--subgraphTemplate <string>",
      "Specify a path to yaml file to be used as template. By the default use the root template.",
      "subgraph.template.yaml"
    );

  program.parse();

  
  const options = program.opts();

  await checkContract(options.contractAddress, options.network);

  const _network = options.network;
  const _contractAddress = options.contractAddress;
  const _blockNumber = await checkMeta(_network, _contractAddress);
  const _graphAccessToken = options.graphAccessToken;
  const _subgraphName = options.subgraphName;
  const _endpoint = "--node https://api.thegraph.com/deploy/";
  const _subgraphTemplate = options.subgraphTemplate;

  // Add the address to the subgraph.yaml file

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
