
//import ABI from "../ABI.json"
import FreelanceABI from '../FreelanceDapp.json'
import Web3 from "web3";
//import dotenv from 'dotenv'
//dotenv.config()
import process from 'process';
const address = process.env.SEPOLIA_ADDRESS 
const web3 = new Web3(address)
const contractAddress = "0xcd57DB7FC9AA65C44daD666f14e83D58B1bc313A";
//const contractAddressTest = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const contract = new web3.eth.Contract(FreelanceABI, contractAddress);
export {
  web3,
  contract
}
