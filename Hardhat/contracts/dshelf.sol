// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/utils/Counters.sol";

contract dshelf is ERC721, Ownable, ERC721Burnable {
    using Counters for Counters.Counter;
    Counters.Counter private TokenIds;
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


    //details of each contents
    struct Content{
        uint256[] tokenId;
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
    // uint256 private totalContents;

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
        uint256 _price = priceOfToken[_tokenId];
        uint256 amountToRefund = msg.value - _price;

        //refund
        payable(msg.sender).transfer(amountToRefund);
        _;
    }

//reset token sale, price reset
    modifier resetTokenSale(uint256 _tokenId) {
        delete priceOfToken[_tokenId];
        _;
    }

    constructor(uint256 gold,uint256 silver, uint256 bronze) ERC721("Content", "Token")  {
        mintingFee[TokenType.GOLD]=gold;
        mintingFee[TokenType.SILVER] = silver;
        mintingFee[TokenType.BRONZE] = bronze;
        deployer=msg.sender;
    }

    function _getContentTypeId(string memory _contentType) public view returns (ContentType) {
        if (keccak256(abi.encodePacked(_contentType)) == keccak256(abi.encodePacked("Fiction"))) return ContentType.Fiction;
        if (keccak256(abi.encodePacked(_contentType)) == keccak256(abi.encodePacked("Non-Fiction"))) return ContentType.NonFiction;
        if (keccak256(abi.encodePacked(_contentType)) == keccak256(abi.encodePacked("Informative"))) return ContentType.Informative;
        if (keccak256(abi.encodePacked(_contentType)) == keccak256(abi.encodePacked("Text"))) return ContentType.Text;
        if (keccak256(abi.encodePacked(_contentType)) == keccak256(abi.encodePacked("Novel"))) return ContentType.Novel;
        if (keccak256(abi.encodePacked(_contentType)) == keccak256(abi.encodePacked("Romantic"))) return ContentType.Romantic;
        return ContentType.Other;
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
     ContentType _contentType, string memory _author, uint256 _pubDate, string memory _coverHash) public payable
    {
        TokenIds.increment();
        uint256 mintFee = mintingFee[_tokenType];
        uint256 tokenId = TokenIds.current();
        uint256[] memory tokenIds = new uint256[](1);
        tokenIds[0] = tokenId;

        handleMintFee(mintFee);
        contents.push(Content(tokenIds,_tokenType,_contentType,_pubDate,_author,msg.sender,_ipfsHash,_coverHash,false,_description,price,false));
        
        //set the tokens owned by user
        userOwnedTokens[msg.sender].push(tokenId);
        
        _safeMint(msg.sender, tokenId);

        emit minted(msg.sender,tokenId);
    }

    // function mintGold() internal
    //     function mintApe(uint numberOfTokens) public payable {
    //     require(saleIsActive, "Sale must be active to mint Ape");
    //     require(numberOfTokens <= maxApePurchase, "Can only mint 20 tokens at a time");
    //     require(totalSupply().add(numberOfTokens) <= MAX_APES, "Purchase would exceed max supply of Apes");
    //     require(apePrice.mul(numberOfTokens) <= msg.value, "Ether value sent is not correct");
        
    //     for(uint i = 0; i < numberOfTokens; i++) {
    //         uint mintIndex = totalSupply();
    //         if (totalSupply() < MAX_APES) {
    //             _safeMint(msg.sender, mintIndex);
    //         }
    //     }

    //     // If we haven't set the starting index and this is either 1) the last saleable token or 2) the first token to be sold after
    //     // the end of pre-sale, set the starting index block
    //     if (startingIndexBlock == 0 && (totalSupply() == MAX_APES || block.timestamp >= REVEAL_TIMESTAMP)) {
    //         startingIndexBlock = block.number;
    //     } 
    // }


    function mintBatch(string memory _ipfsHash, string memory _description,ContentType _contentType, uint price, 
    string memory _author, uint256 _pubDate, string memory _coverHash, uint gold, uint silver, uint bronze)
        external payable
    {
        TokenIds.increment();
        uint256 mintFee =   mintingFee[TokenType.GOLD]*gold+
                            mintingFee[TokenType.SILVER]*silver+
                            mintingFee[TokenType.BRONZE]*bronze;
        handleMintFee(mintFee);

        uint256 tokenIdRef = TokenIds.current();
        uint256 i = 0;
        for (i = 0; i < (gold + silver + bronze); i++) {
            TokenIds.increment();
            uint256 tokenId = TokenIds.current();
            // contents.push(Content(tokenId,TokenType.GOLD,_contentType,_pubDate,_author,msg.sender,_ipfsHash,_coverHash,false,_description,price,false));
            // userOwnedTokens[msg.sender].push(tokenId);
            _safeMint(msg.sender, tokenId);
        }
        uint256[] memory tokenIdsGold = new uint256[](gold);
        for(i = 0; i < gold; i++) {
            userOwnedTokens[msg.sender].push(tokenIdRef);
            tokenIdsGold[i] = tokenIdRef;
            tokenIdRef++;
        }
        contents.push(Content(tokenIdsGold,TokenType.GOLD,_contentType,_pubDate,_author,msg.sender,_ipfsHash,_coverHash,false,_description,price,false));
        
        uint256[] memory tokenIdsSilver = new uint256[](silver);
        for(i = 0; i < silver; i++) {
            userOwnedTokens[msg.sender].push(tokenIdRef);
            tokenIdsGold[i] = tokenIdRef;
            tokenIdRef++;
        }
        contents.push(Content(tokenIdsSilver,TokenType.SILVER,_contentType,_pubDate,_author,msg.sender,_ipfsHash,_coverHash,false,_description,price,false));
        
        uint256[] memory tokenIdsBronze = new uint256[](bronze);
        for(i = 0; i < bronze; i++) {
            userOwnedTokens[msg.sender].push(tokenIdRef);
            tokenIdsBronze[i] = tokenIdRef;
            tokenIdRef++;
        }
        contents.push(Content(tokenIdsBronze,TokenType.BRONZE,_contentType,_pubDate,_author,msg.sender,_ipfsHash,_coverHash,false,_description,price,false));
        

        // for(uint i=contents.length;i<(contents.length+gold);i++)
        // {
        //     uint256 tokenId = i;

        //     contents.push(Content(tokenId,TokenType.GOLD,_contentType,_pubDate,_author,msg.sender,_ipfsHash,_coverHash,false,_description,price,false));
        
        //     //set the tokens owned by user
        //     userOwnedTokens[msg.sender].push(tokenId);
            
        //     _safeMint(msg.sender, tokenId);
        //     emit minted(msg.sender,tokenId);
            
        // }
        // for(uint i=contents.length;i<(contents.length+silver);i++)
        // {
        //     uint256 tokenId = i;
        //     contents.push(Content(tokenId,TokenType.SILVER,_contentType,_pubDate,_author,msg.sender,_ipfsHash,_coverHash,false,_description,price,false));
        //     //set the tokens owned by user
        //     userOwnedTokens[msg.sender].push(tokenId);

        //     _safeMint(msg.sender, tokenId);
        //     emit minted(msg.sender,tokenId);
        // }
        // for(uint i=contents.length;i<(contents.length+bronze);i++)
        // {
        //     uint256 tokenId = i;
        //     contents.push(Content(tokenId,TokenType.BRONZE,_contentType,_pubDate,_author,msg.sender,_ipfsHash,_coverHash,false,_description,price,false));
        //     //set the tokens owned by user
        //     userOwnedTokens[msg.sender].push(tokenId);

        //     _safeMint(msg.sender, tokenId);
        //     emit minted(msg.sender,tokenId);
        // }
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
        Content[] memory readContents;
        uint256 j = 0;
        for (uint i = 0;i<contents.length;i++)
        {
            if(contents[i].isBurnt==false && contents[i].tokenType==_token)
            {
                readContents[j] = contents[i];
                j++;
            }
        }

        return readContents;
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
        refundExcess(_tokenId)
    {
        uint256 _price = priceOfToken[_tokenId];
        require(msg.sender!=super.ownerOf(_tokenId), "Err: Seller Should not be Buyer");
        require(msg.value >= _price, 'Err: value sent insufficent to buy');
        require(_price > 0, 'Err: token is not listed for sale');

        // send 85% of the transaction to the seller
        address payable _seller = payable(ownerOf(_tokenId));
        _seller.transfer((_price*17)/20);

        // send 10% of the transaction to the seller
        address payable AUTHOR = payable(contents[_tokenId].authorAddr);
        AUTHOR.transfer((_price)/10);

        // send 5% of the transaction to the developer
        address payable DEVELOPER = payable(deployer);
        DEVELOPER.transfer((_price*1)/20);

        // tranfer NFT to the buyer
        safeTransferFrom(_seller, msg.sender, _tokenId);

        emit TokenSold(_tokenId, _price, msg.sender, _seller);
        delete priceOfToken[_tokenId];
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