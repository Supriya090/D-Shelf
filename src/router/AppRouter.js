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

  let defaultAccount = null;
  let bookContract = null;
  let marketContract = null;
  let provider = null;
  let signer = null;
  const [errorMessage, setErrorMessage] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');

  //Please connect your account to the wallet first the click the button
  //If you have changed your account from wallet the click button again to refresh the defaultAccount
  const ConnectWalletHandler = async () => {
    if (typeof window.ethereum !== undefined) {
      // set ethers provider
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      bookContract = new ethers.Contract(bookAddress, bookAbi, signer);
      marketContract = new ethers.Contract(bookMarketAddress, bookMarketAbi, signer);

      // connect to metamask
      await window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(function (result) {
          setErrorMessage(null);
          setConnButtonText('Wallet Connected');
          defaultAccount = result[0];
          bookContract.connect(defaultAccount);
          marketContract.connect(defaultAccount);
        })
        .catch(error => {
          console.log(error);
        })

    } else {
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
    }
  }

  const setup = () => {
    return new Promise((resolve, reject) => {
      ConnectWalletHandler()
        .then(() => {
          // const list = Promise.all([ defaultAccount, bookContract, marketContract, provider, signer ])
          const list = [defaultAccount, bookContract, marketContract, provider, signer]
          resolve(list);
        })
      .catch(error => {
        reject(error);
      })
    })
  }

  //TODO Need some work so that we can view in Home even if dont have any metamask
  const unSetup = () => {
    return new Promise((resolve, reject) => {
      if (typeof window.ethereum !== undefined) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        bookContract = new ethers.Contract(bookAddress, bookAbi, signer);
        marketContract = new ethers.Contract(bookMarketAddress, bookMarketAbi, signer);
        bookContract.connect("0x0");
        marketContract.connect("0x0");
        const list = [bookContract, marketContract, provider, signer]
        resolve(list);
      }
      else {
        console.log('Please install MetaMask browser extension to interact');
        reject(Error('Need to install MetaMask'));
      }
    })
  }

  //get index value of the book i.e. of contents[] array from token id
  const getContentindexfromToken = async (tokenIds) => {
    tokenIds = await bookContract.getTokensOwnedByUser(defaultAccount);
    const contentIndex = await bookContract.getContentIndexByID(tokenIds[0]);
    console.log("From getContentindexfromToken() / contentIndex : ", contentIndex);
  }

  //directly get content from token id
  const getContentByTokenId = async (tokenIds) => {
    tokenIds = await bookContract.getTokensOwnedByUser(defaultAccount);
    console.log("From getContentByTokenId() / tokenIds : ", tokenIds);
    const content = await bookContract.getContentofToken(tokenIds[0]);
    console.log("content of tokenId[0]", content);

    // Can also be done by
    // const contentIndex = await bookContract.getContentIndexByID(tokenIds[0]);
    // const content = await getContentbyContentIndexArray(new Array("contentIndex"));

    // console.log("content :", content);
  }

  //get all content by content index array
  //depriciation :  getAllContentsOfUser()
  //depriciation: getContentsOfEachTokenType(tokenType)
  const getContentbyitsIndices = async (indices) => {
    const totalcontentAvailable = await bookContract.getTotalContents();
    indices = [];
    //Please Note that first content is empty i.e content starts at index 1 so do apply for tokenIds
    for (let i = 1; i < totalcontentAvailable.toNumber(); i++) {
      indices.push(i);
    }
    console.log(indices);
    let content = await bookContract.getContentbyContentIndexArray(indices);
    console.log("From getContentbyitsIndices() / content :", content);

    //can also be used to get content by tokentypes id of gold silver and bronze by finding its content index
    // const totalgoldtokenAvailable = await bookContract.getTotalgoldTokens(); 
    // const goldContentsIndexAvailable = await bookContract.getContentbyTokensArray(totalgoldtokenAvailable);
    // const contents = await bookContract.getContentbyContentIndexArray(goldContentsIndexAvailable);
  }

  useEffect(() => {
    async function OnWalletChange() {
      window.ethereum.on('accountsChanged', function (accounts) {
        // Time to reload your interface with accounts[0]!
        // console.log("accountsChanged :", accounts[0]);
        setConnButtonText('Wallet Changed');
        setErrorMessage('Click button to refresh contents');
      })
    }
    OnWalletChange();
    if (defaultAccount && connButtonText === 'Wallet Connected') {
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
        setup={setup}
        errorMessage={errorMessage}
        connButtonText={connButtonText}
      />

      <Routes>
        <Route exact path="/" element={<Home unSetup={unSetup} />}></Route>
        <Route path="/MarketPlace" element={<MarketPlace unSetup={unSetup} />}></Route>
        <Route path="/myCollections" element={<Collections connButtonText={connButtonText} setup={setup} />}></Route>
        <Route exact path="/write" element={<Write connButtonText={connButtonText} setup={setup} />}></Route>
        <Route exact path="/singlePage" element={<SinglePage setup={setup} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
