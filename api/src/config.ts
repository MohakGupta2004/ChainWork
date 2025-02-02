import ABI from "../ABI.json"
import Web3 from "web3";
const web3 = new Web3("http://127.0.0.1:8545")
//const contractAddress = "0xBc08d43f7F8bb220f7315778277ff38A2DE915b4";
const contractAddressTest = "0x5FbDB2315678afecb367f032d93F642f64180aa3"  
export const contract = new web3.eth.Contract(ABI, contractAddressTest);

