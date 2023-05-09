Testing subgraph
- `nix-shell --run init`
- `nix-shell --run docker-up`
- `nix-shell --run ci-test`

Deploying the subgraph
- `nix-shell --run init`
- `nix-shell --run "ts-node scripts/deploy.ts --contractAddress <CONTRACT_ADDRESS> --subgraphName <SUBGRAPH_NAME> --graphAccessToken <GRAPH_ACCESS_TOKEN> --network <NETWORK>"`
