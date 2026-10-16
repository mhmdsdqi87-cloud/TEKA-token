
const hre = require("hardhat");

async function main() {
  const network = await hre.ethers.provider.getNetwork();

  console.log("Network:", hre.network.name);
  console.log("Chain ID:", network.chainId.toString());

  if (hre.network.name !== "baseSepolia") {
    throw new Error(
      "Wrong network. Expected baseSepolia; deployment cancelled."
    );
  }

  const [deployer] = await hre.ethers.getSigners();

  console.log("Deployer address:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(
    deployer.address
  );

  console.log(
    "Wallet balance:",
    hre.ethers.formatEther(balance),
    "ETH"
  );

  if (balance === 0n) {
    throw new Error(
      "No test ETH available. Fund the wallet on Base Sepolia first."
    );
  }

  const TEKAToken = await hre.ethers.getContractFactory("TEKAToken");
  const teka = await TEKAToken.deploy();

  console.log("Deployment transaction:", teka.deploymentTransaction().hash);

  await teka.waitForDeployment();

  console.log("TEKA Token deployed to:", await teka.getAddress());
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
