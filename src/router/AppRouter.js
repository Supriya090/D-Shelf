import Header from '../components/Header';
import React, { useState, useEffect } from "react";
import "../App.css"
import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Write from '../components/Write';
import MarketPlace from '../components/MarketPlace';
import Collections from '../components/Collections';
import SinglePage from '../components/SinglePage';
import {ethers} from 'ethers'
import {bookAddress ,bookAbi} from '../bookABI.js'
import {bookMarketAddress,bookMarketAbi} from '../bookmarketABI'



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
        await window.ethereum.request({ method: 'eth_requestAccounts'})
        .then( function(result) {
          setErrorMessage(null);
          setConnButtonText('Wallet Connected');
          defaultAccount = result[0];
          mint();
        })
        .catch(error => {
          console.log(error);
        })
        
      } else {
        console.log('Need to install MetaMask');
        setErrorMessage('Please install MetaMask browser extension to interact');
      }
  }
  //mint Batch as well as single book by passing values 
  //for single mint chose one of tokentypes and pass 1 to that value making others 0
  const mint = async()=>{
    let ContentMetadata = {
      tokenIds:[],
      tokenType : 1,
      contentType : 1,
      publicationDate:212112,
      author:"Rahul Shah",
      authorAddr: defaultAccount,
      coverImageHash: "Image",
      descriptionHash : "description"
    }
    let NoOfgold = 1;
    let NoOfSilver = 2;
    let NoOfBronze = 3;
    let Amount = "0.1";
    console.log(defaultAccount);
    const tx = {value: ethers.utils.parseEther(Amount), gasLimit: 1500000020};
    const transaction = await bookContract.mintBatch(ContentMetadata,NoOfgold,NoOfSilver,NoOfBronze,tx);
    await transaction.wait();
    console.log("transaction :", transaction);
    console.log("Minted Successfully : ", await bookContract.balanceOf(defaultAccount));
    getAllContentsOfUser();
    getContentindexfromToken(1);
    getContentByTokenId(1);
    getContentbyitsIndices(1);
    getUserDataOfTokenType(1);
    getDataOfTokenType(1);
  }

  //get index value of the book i.e. of contents[] array from token id
  const getContentindexfromToken = async(tokenIds)=>{
    tokenIds = await bookContract.getTokensOwnedByUser(defaultAccount);
    const contentIndex = await bookContract.getContentIndexByID(tokenIds[0]);
    console.log("contentIndex : ", contentIndex);
  }
  
  //directly get content from token id
  const getContentByTokenId = async(tokenIds)=>{
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
  const getContentbyitsIndices = async(indices)=>{
    const totalcontentAvailable = await bookContract.getTotalContents();
    indices = Array.from({length: totalcontentAvailable.toNumber()}, (_, i) => i + 1);
    let content = await bookContract.getContentbyContentIndexArray(indices);
    console.log("content :", content);

    //can also be used to get content by tokentypes id of gold silver and bronze by finding its content index
    // const totalgoldtokenAvailable = await bookContract.getTotalgoldTokens(); 
    // const goldContentsIndexAvailable = await bookContract.getContentbyTokensArray(totalgoldtokenAvailable);
    // const contents = await bookContract.getContentbyContentIndexArray(goldContentsIndexAvailable);
  }

  const getAllContentsOfUser = async()=>{
    //depriciated because of getContentbyitsIndices()
    console.log("Owned Token Content : ", await bookContract.getAllContentsOfUser());
    //can also be done using getTokensOwnedByUser
    // const totalalltokenAvailable = await bookContract.getTokensOwnedByUser(defaultAccount); 
    // const getContentsIndexAvailable = await bookContract.getContentbyTokensArray(totalalltokenAvailable);
    // const contents = await bookContract.getContentbyContentIndexArray(getContentsIndexAvailable);
  }

  const getUserDataOfTokenType = async(tokenType) => {
    //depriciated because of getContentbyitsIndices()
    tokenType = "gold";
    let transaction = await bookContract.getContentsByTokenTypeofUser(tokenType, {from: defaultAccount});
    await transaction.wait();
    console.log("User Gold :", transaction.events[0].args);

    tokenType = "silver";
    transaction = await bookContract.getContentsByTokenTypeofUser(tokenType, {from: defaultAccount});
    await transaction.wait();
    console.log("User Silver :", transaction.events[0].args);
    
    tokenType = "bronze";
    transaction = await bookContract.getContentsByTokenTypeofUser(tokenType, {from: defaultAccount});
    await transaction.wait();
    console.log("User Bronze :", transaction.events[0].args);

    //can also be done by filtering tokens in getTokensOwnedByUser and getTotalgoldTokens
  }

  const getDataOfTokenType = async(tokenType) => {
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
    if(defaultAccount){
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
        userBalance = {userBalance}
        ConnectWalletHandler = {ConnectWalletHandler}
        errorMessage = {errorMessage}
        connButtonText = {connButtonText}
      />
      <Routes>
        <Route exact path="/" element={<Home 
        bookContract = {bookContract}
        marketContract = {marketContract}
        />}></Route>
        <Route path="/MarketPlace" element={<MarketPlace 
        bookContract = {bookContract}
        marketContract = {marketContract}
        />}></Route>
        <Route path="/myCollections" element={<Collections 
        bookContract = {bookContract}
        marketContract = {marketContract}
        />}></Route>
        <Route exact path="/write" element={<Write 
        mint = {mint}
        />}></Route>
        <Route exact path="/singlePage" element={<SinglePage 
        bookContract = {bookContract}
        marketContract = {marketContract}
        />}></Route>
      </Routes>
    </div>
  );
}

export default App;
