import React, { useState } from "react"; // Import React and useState
import Web3 from "web3"; // Import Web3 for Ethereum interaction
import PaymentABI from '../../../PaymentABI.json' // Import the contract ABI

const DepositFund = () => {
    const [amount, setAmount] = useState("");

    const handleDeposit = async () => {
        if (!window.ethereum) {
            alert("Please install MetaMask!");
            return;
        }

        const web3 = new Web3(window.ethereum);
        const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
        const contract = new web3.eth.Contract(PaymentABI, contractAddress);

        try {
            const accounts = await web3.eth.requestAccounts();
            await contract.methods.depositFunds().send({ from: accounts[0], value: web3.utils.toWei(amount, "ether") });
            alert("Deposit successful!");
        } catch (error) {
            console.error("Error depositing funds:", error);
            alert("Deposit failed!");
        }
    };

    return (
        <>
            <p>A</p>
            <input 
                type="text" 
                placeholder="Amount in Ether" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
            />
            <button onClick={handleDeposit} className="deposit-button">Deposit Funds</button>
        </>
    );
};

// Add some CSS styles for the button
const styles = {
    depositButton: {
        backgroundColor: "#4CAF50", // Green background
        color: "white", // White text
        padding: "10px 20px", // Padding
        border: "none", // No border
        borderRadius: "5px", // Rounded corners
        cursor: "pointer", // Pointer cursor on hover
        fontSize: "16px", // Font size
    }
};

export default DepositFund;