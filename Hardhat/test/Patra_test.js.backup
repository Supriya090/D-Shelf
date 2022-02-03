const { expect } = require("chai");
const { ethers } = require("hardhat");

let dshelf;
let accounts;
let owner;

describe("Contract", function () {
  beforeEach(async function () {
    const Dshelf = await ethers.getContractFactory("dshelf");
    dshelf = await Dshelf.deploy("3","2","1");
    await dshelf.deployed();
    accounts = await ethers.getSigners();
    owner = accounts[0];
  });

  it("Mint One Content", async function () {
    content = {
      tokenId:[],
      tokenType : 1,
      contentType : 1,
      publicationDate:212112,
      author:"Rahul Shah",
      authorAddr: accounts[1].address,
      ipfsHash: "rahul.com.np",
      coverImageHash: "Image",
      onBid : false,
      descriptionHash : "description",
      Price : 500,
      isBurnt :false
    }
      await dshelf.connect(owner).mint(content, { value: ethers.utils.parseEther("1.0"),} );
      let contentId = await dshelf.getTokensOwnedByUser(owner.address);
      // console.log(contentId);
      // expect(await dshelf.getTokensOwnedByUser(owner.address)).to.equal([...Array(30).keys()]);
      // console.log(await dshelf.getContentofToken(0));

      await dshelf.listForSale(contentId[0], 50)
      expect(await dshelf.isListed(contentId[0])).to.equal(true);
      expect(await dshelf.getContentPrice(contentId[0])).to.equal(50);
      await dshelf.removeFromSale(contentId[0]);
      expect(await dshelf.isListed(contentId[0])).to.equal(false);


      await dshelf.listForSale(contentId[0], 10)
      expect(await dshelf.isListed(contentId[0])).to.equal(true);
      expect(await dshelf.getContentPrice(contentId[0])).to.equal(10);
      await dshelf.connect(accounts[15]).buyToken(contentId[0], { value: ethers.utils.parseEther("50.0")});
      // console.log(await dshelf.getTokensOwnedByUser(accounts[15].address));
      // expect(await dshelf.getTokensOwnedByUser(accounts[15].address)).to.equal([contentId[0]]);
      // console.log((await dshelf.getContentofToken(contentId[0]).toNumber()));
  });
/*
  it("Mint Batch", async function () {
    content = {
      tokenId:[],
      tokenType : 0,
      contentType : 0,
      publicationDate:1225666,
      author:"Ranju GC",
      authorAddr: accounts[1].address,
      ipfsHash: "thank you",
      coverImageHash: "coverImage",
      onBid : false,
      descriptionHash : "descriptionHash",
      Price : 400,
      isBurnt :false
    }
      await dshelf.connect(owner).mintBatch(content, 5, 10, 15, { value: ethers.utils.parseEther("3.0"),} );
      console.log(await dshelf.getTokensOwnedByUser(owner.address));
      // expect(await dshelf.getTokensOwnedByUser(owner.address)).to.equal([...Array(30).keys()]);
      console.log(await dshelf.getContentofToken(1));
      for(i = 1; i < 11; i++){
        await dshelf.burnOffensiveContent(i);
      }
      console.log(await dshelf.getContentofToken(15));
      // expect((await dshelf.getTokensOwnedByUser(owner.address)).length).to.equal(20);

      // console.log(await dshelf.listForSale(11, 50))
      // expect(await dshelf.isListed(11)).to.equal(true);
      // expect(await dshelf.getContentPrice(11)).to.equal(50);
      // await dshelf.removeFromSales(11);
      // expect(await dshelf.isListed(11)).to.equal(false);


      // await dshelf.listForSale(15, 100)
      // expect(await dshelf.isListed(15)).to.equal(true);
      // expect(await dshelf.getContentPrice(15)).to.equal(100);
      // await dshelf.connect(accounts[15].buyToken(15, { value: ethers.utils.parseEther("1.0"),}));
      // expect(await dshelf.getTokensOwnedByUser(accounts[15].address)).to.equal([15]);
      // console.log(await dshelf.getContentofToken(15));
  });
  
*/
});