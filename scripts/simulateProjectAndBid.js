const {Web3} = require('web3');
const ABI = require('../api/ABI.json'); // Adjust the path to your ABI file
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Your deployed contract address

const web3 = new Web3("HTTP://127.0.0.1:8545"); // Replace with your provider

const contract = new web3.eth.Contract(ABI, contractAddress);

async function createProject(title, description, budget, clientAddress) {
  const accounts = await web3.eth.getAccounts();
  const client = accounts[0]; // Use the first account as the client

  const tx = await contract.methods.createProject(title, description, web3.utils.toWei(budget, 'ether')).send({ from: client });
  console.log(`Project created with transaction hash: ${tx.transactionHash}`);
}

async function placeBid(projectId, amount, comment, freelancerAddress) {
  const accounts = await web3.eth.getAccounts();
  const freelancer = accounts[1]; // Use the second account as the freelancer

  const tx = await contract.methods.placeBid(projectId, web3.utils.toWei(amount, 'ether'), comment).send({ from: freelancer });
  console.log(`Bid placed with transaction hash: ${tx.transactionHash}`);
}

async function main() {
  const title = "pornhub Project";
  const description = "Build a responsive website using React and Node.js.";
  const budget = "15000"; // Budget in ETH

  // Create a project
  await createProject(title, description, budget, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"); // Replace with the actual client address

  // Place a bid
  const projectId = 2; // Assuming the project ID is 1
  const bidAmount = "0.5"; // Bid amount in ETH
  const comment = "I fucking can do this!";
  await placeBid(projectId, bidAmount, comment, "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"); // Replace with the actual freelancer address
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 