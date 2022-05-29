const networkId = process.env.NODE_ENV == "development" ? 81 : 81; // TODO:

const rpc = process.env.NODE_ENV == "development"
  ? "https://shibuya.blastapi.io/3bd64e3f-5e8a-4b2f-842d-bcbe3c9180e4"
  : "https://shibuya.blastapi.io/3bd64e3f-5e8a-4b2f-842d-bcbe3c9180e4"
// ? "https://rpc.shibuya.astar.network:8545"
// : "https://rpc.shibuya.astar.network:8545" // TODO:

const astarNetworkId = 592; // Astar

const astarRpc = "https://rpc.astar.network:8545";

module.exports = { networkId, rpc, astarNetworkId, astarRpc };
