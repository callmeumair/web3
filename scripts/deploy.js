const hre = require("hardhat");

async function main() {
  const SocialNetwork = await hre.ethers.getContractFactory("SocialNetwork");
  const socialNetwork = await SocialNetwork.deploy();

  await socialNetwork.waitForDeployment();

  console.log("SocialNetwork deployed to:", await socialNetwork.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 