// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

contract book is ERC721URIStorage {

    //token type of the the NFT
    enum TokenType{GOLD, SILVER, BRONZE}

    //Type of the content
    enum ContentType{Other,Fiction, NonFiction, Informative, Text, Novel, Romantic}

    //user address => list of user owned tokens
    mapping(address => uint256[]) public  userOwnedTokens;

    //mint fee of the tokens for each category
    mapping(TokenType=>uint256) internal mintingFee;

    //deployer address
    address public deployer;

    //list of gold tokens
    uint256[] public goldTokenIds;

    //list of silver tokens
    uint256[] public silverTokenIds;

    //list of bronze tokens
    uint256[] public bronzeTokenIds;


    //details of each contents
    struct Content{
        uint256[] tokenIds;
        TokenType tokenType;
        ContentType contentType;
        uint256 publicationDate;
        string author;
        address authorAddr;
        string ipfsHash;
        string coverImageHash;
        bool onBid;
        string descriptionHash;
        uint256 Price;
        bool isBurnt;
    }

    //list of all the contents
    Content[] public contents;
    uint256 [] public contentIds;

    //if the token is minted 
    event minted(
        address _address,
        uint256 _tokenId
    );

    //modifier to only token owner access 
    modifier OnlyTokenOwner(uint256 _tokenId, address _user) {
        require(
            _user == ownerOf(_tokenId),
            'Err: only token owner can execute this'
        );
        _;
    }

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;

    constructor(address marketplaceAddress,uint256 gold,uint256 silver, uint256 bronze) ERC721("Metaverse", "METT") {
        contractAddress = marketplaceAddress;
        mintingFee[TokenType.GOLD]=gold;
        mintingFee[TokenType.SILVER] = silver;
        mintingFee[TokenType.BRONZE] = bronze;
        deployer=msg.sender;
        uint256[] memory array = new uint256[](0);
        Content memory empty = Content(array, TokenType.GOLD, ContentType.Other, 0, "", msg.sender, "", "", false, "", 0, false);
        contents.push(empty);
    }

    function mintOneToken(string memory tokenURI,Content memory content) public payable returns (uint) {
        _tokenIds.increment();
        uint256 mintFee = mintingFee[content.tokenType];
        uint256 newItemId = _tokenIds.current();
        uint256[] memory tokenIds = new uint256[](1);
        tokenIds[0] = newItemId;

        handleMintFee(mintFee);
        content.authorAddr=msg.sender;
        content.tokenIds=tokenIds;
        contents.push(content);
        
        //set the tokens owned by user

        _mint(msg.sender, newItemId);
        emit minted(msg.sender,newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true);
        userOwnedTokens[msg.sender].push(newItemId);
        return newItemId;
    }

    function mintBatch(string memory tokenURI,Content memory content,uint gold, uint silver, uint bronze) public payable returns (uint) {
        uint256 mintFee =   mintingFee[TokenType.GOLD]*gold+
                            mintingFee[TokenType.SILVER]*silver+
                            mintingFee[TokenType.BRONZE]*bronze;
        handleMintFee(mintFee);

        uint256[] memory tokenIdsGold = new uint256[](gold);
        uint256[] memory tokenIdsSilver = new uint256[](silver);
        uint256[] memory tokenIdsBronze = new uint256[](bronze);
        for (uint256 i = 0; i < (gold + silver + bronze); i++) {
            _tokenIds.increment();
            uint256 newItemId = _tokenIds.current();
            _mint(msg.sender, newItemId);
            emit minted(msg.sender,newItemId);
            _setTokenURI(newItemId, tokenURI);
            setApprovalForAll(contractAddress, true);
            userOwnedTokens[msg.sender].push(newItemId);
            if (i < gold) {
                tokenIdsGold[i] = newItemId;
                goldTokenIds.push(newItemId);
            } else if (i < (gold + silver)) {
                tokenIdsSilver[i - gold] = newItemId;
                silverTokenIds.push(newItemId);
            } else {
                tokenIdsBronze[i - (gold + silver)] = newItemId;
                bronzeTokenIds.push(newItemId);
            }
        }
        content.authorAddr=msg.sender;
        content.tokenIds=tokenIdsGold;
        contents.push(content);
        content.tokenIds=tokenIdsSilver;
        contents.push(content);
        content.tokenIds=tokenIdsBronze;
        contents.push(content);
    }

    function handleMintFee(uint256 _totalFee) internal {
        uint256 ethSent = msg.value;
        address payable receiver = payable(msg.sender);
        require(ethSent >= _totalFee, "Insufficient eth sent to mint tokens");
        //return excess fee sent 
        if (_totalFee < ethSent) {
            receiver.transfer(ethSent - _totalFee);
        }
    }

    //function to get content index
    function getContentIndexByID(uint256 tokenId) public returns (uint256,uint256,bool) {
        uint256 i = 0;
        uint256 j = 0;
        for (i = 0; i < contents.length; i++) {
            for(j = 0;j < contents[i].tokenIds.length;j++){
                if(contents[i].tokenIds[j]==tokenId){
                    return (i,j,true);
                }
            } 
        }
        return (0,0,false);
    }


    function burnOffensiveContent(uint256 tokenId) external {
        uint256 contentID;
        uint256 IndexoftokenId;
        bool valid;
        (contentID, IndexoftokenId, valid) = getContentIndexByID(tokenId);
        if(valid){
            //If single mint content
            if(contents[contentID].tokenIds.length == 1){
                delete contents[contentID];
            }
            else{
            //Remove tokenId from toeknIds list array
            contents[contentID].tokenIds[IndexoftokenId] = contents[contentID].tokenIds[contents[contentID].tokenIds.length-1];
            contents[contentID].tokenIds.pop();
            }
        }
        super._burn(tokenId);
    }

    function getTokensOwnedByUser(address addr) public view returns (uint256[] memory){
        return userOwnedTokens[addr];
    }

    function getContentofToken(uint256 tokenId) public returns (Content memory content){
        uint256 contentID;
        uint256 IndexoftokenId;
        bool valid;
        (contentID, IndexoftokenId, valid) = getContentIndexByID(tokenId);
        require(valid == true, "Invalid tokenId or not minted yet");
        return contents[contentID];
    }

    function getContentOfUserbyIndex(address user) public returns (uint256[] memory){
        
        uint256 i = 0;
        while(i < contentIds.length){
            contentIds.pop();
        }
        
        uint256 totalToken = getTokensOwnedByUser(user).length;
        // uint256[] memory totalContentOwnedByIndex = new uint256[](contents.length);
        uint256 contentID;
        uint256 IndexoftokenId;
        bool isPresent;
        bool valid;
        uint256 j = 0;
        for (i = 0; i < totalToken; i++){
            (contentID, IndexoftokenId, valid) = getContentIndexByID(getTokensOwnedByUser(user)[i]);
            if( valid == true){
                isPresent = false;
                j = 0;
                while(contentIds.length > j){
                    if(contentIds[j] == contentID){
                        isPresent = true;
                        break;
                    }
                    j++;
                }
                if(isPresent == false){
                    contentIds.push(contentID);
                }
            }
        }
        //Return array of contentIds
        return contentIds;
    }

    function getContentbyIndexArray(uint256[] memory arr) public returns (uint256[] memory){
        
        uint256 i = 0;
        while(i < contentIds.length){
            contentIds.pop();
        }
        uint256 totalToken = arr.length;
        uint256 contentID;
        uint256 IndexoftokenId;
        bool isPresent = false;
        bool valid;
        uint256 j = 0;
        uint256 k = 0;
        for (i = 0; i < totalToken; i++){
            (contentID, IndexoftokenId, valid) = getContentIndexByID(arr[i]);
            if( valid == true){
                isPresent = false;
                j = 0;
                while(contentIds.length > j){
                    if(contentIds[j] == contentID){
                        isPresent = true;
                        break;
                    }
                    j++;
                }
                if(isPresent == false){
                    contentIds.push(contentID);
                }
            }
        }
        //Return array of contentIds
        return contentIds;
    }

    function getContentbyContentIndex(uint256 index) public view returns (Content memory content){
        require(index < contents.length, "Invalid index");
        return contents[index];
    }

    function getContentbyContentIndexArray(uint256[] memory contentIDs) public returns (Content[] memory){
        Content[] memory Contents = new Content[](contentIDs.length);
        for (uint256 i = 0; i < contentIDs.length; i++){
            Contents[i] = getContentbyContentIndex(contentIDs[i]);
        }
        return Contents;
    }

    function getContentsOfEachTokenType(string memory _tokentype) public returns (Content[] memory){
        uint256[] memory arrofContentIndex;
        if(keccak256(abi.encodePacked(_tokentype)) == keccak256(abi.encodePacked("gold"))){
            arrofContentIndex = getContentbyIndexArray(goldTokenIds);
        }
        else if(keccak256(abi.encodePacked(_tokentype)) == keccak256(abi.encodePacked("silver"))){
            arrofContentIndex = getContentbyIndexArray(silverTokenIds);
        }
        else if(keccak256(abi.encodePacked(_tokentype)) == keccak256(abi.encodePacked("bronz"))){
            arrofContentIndex = getContentbyIndexArray(bronzeTokenIds);
        }
        return getContentbyContentIndexArray(arrofContentIndex);
    }

    function getContentsByTokenTypeofUser(string memory _tokentype, address user) public returns (Content[] memory){
        // uint256[] memory arrofTokenIdsofUser;
        uint256 i = 0;
        // i = 0;
        while(i < contentIds.length){
            contentIds.pop();
        }
        uint256 j = 0;
        if(keccak256(abi.encodePacked(_tokentype)) == keccak256(abi.encodePacked("gold"))){
            for(i = 0; i < goldTokenIds.length; i++){
                if(ownerOf(goldTokenIds[i]) == msg.sender){
                    contentIds.push(goldTokenIds[i]);
                    j++;
                }
            }
        }
        else if(keccak256(abi.encodePacked(_tokentype)) == keccak256(abi.encodePacked("silver"))){
            for(i = 0; i < goldTokenIds.length; i++){
                j = 0;
                if(ownerOf(silverTokenIds[i]) == msg.sender){
                    contentIds.push(silverTokenIds[i]);
                    j++;
                }
            }
        }
        else if(keccak256(abi.encodePacked(_tokentype)) == keccak256(abi.encodePacked("bronze"))){
            for(i = 0; i < goldTokenIds.length; i++){
                j = 0;
                if(ownerOf(bronzeTokenIds[i]) == msg.sender){
                    contentIds.push(bronzeTokenIds[i]);
                    j++;
                }
            }
        }
        uint256[] memory arrofContentIndex = getContentbyIndexArray(contentIds);
        return getContentbyContentIndexArray(arrofContentIndex);
    }

    function addtoken(uint256 _tokenId, address buyer) external {
        userOwnedTokens[buyer].push(_tokenId);
    }

    function removetoken(uint256 _tokenId, address seller) external {
        uint256 index;
        for(uint256 i = 0; i< userOwnedTokens[seller].length; i++){
            if(userOwnedTokens[seller][i] == _tokenId){
                index = i;
                break;
            }
        }
        userOwnedTokens[seller][index] = userOwnedTokens[seller][userOwnedTokens[seller].length-1];
        userOwnedTokens[seller].pop();
    }
}