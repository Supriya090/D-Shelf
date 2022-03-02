//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

interface Ibook{
  function addtoken(uint256 _tokenId, address buyer) external;
  function removetoken(uint256 _tokenId, address seller) external;
}

contract bookmarket is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;
    Counters.Counter private _unlisted;

    address payable owner;
    uint256 precision = 1000000000;

    constructor() {
        owner = payable(msg.sender);
        
    }

    struct MarketItem {
        uint itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;
    mapping(uint256 => uint256) public _itemId;

    event MarketItemCreated (
        uint indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    // /* Returns the listing price of the contract */
    function getPrecision() public view returns (uint256) {
        return precision;
    }

    /* Places an item for sale on the marketplace */
    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public nonReentrant {
        require(price >= 0, "Price must be at least 1 gwei");

        _itemIds.increment();
        uint256 itemId = _itemIds.current();
        _itemId[tokenId] = itemId;

        idToMarketItem[itemId] =  MarketItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false
        );

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        emit MarketItemCreated(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );
    }

    /* removes an item from sale on the marketplace */
    function removeMarketItem(
        address nftContract,
        uint256 tokenId
    ) public nonReentrant {
        _unlisted.increment();
        require(msg.sender==idToMarketItem[_itemId[tokenId]].seller,"Only owner can unlist the item");

        IERC721(nftContract).transferFrom(address(this),msg.sender, tokenId);
        delete idToMarketItem[_itemId[tokenId]];
    }

    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function createMarketSale(
        address nftContract,
        uint256 tokenId
        ) public payable nonReentrant {
        uint256 itemId = _itemId[tokenId];
        uint price = (idToMarketItem[itemId].price);
        require((msg.value*precision) >= price, "Please submit the asking price in order to complete the purchase");
        require(msg.sender != idToMarketItem[itemId].seller,"Seller can't be buyer");

        idToMarketItem[itemId].seller.transfer((price*1)/precision);
        if((msg.value*precision) > price){
            payable(msg.sender).transfer(((msg.value - price)*1)/precision);
        }
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

        Ibook book = Ibook(nftContract);
        book.addtoken(tokenId, msg.sender);
        book.removetoken(tokenId, idToMarketItem[itemId].seller);

        idToMarketItem[itemId].owner = payable(msg.sender);
        idToMarketItem[itemId].sold = true;
        _itemsSold.increment();
    }
  
    /* Returns all unsold market items */
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint itemCount = _itemIds.current();
        uint unsoldItemCount = _itemIds.current() - _itemsSold.current() - _unlisted.current();
        uint currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(0) && idToMarketItem[i + 1].itemId != 0) {
                uint currentId = i + 1;
                MarketItem memory currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns only items that a user has purchased */
    function fetchMyNFTs() external view returns (MarketItem[] memory) {
        uint totalItemCount = _itemIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns only items a user has created */
    function fetchItemsCreated() external view returns (MarketItem[] memory) {
        uint totalItemCount = _itemIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }
       
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function isTokenListed(uint256 tokenId) public view returns(bool){
        return (_itemId[tokenId]>0);
    }

    function FilterTokens(uint256[] memory _tokenIds) public view returns(uint256[] memory){
        uint count = 0;
        for (uint256 i = 0; i< _tokenIds.length; i++) {
          if(_itemId[_tokenIds[i]]==0){
              count += 1;
          }
        }
        uint256[] memory tokenIds = new uint256[](count);
        for (uint256 i = 0; i< _tokenIds.length; i++) {
          if(_itemId[_tokenIds[i]]==0){
              count -= 1;
              tokenIds[count] = _tokenIds[i];
          }
        }

        return tokenIds;
    }

  /* Returns total tokens items a user has created */
  function fetchTotalUserTokens() external view returns (uint256[] memory) {
    uint totalItemCount = _itemIds.current();
    uint256 itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].seller == msg.sender) {
        itemCount += 1;
      }
    }

    uint256[] memory tokenIds = new uint256[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].seller == msg.sender) {
        uint currentId = i + 1;
        uint256 currenttoken = idToMarketItem[currentId].tokenId;
        tokenIds[currentIndex] = currenttoken;
        currentIndex += 1;
      }
    }
    return tokenIds;
  }
}