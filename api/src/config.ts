
import ABI from "../ABI.json"
import Web3 from "web3";
const web3 = new Web3(process.env.SEPOLIA_ADDRESS)
const contractAddress = "0x9c9907E9Baa9C2639362691093fb552f6E8c311C";
export const contract = new web3.eth.Contract(ABI, contractAddress);

