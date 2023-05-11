Testing subgraph
- `nix-shell --run init`
- `nix-shell --run docker-up`
- `nix-shell --run ci-test`

Deploying the subgraph with registry subgraph ABI check
- `nix-shell --run init`
- ```
    nix-shell --run "ts-node scripts/deploy.ts \
    --contractAddress <CONTRACT_ADDRESS> \
    --subgraphName <SUBGRAPH_NAME> \
    --graphAccessToken <GRAPH_ACCESS_TOKEN> \
    --network <NETWORK>
    "
    ```

Deploying the subgraph with etherscan/polygonscan ABI check
- `nix-shell --run init`
- ```
    nix-shell --run "ts-node scripts/deploy.ts \
    --contractAddress <CONTRACT_ADDRESS> \
    --subgraphName <SUBGRAPH_NAME> \
    --graphAccessToken <GRAPH_ACCESS_TOKEN> \
    --network <NETWORK>
    --blockNumber <BLOCK_NUMBER>
    --etherscanAPIKey <API_KEY>
    "
    ```

To deploy subgraph without any ABI check
- `nix-shell --run init`
- ```
    nix-shell --run "ts-node scripts/deploy.ts \
    --contractAddress <CONTRACT_ADDRESS> \
    --blockNumber <BLOCK_NUMBER>
    --subgraphName <SUBGRAPH_NAME> \
    --graphAccessToken <GRAPH_ACCESS_TOKEN> \
    --network <NETWORK>
    --skipCheck
    "
    ```