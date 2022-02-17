// scripts/deploy.js
async function main() {
    const signer = await ethers.getSigner();
    const Market = await ethers.getContractFactory("bookmarket");
    const market = await Market.deploy()
    await market.deployed()
    console.log("Deployed at : ",market.address, "by :",await signer.getAddress());
    const marketAddress = market.address
    
    const NFT = await ethers.getContractFactory("book");
    const nft = await NFT.deploy(marketAddress)
    await nft.deployed()
    console.log("Deployed at : ",nft.address, "by :",await signer.getAddress());

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });