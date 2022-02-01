// scripts/deploy.js
async function main() {
    const [deployer] = await ethers.getSigners();
    const admin = deployer;
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const dshelfToken = await ethers.getContractFactory("DShelf");
    console.log("Deploying Dshelf Contract...");
    const dshelf = await dshelfToken.deploy(3,2,1);
    const dshelfDeploy = await dshelf.deployed(); 
    console.log("Dshelf Contract deployed,the contract address:", dshelfDeploy.address);

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });