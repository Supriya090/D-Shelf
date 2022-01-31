// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";

contract MyToken is ERC1155, Ownable, ERC1155Burnable {
    constructor() ERC1155("CONTENT") {}

//token type of the the NFT
    enum TokenType{GOLD, SILVER, BRONZE}

//Type of the content
    enum ContentType{BOOK, BLOG, POEM, PAPER, LYRICS, STORY, OTHERS}

    struct Token{
        TokenType tokenType;
        ContentType contentType;
        bool onBid;
    }

    function _getContentTypeId(string memory _contentType) public view returns (ContentType) {
        if (keccak256(abi.encodePacked(_contentType)) == keccak256(abi.encodePacked("poem"))) return ContentType.POEM;
        if (keccak256(abi.encodePacked(_contentType)) == keccak256(abi.encodePacked("blog"))) return ContentType.BLOG;
        if (keccak256(abi.encodePacked(_contentType)) == keccak256(abi.encodePacked("story"))) return ContentType.STORY;
        if (keccak256(abi.encodePacked(_contentType)) == keccak256(abi.encodePacked("lyrics"))) return ContentType.LYRICS;
        if (keccak256(abi.encodePacked(_contentType)) == keccak256(abi.encodePacked("books"))) return ContentType.BOOK;
        if (keccak256(abi.encodePacked(_contentType)) == keccak256(abi.encodePacked("paper"))) return ContentType.PAPER;
        return ContentType.OTHERS;
    }

    function _getContentTypeIds(string[] memory _contentTypes) public view returns (ContentType[] memory) {
        uint256 i = 0;
        ContentType[] memory _contentTypeIds = new ContentType[](_contentTypes.length);
        for (i = 0; i < _contentTypes.length; i++) {
            _contentTypeIds[i] = _getContentTypeId(_contentTypes[i]);
        }
        return _contentTypeIds;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data) external payable
    {

        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
    {
        _mintBatch(to, ids, amounts, data);
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
