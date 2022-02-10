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

  it("should mint single as well as batch of nfts", async function() {
    const dummy = accounts[5];
    const buyerAddress = accounts[6];
    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()
    const auctionPrice = ethers.utils.parseUnits('1', 'ether')
    const content1 = {
      tokenIds:[],
      tokenType : 1,
      contentType : 1,
      publicationDate:212112,
      author:"Rahul Shah",
      authorAddr: dummy.address,
      coverImageHash: "Image",
      descriptionHash : "description"
    }

    const content2 = {
      tokenIds:[],
      tokenType : 0,
      contentType : 0,
      publicationDate:1225666,
      author:"Ranju GC",
      authorAddr: dummy.address,
      coverImageHash: "coverImage",
      descriptionHash : "descriptionHash"
    }

    await nft.connect(accounts[1]).mintBatch("https://www.mytokenlocation1.com", content1, 1,0,0, { value: ethers.utils.parseEther("10.0")} );
    await nft.mintBatch("https://www.mytokenlocation2.com", content2, 10, 20, 30, { value: ethers.utils.parseEther("10.0")} );
    expect(await nft.balanceOf(owner.address)).to.equal(60);
    expect(await nft.balanceOf(accounts[1].address)).to.equal(1);
    expect(await nft.balanceOf(buyerAddress.address)).to.equal(0);
    await market.connect(accounts[1]).createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice })

    console.log("Minter : ", await nft.getTokensOwnedByUser(accounts[1].address))
    console.log("Before Buying : ", await nft.getTokensOwnedByUser(buyerAddress.address))
    
    await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice})
    console.log("Seller : ", await nft.getTokensOwnedByUser(accounts[1].address))
    console.log("Buyer : ", await nft.getTokensOwnedByUser(buyerAddress.address))

    expect(await nft.balanceOf(accounts[1].address)).to.equal(0);
    expect(await nft.balanceOf(buyerAddress.address)).to.equal(1);
  })

  it("should have contents index value=4, 1 single mint,10mint of gold, 20 mints of silver, 30 mint of bronze  ", async function() {
    const dummy = accounts[5];
    const content1 = {
      tokenIds:[],
      tokenType : 1,
      contentType : 1,
      publicationDate:212112,
      author:"Rahul Shah",
      authorAddr: dummy.address,
      coverImageHash: "Image",
      descriptionHash : "description"
    }

    const content2 = {
      tokenIds:[],
      tokenType : 0,
      contentType : 0,
      publicationDate:1225666,
      author:"Ranju GC",
      authorAddr: dummy.address,
      coverImageHash: "coverImage",
      descriptionHash : "descriptionHash"
    }

    // let value1 = await nft.connect(accounts[1]).mintOneToken("https://www.mytokenlocation1.com", content1, { value: ethers.utils.parseEther("10.0")} );
    await nft.mintBatch("https://www.mytokenlocation2.com", content2, 10, 20, 30, { value: ethers.utils.parseEther("10.0")} );
    expect(await nft.balanceOf(owner.address)).to.equal(60);
    const value = await nft.connect(owner.address).callStatic.getAllContentsOfUser(owner.address)
    console.log("content : ", value);
    const value3 = [1,2,3]
    const value2 = await nft.connect(owner.address).callStatic.getContentbyContentIndexArray(value3)
    expect(value.length).to.equal(3);
    console.log(value2);
    console.log(await nft.connect(owner.address).callStatic.getTokensOwnedByUser(owner.address));
    console.log(await nft.connect(owner.address).callStatic.getTokensOwnedByUser(accounts[1].address));
    console.log(await nft.callStatic.getContentofToken(23));
    const a = [1,5,18,40];
    const value4 = await nft.callStatic.getContentbyTokensArray(a)
    console.log(value4);
    console.log(await nft.callStatic.getContentbyContentIndexArray(value4));
    console.log(await nft.callStatic.getContentsOfEachTokenType("gold"));
    console.log(await nft.callStatic.getContentsByTokenTypeofUser("silver",owner.address));

  })

/*
  it("Should create and execute market sales", async function() {
    
    let buyerAddress = accounts[1];
    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()
    const auctionPrice = ethers.utils.parseUnits('1', 'ether')
    console.log("Buyer Address : ",buyerAddress.address);
    const content1 = {
      tokenIds:[],
      tokenType : 1,
      contentType : 1,
      publicationDate:212112,
      author:"Rahul Shah",
      authorAddr: buyerAddress.address,
      ipfsHash: "rahul.com.np",
      coverImageHash: "Image",
      onBid : false,
      descriptionHash : "description",
      Price : 500,
      isBurnt :false
    }

    const content2 = {
      tokenIds:[],
      tokenType : 0,
      contentType : 0,
      publicationDate:1225666,
      author:"Ranju GC",
      authorAddr: buyerAddress.address,
      ipfsHash: "thank you",
      coverImageHash: "coverImage",
      onBid : false,
      descriptionHash : "descriptionHash",
      Price : 400,
      isBurnt :false
    }

    let value1 = await nft.mintOneToken("https://www.mytokenlocation1.com", content1, { value: ethers.utils.parseEther("10.0"),} );
    console.log(value1);
    await nft.mintBatch("https://www.mytokenlocation2.com", content2, 10, 20, 30, { value: ethers.utils.parseEther("10.0"),} );
    await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice })
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice })

    await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice})

    items = await market.fetchMarketItems()
    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))
    console.log('items: ', items)
  })
*/
})