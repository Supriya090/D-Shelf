// scripts/deploy.js
async function main() {
    const [deployer] = await ethers.getSigners();
    const admin = deployer;

    console.log("Deploying contracts with the account:", deployer.address);

    const Market = await ethers.getContractFactory("bookmarket");
    const market = await Market.deploy()
    await market.deployed()
    console.log("Deployed at : ",market.address);
    const marketAddress = market.address
    
    const NFT = await ethers.getContractFactory("book");
    const nft = await NFT.deploy(marketAddress, 3, 2, 1)
    await nft.deployed()
    console.log("Deployed at : ",nft.address);

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });