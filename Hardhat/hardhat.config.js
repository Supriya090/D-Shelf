require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

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
  "59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
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
    // enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    gasPrice: 21,
  },
  etherscan: {
    apiKey: "SE3NA3Y1BFEGWAYNWSZY6VK3QXPT2EMTM6",
  },
};