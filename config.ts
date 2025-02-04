//import ABI from "../ABI.json"
import FreelanceABI from './FreelanceDapp.json'
import Web3 from "web3";
const web3 = new Web3("http://127.0.0.1:8545")
//const contractAddress = "0xBc08d43f7F8bb220f7315778277ff38A2DE915b4";
const contractAddressTest = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
const contract = new web3.eth.Contract(FreelanceABI, contractAddressTest);
export {
  web3,
  contract
}

