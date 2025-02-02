require("@nomicfoundation/hardhat-toolbox");
// require('@nomiclabs/hardhat-waffle');
// require('@nomiclabs/hardhat-ethers');

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      url: "http://127.0.0.1:8545", // or use the WebSocket URL for Web3 provider
      accounts: {
        mnemonic: "test test test test test test test test test test test junk", // or use private keys for the accounts
      },
    },
  },
};

