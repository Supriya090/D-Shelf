const { expect } = require("chai");
const { ethers } = require("hardhat");

let dshelf;
describe("Contract", function () {
  it("Deployed COntract", async function () {
    const Dshelf = await ethers.getContractFactory("dshelf");
    dshelf = await Dshelf.deploy("3","2","1");
    await dshelf.deployed();
  });

    it("Mint Batch", async function () {
        await dshelf.mintBatch("ipfsHash", "description", 0, 100, "author", 2121, "coverHash", 5, 10, 15, { value: ethers.utils.parseEther("3.0"),} );
    });
});