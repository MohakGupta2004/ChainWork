const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const PaymentDapp = await hre.ethers.getContractFactory("PaymentContract");

  // Deploy the contract
  const paymentDapp = await PaymentDapp.deploy();

  // Wait for the deployment to be mined
  await paymentDapp.waitForDeployment();

  // Log the contract address
  console.log("PaymentDapp deployed to:",await paymentDapp.getAddress());
}

// Run the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
