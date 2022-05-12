export const rpc =
  process.env.NODE_ENV == "development"
    ? "https://shibuya-api.bwarelabs.com/43c7b8f5-1163-4636-8b12-edf327553d34"
    : "https://shibuya-api.bwarelabs.com/43c7b8f5-1163-4636-8b12-edf327553d34"
// ? "https://rpc.shibuya.astar.network:8545"
// : "https://rpc.shibuya.astar.network:8545" // TODO:

// export const networkId = process.env.NODE_ENV == "development" ? 81 : 592;
export const networkId = process.env.NODE_ENV == "development" ? 81 : 81; // TODO:
export const subgraphUrl =
  process.env.NODE_ENV == "development"
    ? "https://api.thegraph.com/subgraphs/name/aave/aave-v2-polygon-mumbai"
    : "https://api.thegraph.com/subgraphs/name/aave/aave-v2-matic";
export const exploreTxUrl = "https://shibuya.subscan.io/extrinsic/"
