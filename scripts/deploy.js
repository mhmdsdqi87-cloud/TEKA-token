const hre = require("hardhat");

async function main() {
  const TEKAToken = await hre.ethers.getContractFactory("TEKAToken");

  const teka = await TEKAToken.deploy();

  await teka.waitForDeployment();

  console.log(
    "TEKA Token deployed to:",
    await teka.getAddress()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});