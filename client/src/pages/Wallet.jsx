import { Web3 } from "web3";
import { useNavigate } from "react-router-dom";
import ABI from "../../../FreelanceDapp.json";
import { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import { Footer } from "../components/Footer";

function Wallet() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);
  const { auth, updateAuth } = useAuth();

  // If user already has a type, show only connect button
  useEffect(() => {
    if (auth.userType) {
      setUserType(auth.userType);
    }
  }, [auth.userType]);

  const wallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });

        const contractAddress = "0xcd57DB7FC9AA65C44daD666f14e83D58B1bc313A";
        const contract = new web3.eth.Contract(ABI, contractAddress);

        updateAuth({
          web3,
          contract,
          account: accounts[0],
          userType
        });

        // Navigate based on user type with new route structure
        if (userType === 'client') {
          navigate('/client/create-project');
        } else if (userType === 'freelancer') {
          navigate('/freelancer/jobs');
        }

        console.log("Login successful as", userType);
      } else {
        console.log("ERROR in the ethereum");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Store user type in localStorage when selected
  const handleUserTypeSelect = (type) => {
    setUserType(type);
    localStorage.setItem('selectedUserType', type);
  };

  // Check for stored user type on component mount
  useEffect(() => {
    const storedUserType = localStorage.getItem('selectedUserType');
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);



  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-8">
        {!localStorage.getItem('selectedUserType') ? (
          <>
            <h2 className="text-3xl font-bold mb-8 text-center">Choose Your Role</h2>
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => handleUserTypeSelect('client')}
                className={`px-6 py-3 rounded-lg transition-all duration-200 border ${userType === 'client'
                    ? 'border-2 scale-105'
                    : 'hover:border-2'
                  }`}
              >
                Client
              </button>
              <button
                onClick={() => handleUserTypeSelect('freelancer')}
                className={`px-6 py-3 rounded-lg transition-all duration-200 border ${userType === 'freelancer'
                    ? 'border-2 scale-105'
                    : 'hover:border-2'
                  }`}
              >
                Freelancer
              </button>
            </div>
          </>
        ) : (
          <h2 className="text-2xl font-bold mb-6 text-center">
            Welcome, {localStorage.getItem('selectedUserType')}!
          </h2>
        )}

        {userType && (
          <button
            onClick={wallet}
            className="w-full py-3 px-6 rounded-lg border hover:border-2
                     transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Connect with Metamask
          </button>
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default Wallet;
