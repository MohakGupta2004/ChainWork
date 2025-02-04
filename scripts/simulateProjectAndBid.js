const {Web3} = require('web3');
const ABI = require("../artifacts/contracts/FreelanceDapp.sol/FreelanceDapp.json").abi; // Adjust the path to your ABI file
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Your deployed contract address

const web3 = new Web3("http://127.0.0.1:8545"); // Replace with your provider

const contract = new web3.eth.Contract(ABI, contractAddress);

// const hre = require("hardhat");
// const { ethers } = require("hardhat");

// async function createProject(title, description, budget, clientAddress) {
//   const accounts = await web3.eth.getAccounts();
//   const client = clientAddress; // Use the first account as the client

//   const tx = await contract.methods.createProject(title, description, web3.utils.toWei(budget, 'ether')).send({ from: client });
//   console.log(`Project created with transaction hash: ${tx.transactionHash}`);
// }

// async function placeBid(projectId, amount, comment, freelancerAddress) {
//   const accounts = await web3.eth.getAccounts();
//   const freelancer = freelancerAddress; // Use the second account as the freelancer

//   const tx = await contract.methods.placeBid(projectId, web3.utils.toWei(amount, 'ether'), comment).send({ from: freelancer });
//   console.log(`Bid placed with transaction hash: ${tx.transactionHash}`);
// }

// New function to accept a bid
async function acceptBid() {
  const projectId = 1; // Example project ID
  const bidIndex = 0;   // Example bid index

  try {
    const accounts = await web3.eth.getAccounts();
    const tx = await contract.methods.acceptBid(projectId, bidIndex).send({
      from: "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955", // Use the first account
      gas: 5000000, // Set a higher gas limit
    });
    console.log(tx)
    console.log(`Bid accepted successfully for project ID ${projectId} and bid index ${bidIndex}`);
  } catch (error) {
    console.error("Error accepting bid:", error);
  }
}

async function main() {
  // Get the contract factory
  // const FreelanceDapp = await hre.ethers.getContractFactory("FreelanceDapp");

  // // Deploy the contract
  // const freelanceDapp = await FreelanceDapp.deploy();
  // await freelanceDapp.deployed();

  // console.log("FreelanceDapp deployed to:", freelanceDapp.address);

  // const title = "Web Dev";
  // const description = "Build a hacking machine using React and Node.js.";
  // const budget = "1.2"; // Budget in ETH

  // // Create a project
  // await createProject(title, description, budget, "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"); // Replace with the actual client address

  // // Place a bid
  // const projectId = 1; // Assuming the project ID is 1
  // const bidAmount = "0.5"; // Bid amount in ETH
  // const comment = "I can do this";
  // await placeBid(projectId, bidAmount, comment, "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720"); // Replace with the actual freelancer address

  // Call the acceptBid function
  await acceptBid(); // Call the new function to accept a bid
}

// Run the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
  }); 
