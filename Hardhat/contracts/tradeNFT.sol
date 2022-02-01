// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import './dshelf.sol';

contract TradeNFT {
    Dshelf private dshelf;

    constructor(Dshelf _dshelf) {
        Dshelf = _dshelf;
    }
    
    mapping(uint256 => uint256) private priceOfToken;

    event ListedForSale(uint256 _tokenId, uint256 _sellingPrice);
    
    event TokenSold(
        uint256 _tokenId,
        uint256 _sellingPrice,
        address _buyer,
        address _seller
    );

    modifier OnlyTokenOwner(uint256 _tokenId, address _user) {
        require(
            _user == artNFT.ownerOf(_tokenId),
            'Err: only token owner can execute this'
        );
        _;
    }

    modifier refundExcess(uint256 _tokenId) {
        _;
        uint256 _price = priceOfToken[_tokenId];
        uint256 amountToRefund = msg.value - _price;

        //refund
        payable(msg.sender).transfer(amountToRefund);
    }

    modifier resetTokenSale(uint256 _tokenId) {
        _;
        delete priceOfToken[_tokenId];
    }

    function listForSale(uint256 _tokenId, uint256 _sellingPrice)
        public
        OnlyTokenOwner(_tokenId, msg.sender)
        returns (bool)
    {
        require(_sellingPrice != 0, 'Error: Cannot sale for zero value');
        // token is not for sale already
        require(
            priceOfToken[_tokenId] == 0,
            'Error: Contract is already for sale'
        );

        priceOfToken[_tokenId] = _sellingPrice;
        emit ListedForSale(_tokenId, _sellingPrice);
        return true;
    }

    function buyToken(uint256 _tokenId)
        public
        payable
        resetTokenSale(_tokenId)
        refundExcess(_tokenId)
    {
        uint256 _price = priceOfToken[_tokenId];
        require(msg.value >= _price, 'Err: value sent insufficent to buy');
        require(_price > 0, 'Err: token is not listed for sale');

        // send ether to the seller
        address payable _seller = payable(dshelf.ownerOf(_tokenId));
        _seller.transfer(_price);

        // tranfer NFT to the buyer
        dshelf.safeTransferFrom(_seller, msg.sender, _tokenId);

        emit TokenSold(_tokenId, _price, msg.sender, _seller);
    }

    function isListed(uint256 _tokenId) public view returns (bool) {
        return (priceOfToken[_tokenId]!=0);
    }

    function getContentPrice(uint256 _tokenId) public view returns (uint256) {
        require(
            priceOfToken[_tokenId] != 0,
            'Err: The item is not listed for sale'
        );
        return priceOfToken[_tokenId];
    }

    function removeFromSale(uint256 _tokenId) public {
        uint256 _price = priceOfToken[_tokenId];
        require(_price > 0, 'Err: token is not listed for sale');
        require(
            dshelf.ownerOf(_tokenId) == msg.sender,
            'Err: only owner can unlist the item'
        );

        delete priceOfToken[_tokenId];
    }

 
}