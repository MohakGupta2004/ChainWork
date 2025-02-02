const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const FreelanceDapp = await hre.ethers.getContractFactory("FreelanceDapp");

  // Deploy the contract
  const freelanceDapp = await FreelanceDapp.deploy();

  // Wait for the deployment to be mined
  await freelanceDapp.waitForDeployment();

  // Log the contract address
  console.log("FreelanceDapp deployed to:",await freelanceDapp.getAddress());
}

// Run the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
