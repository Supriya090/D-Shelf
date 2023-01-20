require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require('dotenv').config()

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type string
 */
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  // rough lift switch dust ridge grunt boring fitness hidden kitten hill arrest
  mocha: {
    timeout: 40000,
  },
  networks: {
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    },
    ganache:{
      url : "http://localhost:8545",
      accounts:[PRIVATE_KEY]
    }
  },
  gasReporter: {
    enabled: true,
    currency: "Gwei",
    coinmarketcap: "7a96224a-d043-4efa-87cb-aa9ac1d03aad"
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
};