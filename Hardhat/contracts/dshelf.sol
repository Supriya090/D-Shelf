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
    mapping(address => uint256[]) public  userOwnedTokens;

    //mint fee of the tokens for each category
    mapping(TokenType=>uint256) internal mintingFee;

    //deployer address
    address public deployer;


    //details of each contents
    struct Content{
        uint256 tokenId;
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

    //List of minted contents
    Content[] public contents;

    mapping(uint256 => uint256) private priceOfToken;

//if book is listed for sale or not
    event ListedForSale(uint256 _tokenId, uint256 _sellingPrice);

//if the book is sold or not
    event TokenSold(
        uint256 _tokenId,
        uint256 _sellingPrice,
        address _buyer,
        address _seller
    );

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

//modifier to refund the excess value during transaction
    modifier refundExcess(uint256 _tokenId) {
        _;
        uint256 _price = priceOfToken[_tokenId];
        uint256 amountToRefund = msg.value - _price;

        //refund
        payable(msg.sender).transfer(amountToRefund);
    }

//reset token sale, price reset
    modifier resetTokenSale(uint256 _tokenId) {
        _;
        delete priceOfToken[_tokenId];
    }

    constructor(uint gold,uint silver, uint bronze) ERC721("Content", "Token")  {
        mintingFee[TokenType.GOLD]=gold;
        mintingFee[TokenType.SILVER] = silver;
        mintingFee[TokenType.BRONZE] = bronze;
        deployer=msg.sender;
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
     ContentType _contentType, string memory _author, uint256 _pubDate, string memory _coverHash) external payable
    {
        uint256 mintFee = mintingFee[_tokenType];
        uint256 tokenId = contents.length;

        handleMintFee(mintFee);
        contents.push(Content(tokenId,_tokenType,_contentType,_pubDate,_author,msg.sender,_ipfsHash,_coverHash,false,_description,price,false));
        
        //set the tokens owned by user
        userOwnedTokens[msg.sender].push(tokenId);
        
        _safeMint(msg.sender, tokenId);

        emit minted(msg.sender,tokenId);
    }

    function mintBatch(string memory _ipfsHash, string memory _description,ContentType _contentType, uint price, 
    string memory _author, uint256 _pubDate, string memory _coverHash, uint gold, uint silver, uint bronze)
        external 
    {
        uint256 mintFee =   mintingFee[TokenType.GOLD]*gold+
                            mintingFee[TokenType.SILVER]*silver+
                            mintingFee[TokenType.BRONZE]*bronze;
        // handleMintFee(mintFee);
        for(uint i=contents.length;i<(contents.length+gold);i++)
        {
            uint256 tokenId = i;
            contents.push(Content(tokenId,TokenType.GOLD,_contentType,_pubDate,_author,msg.sender,_ipfsHash,_coverHash,false,_description,price,false));
        
            //set the tokens owned by user
            userOwnedTokens[msg.sender].push(tokenId);
            _safeMint(msg.sender, tokenId);
            emit minted(msg.sender,tokenId);
        }
        for(uint i=contents.length;i<(contents.length+silver);i++)
        {
            uint256 tokenId = i;
            contents.push(Content(tokenId,TokenType.SILVER,_contentType,_pubDate,_author,msg.sender,_ipfsHash,_coverHash,false,_description,price,false));
            //set the tokens owned by user
            userOwnedTokens[msg.sender].push(tokenId);

            _safeMint(msg.sender, tokenId);
            emit minted(msg.sender,tokenId);
        }
        for(uint i=contents.length;i<(contents.length+bronze);i++)
        {
            uint256 tokenId = i;
            contents.push(Content(tokenId,TokenType.BRONZE,_contentType,_pubDate,_author,msg.sender,_ipfsHash,_coverHash,false,_description,price,false));
            //set the tokens owned by user
            userOwnedTokens[msg.sender].push(tokenId);

            _safeMint(msg.sender, tokenId);
            emit minted(msg.sender,tokenId);
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
        // contents.isBurnt=true;
    }

    function getTokensOwnedByUser(address addr) public view returns (uint256[] memory){
        return userOwnedTokens[addr];
    }

    function getContentofToken(uint256 tokenId) public view returns (Content memory content){
        require(contents[tokenId].isBurnt==false,"Content is burnt");
        return contents[tokenId];
    }

    // function getContentsOfUser(address addr) public view returns (Content[] memory){
    //     Content[userOwnedTokens[addr].length] memory userContents;
    //     for (uint i = 0;i<userOwnedTokens[addr].length;i++)
    //     {
    //         uint tokenId = userOwnedTokens[addr][i];
    //         if(contents[tokenId].isBurnt==false)
    //         {
    //             userContents[i]=contents[tokenId];
    //         }
    //     }

    //     return userContents;
    // }

    function getContentsOfEachTokenType(string memory _tokentype) public returns (Content[] memory){
        TokenType _token = _getTokenTypeId(_tokentype);
        Content[] memory reqdContents = new Content[] (contents.length);
        for (uint i = 0;i<contents.length;i++)
        {
            if(contents[i].isBurnt==false && contents[i].tokenType==_token)
            {
                reqdContents[i]=contents[i];
            }
        }

        return reqdContents;
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

        // send 85% of the transaction to the seller
        address payable _seller = payable(ownerOf(_tokenId));
        _seller.transfer((_price*17)/20);

        // send 10% of the transaction to the seller
        address payable AUTHOR = payable(contents[_tokenId].authorAddr);
        AUTHOR.transfer((_price)/10);

        // send 10% of the transaction to the seller
        address payable DEVELOPER = payable(deployer);
        AUTHOR.transfer((_price*1)/20);

        // tranfer NFT to the buyer
        safeTransferFrom(_seller, msg.sender, _tokenId);

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

    function removeFromSale(uint256 _tokenId) public OnlyTokenOwner(_tokenId, msg.sender){
        uint256 _price = priceOfToken[_tokenId];
        require(_price > 0, 'Err: token is not listed for sale');

        delete priceOfToken[_tokenId];
    }
  
}
