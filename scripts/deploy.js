async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const FreelanceDapp = await ethers.getContractFactory("FreelanceDapp");
  const freelanceDapp = await FreelanceDapp.deploy();

  await freelanceDapp.waitForDeployment();


  console.log("FreelanceDapp deployed to:", await freelanceDapp.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 