require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");

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

const PRIVATE_KEY =
  process.env.RINKEBY_PRIVATE_KEY ||
  process.env.PRIVATE_KEY ||
  "8fb7b2b7c68ebfb9b77feba8e6d5b2e4287cdc8cfdfd666e36c88c66f8495718";
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
    rinkeby: {
      url:
        process.env.RINKEBY_URL ||
        "https://eth-rinkeby.alchemyapi.io/v2/cQwQ1GuU6HfIcVaHoHMZe7dKl_ttPwGL",
      accounts: [`${PRIVATE_KEY}`],
    },
    kovan: {
      url: process.env.KOVAN_URL || "",
      accounts: [PRIVATE_KEY],
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
    apiKey: "SE3NA3Y1BFEGWAYNWSZY6VK3QXPT2EMTM6",
  },
};