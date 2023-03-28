import { ethers } from "hardhat";
import deploy1820 from "../utils/deploy/registry1820/deploy";
import {
  exec,
  fetchFile,
  fetchSubgraph,
  waitForGraphNode,
  waitForSubgraphToBeSynced,
  writeFile,
} from "./utils";
import { DeployerDiscoverableMetaV1ConstructionConfigStruct } from "../typechain/contracts/factory/CloneFactory";
import {
  assertError,
  getRainMetaDocumentFromContract,
  zeroAddress,
} from "../utils";
import { getTouchDeployer } from "../utils/deploy/interpreter/shared/rainterpreterExpressionDeployer/deploy";
import { OrderBook } from "../typechain";
import assert from "assert";
import * as path from "path";
import { deployOrderBook } from "../utils/deploy/orderBook/deploy";
import { ApolloFetch, FetchResult } from "apollo-fetch";

export let orderBook: OrderBook;
export let subgraph: ApolloFetch;

describe("Orderbook deploy test", () => {
  before(async () => {
    await waitForGraphNode();
    const signers = await ethers.getSigners();
    await deploy1820(signers[0]);

    const orderBookFactory = await ethers.getContractFactory("OrderBook", {});
    const touchDeployer = await getTouchDeployer();

    const config0: DeployerDiscoverableMetaV1ConstructionConfigStruct = {
      meta: getRainMetaDocumentFromContract("orderbook"),
      deployer: touchDeployer.address,
    };

    orderBook = await deployOrderBook();

    const configPath = path.resolve(__dirname, "../config/localhost.json");

    assert(!(orderBook.address === zeroAddress), "OrderBook did not deploy");

    const config = JSON.parse(fetchFile(configPath));

    config.network = "localhost";
    config.orderbook = orderBook.address;
    config.blockNumber = orderBook.deployTransaction.blockNumber;

    writeFile(configPath, JSON.stringify(config, null, 2));

    // create subgraph instance
    exec("graph create --node http://localhost:8020/ test/test");
    // prepare subgraph manifest
    exec(
      "npx mustache config/localhost.json subgraph.template.yaml subgraph.yaml"
    );
    // deploy subgraph
    exec(
      "graph deploy --node http://localhost:8020/ --ipfs http://localhost:5001 test/test  --version-label 1"
    );
    subgraph = fetchSubgraph("test/test");
  });

  it("Should create orderBook entity", async () => {
    await waitForSubgraphToBeSynced();
    const query = `{
            orderBook(id: "${orderBook.address.toLowerCase()}"){
                id
                deployer
            }
        }`;

    const response = (await subgraph({ query })) as FetchResult;
    const orderbookData = response.data.orderBook;

    assert.equal(
      orderbookData.id,
      orderBook.address.toLowerCase(),
      "Wrong entity ID"
    );
  });
});
