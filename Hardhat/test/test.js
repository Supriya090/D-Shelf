const { expect, assert } = require("chai");
const { BigNumber } = require("ethers");
const { upgrades,ethers, run } = require("hardhat");


let accounts;
let owner;
let market;
let nft;
let nftContractAddress;


describe("NFTMarket", function() {

  beforeEach(async function() {
    run("compile");
    const Market = await ethers.getContractFactory("bookmarket");
     market = await Market.deploy()
    await market.deployed()
    // console.log("Deployed at : ",market.address);
    const marketAddress = market.address

    const NFT = await ethers.getContractFactory("book");
    nft = await NFT.deploy(marketAddress)
    
    await nft.deployed()
    // console.log("Deployed at : ",nft.address);
    nftContractAddress = nft.address
    accounts = await ethers.getSigners()
    owner = accounts[0]
  })

  
  // it("Should mint 1 Bronze", async function() {
    
  //   let buyerAddress = accounts[1];
  //   const dummy = accounts[5];
  //   const content = {
  //     cid: 1,
  //     title: "The Gravity of Us",
  //     tokenIds:[],
  //     tokenType : 1,
  //     contentType : 1,
  //     publicationDate:2121176542,
  //     author:"Rahul Shah",
  //     authorAddr: dummy.address,
  //     coverImageHash: "https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu",
  //     descriptionHash : "https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu",
  //     description: "MetaMask wallet is a crypto wallet & gateway to blockchain apps. MetaMask walletused to interact with the Ethereum blockchain. MetaMask allows users to access theirEthereum wallet, store and manage account keys, broadcast transactions, send and receiveEthereum-based cryptocurrencies and tokens, and securely connect to decentralized appli-cations through a compatible web browser or the mobile apps built-in browser."
  //   }

  //   await nft.mintBatch( content, ethers.utils.formatBytes32String("622a2d43ab027546d340c844"),0, 0, 1, { value: ethers.utils.parseEther("1.0")} );
  // })
  
  it("Should mint and execute market sales", async function() {
    
    let buyerAddress = accounts[1];
    const dummy = accounts[5];
    const content = {
      cid: 1,
      title: "The Gravity of Us",
      tokenIds:[],
      tokenType : 1,
      contentType : 1,
      publicationDate:2121176542,
      author:"Rahul Shah",
      authorAddr: dummy.address,
      coverImageHash: "https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu",
      descriptionHash : "https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu",
      description: "MetaMask wallet is a crypto wallet & gateway to blockchain apps. MetaMask walletused to interact with the Ethereum blockchain. MetaMask allows users to access theirEthereum wallet, store and manage account keys, broadcast transactions, send and receiveEthereum-based cryptocurrencies and tokens, and securely connect to decentralized appli-cations through a compatible web browser or the mobile apps built-in browser."
    }

    await nft.mintBatch( content, ethers.utils.formatBytes32String("622a2d43ab027546d340c844"),10, 20, 30, { value: ethers.utils.parseEther("10.0")} );
    // await nft.mintBatch( content, ethers.utils.formatBytes32String("622a2d43ab027546d340c844"),1, 0, 0, { value: ethers.utils.parseEther("10.0")} );
    await nft.getTokensOwnedByUser()
    await nft.getTotalContents()
    await nft.getTotalgoldTokens()
    await nft.getTotalsilverTokens()
    await nft.getTotalbronzeTokens()
    await nft.getEncryptionKey(10)
    await nft.getEncryptionKeybyToken(20)
    await nft.getContentList()
    await nft.getContentofToken(11)
    await nft.getAllContentsOfUser()
    await nft.getContentsOfEachTokenType("gold")
    await nft.getContentsOfEachTokenType("silver")
    await nft.getContentsOfEachTokenType("bronze")
    await nft.getContentsByTokenTypeofUser("gold", accounts[0].address)
    await nft.getContentsByTokenTypeofUser("silver", accounts[0].address)
    await nft.getContentsByTokenTypeofUser("bronze", accounts[0].address)
    await nft.setApproval(5)
    await nft.setApproval(15)
    
    await market.createMarketItem(nftContractAddress, 1, 1, accounts[0].address)
    await market.createMarketItem(nftContractAddress, 2, 1, accounts[0].address)
    await market.createMarketItem(nftContractAddress, 3, 1, accounts[0].address)
    await market.createMarketItem(nftContractAddress, 4, 1, accounts[0].address)
    await market.createMarketItem(nftContractAddress, 5, 1, accounts[0].address)
    await market.removeMarketItem(nftContractAddress, 2)
    await market.removeMarketItem(nftContractAddress, 3)
    const auctionPrice = await market.getPrice(1)
    await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: ethers.utils.parseEther(auctionPrice.toString())})
    await market.connect(buyerAddress).createMarketSale(nftContractAddress, 4, { value: ethers.utils.parseEther(auctionPrice.toString())})
    await market.fetchMarketItems()
    await market.fetchListeditems()
    await market.fetchItemsCreated()
    await market.isTokenListed(4)
    await market.FilterTokens([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
    await market.connect(buyerAddress).fetchMyNFTs()
  })

})