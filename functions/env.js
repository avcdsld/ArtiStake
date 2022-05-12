const networkId = process.env.NODE_ENV == "development" ? 81 : 81; // TODO:

const rpc = process.env.NODE_ENV == "development"
  ? "https://shibuya-api.bwarelabs.com/43c7b8f5-1163-4636-8b12-edf327553d34"
  : "https://shibuya-api.bwarelabs.com/43c7b8f5-1163-4636-8b12-edf327553d34"
// ? "https://rpc.shibuya.astar.network:8545"
// : "https://rpc.shibuya.astar.network:8545" // TODO:

const astarNetworkId = 592; // Astar

const astarRpc = "https://rpc.astar.network:8545";

module.exports = { networkId, rpc, astarNetworkId, astarRpc };
