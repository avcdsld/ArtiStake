const cors = require("cors")({ origin: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { ethers } = require("ethers");
const externalContracts = require("./external_contracts");
const { networkId, rpc, astarNetworkId, astarRpc } = require("./env");

admin.initializeApp();
const config = functions.config();
const astarPrivateKey = config["astar"]["private-key"];

const rpcProvider = new ethers.providers.JsonRpcProvider(rpc);
const stakeContractInfo = externalContracts[networkId].contracts.stake;
const stakeContract = new ethers.Contract(stakeContractInfo.address, stakeContractInfo.abi, rpcProvider);

// // Test: Shibuya
// const rpcProviderForAstar = new ethers.providers.JsonRpcProvider(rpc);
// const signerForAstar = new ethers.Wallet(astarPrivateKey, rpcProviderForAstar);
// const nftContractInfo = externalContracts[networkId].contracts.nft;
//
// Astar
const rpcProviderForAstar = new ethers.providers.JsonRpcProvider(astarRpc);
const signerForAstar = new ethers.Wallet(astarPrivateKey, rpcProviderForAstar);
const nftContractInfo = externalContracts[astarNetworkId].contracts.nft;
//
const nftContract = new ethers.Contract(nftContractInfo.address, nftContractInfo.abi, signerForAstar);

exports.projects = functions.https.onRequest((req, res) => {
  const projectAddresses = Array.isArray(req.query.address) ? req.query.address : [req.query.address];
  functions.logger.debug("projects", { projectAddresses: projectAddresses });

  res.set("Access-Control-Allow-Origin", "*");
  getProjectsInfo(projectAddresses).then(projects => {
    res.send(projects);
  }).catch(e => {
    functions.logger.error(e);
    res.status(500).send({ error: e });
  });
});

exports.mint = functions.https.onRequest((req, res) => {
  const toAddress = req.query.to;
  functions.logger.debug("mint", { toAddress });

  // TODO: Verify if the user staked

  res.set("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "HEAD,OPTIONS,POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  mint(toAddress).then(txHash => {
    res.send({ success: true, txHash });
  }).catch(e => {
    functions.logger.error(e);
    res.status(500).send({ success: false, error: e });
  });
});

async function getProjectsInfo(projectAddresses) {
  const result = [];
  for (const projectAddress of projectAddresses) {
    result.push(await getProjectInfo(projectAddress))
  }
  return result;
}

async function getProjectInfo(projectAddress) {
  const totalStaked = await stakeContract.getArtistTotalStaked(projectAddress);
  functions.logger.debug("projects", { totalStaked: Number(ethers.utils.formatEther(totalStaked)) });
  return {
    totalStaked: Number(ethers.utils.formatEther(totalStaked)),
    apy: 120 // Dummy
  };
}

async function mint(toAddress) {
  const tx = await nftContract.mint(toAddress, { from: signerForAstar.address });
  functions.logger.debug("mint", { txHash: tx.hash });
  return tx.hash;
}
