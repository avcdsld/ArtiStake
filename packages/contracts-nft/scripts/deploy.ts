import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const Chocomold = await ethers.getContractFactory("Chocomold");
  const chocomold = await Chocomold.deploy();

  await chocomold.deployed();
  console.log("Chocomold deployed to:", chocomold.address);

  await chocomold.initialize(deployer.address, "MetaverStakePlayer", "PLAYER");
  await chocomold["mint(address)"](deployer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
