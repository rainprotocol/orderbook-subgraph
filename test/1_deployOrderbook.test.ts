import { waitForSubgraphToBeSynced } from "./utils";

import assert from "assert";
import { FetchResult } from "apollo-fetch";
import { orderBook, subgraph } from "./0_initialization.test";

describe("Orderbook deploy test", () => {
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
