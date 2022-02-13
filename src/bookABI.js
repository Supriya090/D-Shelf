export const bookAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
export const bookAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "marketplaceAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "minted",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      }
    ],
    "name": "addtoken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "bronzeTokenIds",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "burnOffensiveContent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "contents",
    "outputs": [
      {
        "internalType": "enum book.TokenType",
        "name": "tokenType",
        "type": "uint8"
      },
      {
        "internalType": "enum book.ContentType",
        "name": "contentType",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "publicationDate",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "author",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "authorAddr",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "coverImageHash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "descriptionHash",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllContentsOfUser",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256[]",
            "name": "tokenIds",
            "type": "uint256[]"
          },
          {
            "internalType": "enum book.TokenType",
            "name": "tokenType",
            "type": "uint8"
          },
          {
            "internalType": "enum book.ContentType",
            "name": "contentType",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "publicationDate",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "author",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "authorAddr",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "coverImageHash",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "descriptionHash",
            "type": "string"
          }
        ],
        "internalType": "struct book.Content[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getContentIndexByID",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "contentIDs",
        "type": "uint256[]"
      }
    ],
    "name": "getContentbyContentIndexArray",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256[]",
            "name": "tokenIds",
            "type": "uint256[]"
          },
          {
            "internalType": "enum book.TokenType",
            "name": "tokenType",
            "type": "uint8"
          },
          {
            "internalType": "enum book.ContentType",
            "name": "contentType",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "publicationDate",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "author",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "authorAddr",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "coverImageHash",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "descriptionHash",
            "type": "string"
          }
        ],
        "internalType": "struct book.Content[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "arr",
        "type": "uint256[]"
      }
    ],
    "name": "getContentbyTokensArray",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getContentofToken",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256[]",
            "name": "tokenIds",
            "type": "uint256[]"
          },
          {
            "internalType": "enum book.TokenType",
            "name": "tokenType",
            "type": "uint8"
          },
          {
            "internalType": "enum book.ContentType",
            "name": "contentType",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "publicationDate",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "author",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "authorAddr",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "coverImageHash",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "descriptionHash",
            "type": "string"
          }
        ],
        "internalType": "struct book.Content",
        "name": "content",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_tokentype",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getContentsByTokenTypeofUser",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256[]",
            "name": "tokenIds",
            "type": "uint256[]"
          },
          {
            "internalType": "enum book.TokenType",
            "name": "tokenType",
            "type": "uint8"
          },
          {
            "internalType": "enum book.ContentType",
            "name": "contentType",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "publicationDate",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "author",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "authorAddr",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "coverImageHash",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "descriptionHash",
            "type": "string"
          }
        ],
        "internalType": "struct book.Content[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_tokentype",
        "type": "string"
      }
    ],
    "name": "getContentsOfEachTokenType",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256[]",
            "name": "tokenIds",
            "type": "uint256[]"
          },
          {
            "internalType": "enum book.TokenType",
            "name": "tokenType",
            "type": "uint8"
          },
          {
            "internalType": "enum book.ContentType",
            "name": "contentType",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "publicationDate",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "author",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "authorAddr",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "coverImageHash",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "descriptionHash",
            "type": "string"
          }
        ],
        "internalType": "struct book.Content[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "getTokensOwnedByUser",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalContents",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "goldTokenIds",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256[]",
            "name": "tokenIds",
            "type": "uint256[]"
          },
          {
            "internalType": "enum book.TokenType",
            "name": "tokenType",
            "type": "uint8"
          },
          {
            "internalType": "enum book.ContentType",
            "name": "contentType",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "publicationDate",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "author",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "authorAddr",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "coverImageHash",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "descriptionHash",
            "type": "string"
          }
        ],
        "internalType": "struct book.Content",
        "name": "content",
        "type": "tuple"
      },
      {
        "internalType": "uint256",
        "name": "gold",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "silver",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "bronze",
        "type": "uint256"
      }
    ],
    "name": "mintBatch",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "seller",
        "type": "address"
      }
    ],
    "name": "removetoken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "silverTokenIds",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "userOwnedTokens",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]