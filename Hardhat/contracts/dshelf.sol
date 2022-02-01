// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DShelf is ERC721, Ownable, ERC721Burnable {
    //token type of the the NFT
    enum TokenType{GOLD, SILVER, BRONZE}

    //Type of the content
    enum ContentType{BOOK, BLOG, POEM, PAPER, LYRICS, STORY, OTHERS}

    //user address => list of user owned tokens
    mapping(address => uint256 []) public  userOwnedTokens;

    //mint fee of the tokens for each category
    mapping(TokenType=>mapping(ContentType=>uint256)) internal mintingFee;

    constructor(uint[][] fee) ERC721("Content", "Token")  {
        mintingFee[TokenType.GOLD][ContentType.BOOK]=fee[0][0];
        mintingFee[TokenType.GOLD][ContentType.BLOG]=fee[1][0];
        mintingFee[TokenType.GOLD][ContentType.POEM]=fee[2][0];
        mintingFee[TokenType.GOLD][ContentType.PAPER]=fee[3][0];
        mintingFee[TokenType.GOLD][ContentType.LYRICS]=fee[4][0];
        mintingFee[TokenType.GOLD][ContentType.STORY]=fee[5][0];
        mintingFee[TokenType.GOLD][ContentType.OTHERS]=fee[6][0];

        mintingFee[TokenType.SILVER][ContentType.BOOK]=fee[0][1];
        mintingFee[TokenType.SILVER][ContentType.BLOG]=fee[1][1];
        mintingFee[TokenType.SILVER][ContentType.POEM]=fee[2][1];
        mintingFee[TokenType.SILVER][ContentType.PAPER]=fee[3][1];
        mintingFee[TokenType.SILVER][ContentType.LYRICS]=fee[4][1];
        mintingFee[TokenType.SILVER][ContentType.STORY]=fee[5][1];
        mintingFee[TokenType.SILVER][ContentType.OTHERS]=fee[6][1];

        mintingFee[TokenType.BRONZE][ContentType.BOOK]=fee[0][2];
        mintingFee[TokenType.BRONZE][ContentType.BLOG]=fee[1][2];
        mintingFee[TokenType.BRONZE][ContentType.POEM]=fee[2][2];
        mintingFee[TokenType.BRONZE][ContentType.PAPER]=fee[3][2];
        mintingFee[TokenType.BRONZE][ContentType.LYRICS]=fee[4][2];
        mintingFee[TokenType.BRONZE][ContentType.STORY]=fee[5][2];
        mintingFee[TokenType.BRONZE][ContentType.OTHERS]=fee[6][2];
    }

    //details of each contents
    struct Content{
        uint256 tokenId;
        TokenType tokenType;
        ContentType contentType;
        uint256 publicationDate;
        string author;
        string ipfsHash;
        string coverImageHash;
        bool onBid;
        string descriptionHash;
        uint256 Price;
        bool isBurnt;
    }

    //List of minted contents
    Content[] public contents;

    function _getContentTypeId(string memory _contentType) public view returns (ContentType) {
        if (keccak256(abi.encodePacked(_contentType)) == keccak256(abi.encodePacked("poem"))) return ContentType.POEM;
        if (keccak256(abi.encodePacked(_contentType)) == keccak256(abi.encodePacked("blog"))) return ContentType.BLOG;
        if (keccak256(abi.encodePacked(_contentType)) == keccak256(abi.encodePacked("story"))) return ContentType.STORY;
        if (keccak256(abi.encodePacked(_contentType)) == keccak256(abi.encodePacked("lyrics"))) return ContentType.LYRICS;
        if (keccak256(abi.encodePacked(_contentType)) == keccak256(abi.encodePacked("books"))) return ContentType.BOOK;
        if (keccak256(abi.encodePacked(_contentType)) == keccak256(abi.encodePacked("paper"))) return ContentType.PAPER;
        return ContentType.OTHERS;
    }

    // function _getContentTypeIds(string[] memory _contentTypes) public view returns (ContentType[] memory) {
    //     uint256 i = 0;
    //     ContentType[] memory _contentTypeIds = new ContentType[](_contentTypes.length);
    //     for (i = 0; i < _contentTypes.length; i++) {
    //         _contentTypeIds[i] = _getContentTypeId(_contentTypes[i]);
    //     }
    //     return _contentTypeIds;
    // }

    function _getTokenTypeId(string memory _tokenType) public view returns (TokenType) {
        if (keccak256(abi.encodePacked(_tokenType)) == keccak256(abi.encodePacked("gold"))) return TokenType.GOLD;
        if (keccak256(abi.encodePacked(_tokenType)) == keccak256(abi.encodePacked("silver"))) return TokenType.SILVER;
        if (keccak256(abi.encodePacked(_tokenType)) == keccak256(abi.encodePacked("bronze"))) return TokenType.BRONZE;
    }

    // function _getTokenTypeIds(string[] memory _tokenTypes) public view returns (TokenType[] memory) {
    //     uint256 i = 0;
    //     TokenType[] memory _tokenTypeIds = new TokenType[](_tokenTypes.length);
    //     for (i = 0; i < _tokenTypes.length; i++) {
    //         _tokenTypeIds[i] = TokenType(_tokenTypes[i]);
    //     }
    //     return _tokenTypeIds;
    // }


    function mint(string memory _ipfsHash, string memory _description, TokenType _tokenType,uint price,
     ContentType _contentType, string memory _author, uint256 _pubdate, string memory _coverHash) external payable
    {
        uint256 mintFee = mintingFee[_tokenType][_contentType];
        uint256 tokenId = contents.length;

        handleMintFee(mintFee);
        contents.push(Content(tokenId,_tokenType,_contentType,_pubDate,_author,_ipfsHash,_coverHash,false,_descriptionHash,price,false));
        
        //set the tokens owned by user
        userOwnedTokens[msg.sender].push(tokenId);
        
        _safeMint(msg.sender, tokenId);
    }

    function mintBatch(string memory _ipfsHash, string memory _description,ContentType _contentType, uint price, 
    string memory _author, uint256 _pubdate, string memory _coverHash, uint gold, uint silver, uint bronze)
        external payable
    {
        uint256 mintFee =   mintingFee[TokenType.GOLD][_contentType]*gold+
                            mintingFee[TokenType.SILVER][_contentType]*silver+
                            mintingFee[TokenType.BRONZE][_contentType]*bronze;
        uint256 tokenId = i;
        handleMintFee(mintFee);
        for(int i=contents.length;i<(content.length+gold);i++)
        {
            uint256 tokenId = i;
            contents.push(Content(tokenId,TokenType.GOLD,_contentType,_pubDate,_author,_ipfsHash,_coverHash,false,_descriptionHash,price,false));
        
            //set the tokens owned by user
            userOwnedTokens[msg.sender].push(tokenId);
            _safeMint(msg.sender, tokenId);
        }
        for(int i=contents.length;i<(content.length+silver);i++)
        {
            uint256 tokenId = i;
            contents.push(Content(tokenId,TokenType.SILVER,_contentType,_pubDate,_author,_ipfsHash,_coverHash,false,_descriptionHash,price,false));
            //set the tokens owned by user
            userOwnedTokens[msg.sender].push(tokenId);

            _safeMint(msg.sender, tokenId);
        }
        for(int i=contents.length;i<(content.length+bronze);i++)
        {
            uint256 tokenId = i;
            contents.push(Content(tokenId,TokenType.BRONZE,_contentType,_pubDate,_author,_ipfsHash,_coverHash,false,_descriptionHash,price,false));
            //set the tokens owned by user
            userOwnedTokens[msg.sender].push(tokenId);

            _safeMint(msg.sender, tokenId);
        }
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

    function burnOffensiveContent(uint256 tokenId) external {
        super._burn(tokenId);
        contents.isBurnt=true;
    }

    function getTokensOwnedByUser(address addr) public view returns (uint256[]){
        return userOwnedTokens[addr];
    }

    function getContentofToken(uint256 tokenId) public view returns (Content content){
        require(contents[tokenId].isBurnt==false,"Content is burnt");
        return contents[tokenId];
    }

    function getContentsOfUser(address addr) public view returns (Content[]){
        Content[userOwnedTokens[addr].length] memory userContents;
        for (uint i = 0;i<userOwnedTokens[addr].length;i++)
        {
            uint tokenId = userOwnedTokens[addr][i];
            if(contents[tokenId].isBurnt==false)
            {
                userContents[i]=contents[tokenId];
            }
        }

        return userContents;
    }

    function getContentsOfEachTokenType(string _tokentype) public returns (Content[]){
        TokenType _token = _getTokenTypeId(_tokentype);
        Content[] memory reqdContents = new Content[] (contents.length);
        for (uint i = 0;i<contents.length;i++)
        {
            if(contents[i].isBurnt==false && contents[i].tokenType=_token)
            {
                reqdContents[i]=contents[i];
            }
        }

        return reqdContents;
    }




    











  
}
