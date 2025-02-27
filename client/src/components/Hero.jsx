import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Web3 } from "web3";
import ABI from "../../../FreelanceDapp.json";

export default function Hero() {
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

        const contractAddress = "0x525E2C99c304bA6d795fc871b95a6EF3058A6235";
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
    <section className="relative py-20 overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {!userType ? (
          <div className="text-center">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The Next Level of
              <motion.span
                className="text-orange-500"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {' '}
                Web3
              </motion.span>{' '}
              Freelancing
            </motion.h1>

            <motion.p
              className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Connect, collaborate, and get paid securely with blockchain
              technology. The future of freelancing is here.
            </motion.p>

            <motion.div
              className="flex justify-center space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                onClick={() => handleUserTypeSelect('freelancer')}
                className="bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Find Work
              </motion.button>
              <motion.button
                onClick={() => handleUserTypeSelect('client')}
                className="border border-orange-500 text-orange-500 px-8 py-4 rounded-lg hover:bg-orange-500/10 transition text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Hire Talent
              </motion.button>
            </motion.div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">
              Welcome, {userType}!
            </h2>
            <button
              onClick={wallet}
              className="w-full py-3 px-6 rounded-lg border hover:border-2
                       transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Connect with Metamask
            </button>
          </div>
        )}
      </div>
    </section>
  );
}