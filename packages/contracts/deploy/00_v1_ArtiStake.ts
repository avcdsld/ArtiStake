import {
  POLYGON_WETH_ADDRESS,
  POLYGON_AAVE_LENDING_POOL_ADDRESS,
  POLYGON_AAVE_WETH_GATEWAY_ADDRESS,
  MUMBAI_WETH_ADDRESS,
  MUMBAI_AAVE_LENDING_POOL_ADDRESS,
  MUMBAI_AAVE_WETH_GATEWAY_ADDRESS,
  SHIBUYA_WETH_ADDRESS,
  SHIBUYA_AAVE_LENDING_POOL_ADDRESS,
  SHIBUYA_AAVE_WETH_GATEWAY_ADDRESS,
} from "../lib/constants";

const func = async (hre: any) => {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("ArtiStake", {
    from: deployer,
    args: [
      network.name === "shibuya" ? SHIBUYA_AAVE_LENDING_POOL_ADDRESS : network.name === "polygon" ? POLYGON_AAVE_LENDING_POOL_ADDRESS : MUMBAI_AAVE_LENDING_POOL_ADDRESS,
      network.name === "shibuya" ? SHIBUYA_AAVE_WETH_GATEWAY_ADDRESS : network.name === "polygon" ? POLYGON_AAVE_WETH_GATEWAY_ADDRESS : MUMBAI_AAVE_WETH_GATEWAY_ADDRESS,
      network.name === "shibuya" ? SHIBUYA_WETH_ADDRESS : network.name === "polygon" ? POLYGON_WETH_ADDRESS : MUMBAI_WETH_ADDRESS,
    ],
    log: true,
  });
};

export default func;
module.exports.tags = ["ArtiStake"];
