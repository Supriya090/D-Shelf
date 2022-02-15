import Header from '../components/Header';
import React, { useState, useEffect } from "react";
import "../App.css"
import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Write from '../components/Write';
import MarketPlace from '../components/MarketPlace';
import Collections from '../components/Collections';
import SinglePage from '../components/SinglePage';
import { ethers } from 'ethers'
import { bookAddress, bookAbi } from '../bookABI.js'
import { bookMarketAddress, bookMarketAbi } from '../bookmarketABI'



function App() {

  const [errorMessage, setErrorMessage] = useState(null);
  let defaultAccount = null;
  let bookContract = null;
  let marketContract = null;
  let provider = null;
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');

  //Please connect your account to the wallet first the click the button
  //If you have changed your account from wallet the click button again to refresh the defaultAccount
  const ConnectWalletHandler = async () => {
    if (window.ethereum && defaultAccount == null) {
      // set ethers provider
      provider = new ethers.providers.Web3Provider(window.ethereum);
      bookContract = new ethers.Contract(bookAddress, bookAbi, provider.getSigner());
      marketContract = new ethers.Contract(bookMarketAddress, bookMarketAbi, provider.getSigner());

      // connect to metamask
      await window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(function (result) {
          setConnButtonText('Wallet Connected');
          defaultAccount = result[0];
          console.log(defaultAccount);
        })
        .catch(error => {
          console.log(error);
        })

    } else if (!window.ethereum) {
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
    }
    console.log(defaultAccount);
  }
  //mint Batch as well as single book by passing values 
  //for single mint chose one of tokentypes and pass 1 to that value making others 0
  const mint = async (ContentMetadata, NoOfgold, NoOfSilver, NoOfBronze, Amount) => {
    ContentMetadata = {
      tokenIds: [],
      tokenType: 1,
      contentType: 1,
      publicationDate: 212112,
      author: "Rahul Shah",
      authorAddr: defaultAccount,
      coverImageHash: "Image",
      descriptionHash: "description"
    }
    NoOfgold = 10;
    NoOfSilver = 20;
    NoOfBronze = 30;
    Amount = "4.0";
    const tx = { value: ethers.utils.parseEther(Amount) }
    const transaction = await bookContract.mintBatch(ContentMetadata, NoOfgold, NoOfSilver, NoOfBronze);
    await transaction.wait();
    console.log("transaction :", transaction);
    console.log("Minted Successfully : ", await bookContract.balanceOf(defaultAccount));
  }

  //get index value of the book i.e. of contents[] array from token id
  const getContentindexfromToken = async (tokenIds) => {
    tokenIds = await bookContract.getTokensOwnedByUser(defaultAccount);
    const contentIndex = await bookContract.getContentIndexByID(tokenIds[0]);
    console.log("contentIndex : ", contentIndex);
  }

  //directly get content from token id
  const getContentByTokenId = async (tokenIds) => {
    tokenIds = await bookContract.getTokensOwnedByUser(defaultAccount);
    const content = await bookContract.getContentofToken(tokenIds[0]);

    // Can also be done by
    // const contentIndex = await bookContract.getContentIndexByID(tokenIds[0]);
    // const content = await getContentbyContentIndexArray(new Array("contentIndex"));

    console.log("content :", content);
  }

  //get all content by content index array
  //depriciation :  getAllContentsOfUser()
  //depriciation: getContentsOfEachTokenType(tokenType)
  const getContentbyitsIndices = async (indices) => {
    const totalcontentAvailable = await bookContract.getTotalContents();
    indices = Array.from({ length: totalcontentAvailable.toNumber() }, (_, i) => i + 1);
    let content = await bookContract.getContentbyContentIndexArray(indices);
    console.log("content :", content);

    //can also be used to get content by tokentypes id of gold silver and bronze by finding its content index
    // const totalgoldtokenAvailable = await bookContract.getTotalgoldTokens(); 
    // const goldContentsIndexAvailable = await bookContract.getContentbyTokensArray(totalgoldtokenAvailable);
    // const contents = await bookContract.getContentbyContentIndexArray(goldContentsIndexAvailable);
  }

  const getAllContentsOfUser = async () => {
    //depriciated because of getContentbyitsIndices()
    console.log("Owned Token Content : ", await bookContract.getAllContentsOfUser());
    //can also be done using getTokensOwnedByUser
    // const totalalltokenAvailable = await bookContract.getTokensOwnedByUser(defaultAccount); 
    // const getContentsIndexAvailable = await bookContract.getContentbyTokensArray(totalalltokenAvailable);
    // const contents = await bookContract.getContentbyContentIndexArray(getContentsIndexAvailable);
  }

  const getUserDataOfTokenType = async (tokenType) => {
    //depriciated because of getContentbyitsIndices()
    tokenType = "gold";
    let transaction = await bookContract.getContentsByTokenTypeofUser(tokenType, { from: defaultAccount });
    await transaction.wait();
    console.log("Gold :", transaction.events[0].args);

    tokenType = "silver";
    transaction = await bookContract.getContentsByTokenTypeofUser(tokenType, { from: defaultAccount });
    await transaction.wait();
    console.log("Silver :", transaction.events[0].args);

    tokenType = "bronze";
    transaction = await bookContract.getContentsByTokenTypeofUser(tokenType, { from: defaultAccount });
    await transaction.wait();
    console.log("Bronze :", transaction.events[0].args);

    //can also be done by filtering tokens in getTokensOwnedByUser and getTotalgoldTokens
  }

  const getDataOfTokenType = async (tokenType) => {
    //depriciated because of getContentbyitsIndices
    tokenType = "gold";
    let transaction = await bookContract.getContentsOfEachTokenType(tokenType)
    await transaction.wait();
    console.log("Gold :", transaction.events[0].args);

    tokenType = "silver";
    transaction = await bookContract.getContentsOfEachTokenType(tokenType)
    await transaction.wait();
    console.log("Silver :", transaction.events[0].args);

    tokenType = "bronz";
    transaction = await bookContract.getContentsOfEachTokenType(tokenType)
    await transaction.wait();
    console.log("Bronze :", transaction.events[0].args);//need correction in SC 
  }

  const getContents = async () => {
    console.log(defaultAccount);
  }


  useEffect(() => {
    if (defaultAccount) {
      provider.getBalance(defaultAccount)
        .then(balanceResult => {
          setUserBalance(ethers.utils.formatEther(balanceResult));
        })
    };
  }, [defaultAccount]);

  return (
    <div className="App">
      <Header
        userAccount={defaultAccount}
        userBalance={userBalance}
        ConnectWalletHandler={ConnectWalletHandler}
        errorMessage={errorMessage}
        connButtonText={connButtonText}
      />
      <Routes>
        <Route exact path="/" element={<Home
          bookContract={bookContract}
          marketContract={marketContract}
        />}></Route>
        <Route path="/MarketPlace" element={<MarketPlace
          bookContract={bookContract}
          marketContract={marketContract}
        />}></Route>
        <Route path="/myCollections" element={<Collections
          bookContract={bookContract}
          marketContract={marketContract}
        />}></Route>
        <Route exact path="/write" element={<Write
          mint={mint}
        />}></Route>
        <Route exact path="/singlePage" element={<SinglePage
          bookContract={bookContract}
          marketContract={marketContract}
        />}></Route>
      </Routes>
    </div>
  );
}

export default App;
