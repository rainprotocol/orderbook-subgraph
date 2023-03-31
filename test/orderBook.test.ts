import assert from "assert";
import { FetchResult } from "apollo-fetch";
import { orderBook, subgraph } from "./0_initialization.test";

describe("Orderbook entity", () => {
  it("should query the OrderBook entity", async () => {
    const orderBookAddress = orderBook.address.toLowerCase();
    const deployerAddress = orderBook.deployTransaction.from.toLowerCase();

    const query = `{
      orderBook(id: "${orderBookAddress}"){
        id
        address
        deployer
      }
    }`;

    const response = (await subgraph({ query })) as FetchResult;
    const data = response.data.orderBook;

    assert.equal(data.id, orderBookAddress, "Wrong orderbook ID");
    assert.equal(data.address, orderBookAddress, "Wrong orderbook address");
    assert.equal(data.deployer, deployerAddress, "Wrong deployer address ID");
  });

  it("should query the OrderBook meta correctly");
});
