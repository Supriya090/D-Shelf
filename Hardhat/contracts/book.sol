// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract book is ERC721 {

    //token type of the the NFT
    enum TokenType{GOLD, SILVER, BRONZE}

    //Type of the content
    enum ContentType{Other,Fiction, NonFiction, Informative, Text, Novel, Romantic}

    //user address => list of user owned tokens
    mapping(address => uint256 []) public  userOwnedTokens;

    //mint fee of the tokens for each category
    mapping(TokenType=>uint256) internal mintingFee;
   
    //list of gold tokens
    uint256[] public goldTokenIds;

    //list of silver tokens
    uint256[] public silverTokenIds;

    //list of bronze tokens
    uint256[] public bronzeTokenIds;


    //details of each contents
    struct Content{
        string title;
        uint256[] tokenIds;
        TokenType tokenType;
        ContentType contentType;
        uint256 publicationDate;
        string author;
        address authorAddr;
        string coverImageHash;
        string descriptionHash;
        string description;
    }

    //list of all the contents
    Content[] public contents;

    //if the token is minted 
    event minted(
        address _address,
        uint256 _tokenId
    );

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address payable developer;

    address contractAddress;

    constructor(address marketplaceAddress) ERC721("BookNFT", "Content") {
        contractAddress = marketplaceAddress;

        mintingFee[TokenType.GOLD]= 0.003 ether;
        mintingFee[TokenType.SILVER] = 0.002 ether;
        mintingFee[TokenType.BRONZE] = 0.001 ether;

        developer = payable(msg.sender);
        Content memory content = Content("", new uint256[](0), TokenType.GOLD, ContentType.Other, block.timestamp, "", developer, "", "","");
        contents.push(content);
    }

    function mintBatch(Content memory content,uint gold, uint silver, uint bronze) external payable {
        uint256 mintFee =   mintingFee[TokenType.GOLD]*gold+
                            mintingFee[TokenType.SILVER]*silver+
                            mintingFee[TokenType.BRONZE]*bronze;
        
        require(msg.value >= mintFee, "Insufficient eth sent to mint tokens");

        bool sent;
        bytes memory data;
        (sent, data) = developer.call{value: mintFee}("");
        require(sent, "Failed to send Ether");
        //return excess fee sent
        address payable sender = payable(msg.sender);
        if (mintFee < msg.value) {
            (sent, data) = sender.call{value: msg.value - mintFee}("");
            require(sent, "Failed to return excess Ether");

        }

        uint256[] memory tokenIdsGold = new uint256[](gold);
        uint256[] memory tokenIdsSilver = new uint256[](silver);
        uint256[] memory tokenIdsBronze = new uint256[](bronze);
        for (uint256 i = 0; i < (gold + silver + bronze); i++) {
            _tokenIds.increment();
            uint256 newItemId = _tokenIds.current();
            _mint(msg.sender, newItemId);
            emit minted(msg.sender,newItemId);
            // _setTokenURI(newItemId, tokenURI);
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
        if(gold>0){
            content.tokenType=TokenType.GOLD;
            content.tokenIds=tokenIdsGold;
            contents.push(content);
        }
        if(silver>0){
            content.tokenType=TokenType.SILVER;
            content.tokenIds=tokenIdsSilver;
            contents.push(content);
        }
        if(bronze>0){
            content.tokenType=TokenType.BRONZE;
            content.tokenIds=tokenIdsBronze;
            contents.push(content);
        }
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

    //view functions
    function getContentIndexByID(uint256 tokenId) public view returns (uint256,uint256,bool) {
        for (uint i = 0; i < contents.length; i++) {
            for(uint j = 0;j < contents[i].tokenIds.length;j++){
                if(contents[i].tokenIds[j]==tokenId){
                    return (i,j,true);
                }
            } 
        }
        return (0,0,false);
    }


    function getTokensOwnedByUser(address addr) public view returns (uint256[] memory){
        return userOwnedTokens[addr];
    }

    function getTotalContents() external view returns (uint256){
        return contents.length;
    } 

/*

    function getTotalgoldTokens() external view returns (uint256[] memory){
        return goldTokenIds;
    }
    function getTotalsilverTokens() external view returns (uint256[] memory){
        return silverTokenIds;
    }
    function getTotalbronzeTokens() external view returns (uint256[] memory){
        return bronzeTokenIds;
    }

*/

    function getContentofToken(uint256 tokenId) public view returns (Content memory content){
        uint256 contentID;
        uint256 IndexoftokenId;
        bool valid;
        (contentID, IndexoftokenId, valid) = getContentIndexByID(tokenId);
        require(valid == true, "Invalid tokenId or not minted yet");
        return contents[contentID];
    }

    function getContentbyContentIndexArray(uint256[] memory contentIDs) public view returns (Content[] memory){
        Content[] memory Contents = new Content[](contentIDs.length);
        for (uint256 i = 0; i < contentIDs.length; i++){
            require(contentIDs[i] < contents.length, "Invalid index");
            Contents[i] = contents[contentIDs[i]];
        }
        return Contents;
    }

    function getAllContentsOfUser() external view returns (Content[] memory){

        uint256 totalToken = userOwnedTokens[msg.sender].length;

        uint256[] memory PsudocontentIds = new uint256[](contents.length);
        uint256 contentID;
        bool isPresent;
        bool valid;
        uint256 k = 0;
        for (uint i = 0; i < totalToken; i++){

            (contentID,, valid) = getContentIndexByID(userOwnedTokens[msg.sender][i]);

            if( valid == true){
                isPresent = false;
                for(uint j = 0; j < k; j++){
                    if(PsudocontentIds[j] == contentID){
                        isPresent = true;
                        break;
                    }
                }
                if(isPresent == false){
                    PsudocontentIds[k] = contentID;
                    k++;
                }
            }
        }
        uint256 [] memory contentIds = new uint256[](k);
        for (uint i = 0; i < k; i++){
            contentIds[i] = PsudocontentIds[i];
        }
        //Return array of contentIds
        return getContentbyContentIndexArray(contentIds);
    }

    function getContentbyTokensArray(uint256[] memory arr) public view returns (uint256[] memory){
        uint256[] memory PsudocontentIds = new uint256[](contents.length);
        uint256 totalToken = arr.length;
        uint256 contentID;
        bool isPresent = false;
        bool valid;
        uint256 k = 0;
        for (uint i = 0; i < totalToken; i++){
            (contentID,, valid) = getContentIndexByID(arr[i]);
            if( valid == true){
                isPresent = false;
                for(uint j = 0; j < k; j++){
                    if(PsudocontentIds[j] == contentID){
                        isPresent = true;
                        break;
                    }
                }
                if(isPresent == false){
                    PsudocontentIds[k] = contentID;
                    k++;
                }
            }
        }
        uint256 [] memory contentIds = new uint256[](k);
        for (uint i = 0; i < k; i++){
            contentIds[i] = PsudocontentIds[i];
        }
        //Return array of contentIds
        return contentIds;
    }

    function getContentsOfEachTokenType(string memory _tokentype) external view returns (Content[] memory){
        uint256[] memory arrofContentIndex;
        if(keccak256(abi.encodePacked(_tokentype)) == keccak256(abi.encodePacked("gold"))){
            arrofContentIndex = getContentbyTokensArray(goldTokenIds);
        }
        else if(keccak256(abi.encodePacked(_tokentype)) == keccak256(abi.encodePacked("silver"))){
            arrofContentIndex = getContentbyTokensArray(silverTokenIds);
        }
        else if(keccak256(abi.encodePacked(_tokentype)) == keccak256(abi.encodePacked("bronze"))){
            arrofContentIndex = getContentbyTokensArray(bronzeTokenIds);
        }
        return getContentbyContentIndexArray(arrofContentIndex);
    }

    function getContentsByTokenTypeofUser(string memory _tokentype, address user) external view returns (Content[] memory){
        uint256 i = 0;
        uint256 k = 0;
        uint256 [] memory PsudoTokenIds = new uint256[](userOwnedTokens[user].length);
        if(keccak256(abi.encodePacked(_tokentype)) == keccak256(abi.encodePacked("gold"))){
            for(i = 0; i < goldTokenIds.length; i++){
                if(ownerOf(goldTokenIds[i]) == msg.sender){
                    PsudoTokenIds[k] = goldTokenIds[i];
                    k++;
                }
            }
        }
        else if(keccak256(abi.encodePacked(_tokentype)) == keccak256(abi.encodePacked("silver"))){
            for(i = 0; i < silverTokenIds.length; i++){
                if(ownerOf(silverTokenIds[i]) == msg.sender){
                    PsudoTokenIds[k] = silverTokenIds[i];
                    k++;
                }
            }
        }
        else if(keccak256(abi.encodePacked(_tokentype)) == keccak256(abi.encodePacked("bronze"))){
            for(i = 0; i < bronzeTokenIds.length; i++){
                if(ownerOf(bronzeTokenIds[i]) == msg.sender){
                    PsudoTokenIds[k] = bronzeTokenIds[i];
                    k++;
                }
            }
        }
        uint256 [] memory contentIds = new uint256[](k);
        for (i = 0; i < k; i++){
            contentIds[i] = PsudoTokenIds[i];
        }
        uint256[] memory arrofContentIndex = getContentbyTokensArray(contentIds);
        return getContentbyContentIndexArray(arrofContentIndex);
    }

    function addtoken(uint256 _tokenId, address buyer) external {
        userOwnedTokens[buyer].push(_tokenId);
    }

    function removetoken(uint256 _tokenId, address seller) external {
        for(uint256 i = 0; i< userOwnedTokens[seller].length; i++){
            if(userOwnedTokens[seller][i] == _tokenId){
                userOwnedTokens[seller][i] = userOwnedTokens[seller][userOwnedTokens[seller].length-1];
                userOwnedTokens[seller].pop();
                break;
            }
        }
    }
}