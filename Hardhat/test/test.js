describe("NFTMarket", function() {
    it("Should create and execute market sales", async function() {
      const Market = await ethers.getContractFactory("bookmarket")
      const market = await Market.deploy()
      await market.deployed()
      console.log("Deployed at : ",market.address);
      const marketAddress = market.address
  
      const NFT = await ethers.getContractFactory("book")
      const nft = await NFT.deploy(marketAddress, 3, 2, 1)
      
      await nft.deployed()
      console.log("Deployed at : ",nft.address);
      const nftContractAddress = nft.address
  
      let listingPrice = await market.getListingPrice()
      listingPrice = listingPrice.toString()
  
      const auctionPrice = ethers.utils.parseUnits('1', 'ether')
      
      const content1 = {
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

      const content2 = {
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

      await nft.mintOneToken("https://www.mytokenlocation1.com", content1, { value: ethers.utils.parseEther("1.0"),} );
      await nft.mintBatch("https://www.mytokenlocation2.com", content2, 10, 20, 30, { value: ethers.utils.parseEther("1.0"),} );
    
      await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice })
      await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice })
      
      const [_, buyerAddress] = await ethers.getSigners()
  
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
  })