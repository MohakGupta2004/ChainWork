import {Web3} from 'web3'
import { useNavigate } from "react-router-dom";
import ABI from "../../FreelanceDapp.json"

function Wallet({saveState}) {
  const navigate = useNavigate()
  const wallet = async ()=>{
   try {
    if(window.ethereum){
        const web3 = new Web3(window.ethereum)
        const accounts= await window.ethereum.request({
          method: "eth_requestAccounts"
        })        
        const contractAddress = "0x9c9907E9Baa9C2639362691093fb552f6E8c311C";
        const contract = new web3.eth.Contract(ABI, contractAddress);
        saveState({
          web3: web3,
          contract: contract,
          //@ts-ignore
          account: accounts[0]
        })
        console.log("yeah lgoin done")
    } else {
        console.log("ERROR in the ethereum")
      }
   } catch (err) {
    console.log(err)    
   } 
  }
  return (
    <div>

      <button onClick={wallet}>
          <p className='text-xl font-medium text-white dark:text-white'>Connect with metamask</p>
      </button>
    </div>
  )
}

export default Wallet
