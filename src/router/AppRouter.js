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
import {bookAbi} from '../bookABI.js'
import {bookMarketAbi} from '../bookmarketABI'


function App() {

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const ConnectWalletHandler = async () => {
    try{
      if (window.ethereum && defaultAccount == null) {
        // set ethers provider
        setProvider(new ethers.providers.Web3Provider(window.ethereum));
  
        // connect to metamask
        let result = await window.ethereum.request({ method: 'eth_requestAccounts'})
        setConnButtonText('Wallet Connected');
        setDefaultAccount(result[0]);
        return result[0];
      } else if (!window.ethereum){
        console.log('Need to install MetaMask');
        setErrorMessage('Please install MetaMask browser extension to interact');
      }
    }
    catch (error){
      console.log(error);
    }
  }

  const setContracts = async() => {
    let signer = await (new ethers.providers.Web3Provider(window.ethereum)).getSigner()
    const contract = new ethers.Contract("0xEA9E8318328314519dfeFc00222352B63349Ba2b", bookAbi, signer)
    // console.log(contract)
    console.log(defaultAccount);
    contract.connect(defaultAccount)
    setContract(contract);
  }

  const UserTokens = async()=>{

    console.log("Tokens:",await contract.getTokensOwnedByUser(defaultAccount))
    setContract(contract)
  }

  const mint=async()=>{

    const content = {
      tokenIds:[],
      tokenType : 0,
      contentType : 0,
      publicationDate:1225666,
      author:"Ranju GC",
      authorAddr: dummy.address,
      coverImageHash: "coverImage",
      descriptionHash : "descriptionHash"
    }
    console.log(defaultAccount);
    const tx = {value: ethers.utils.parseEther("4.0")}
    console.log(await contract.mintBatch("abc",content,10,10,10,tx))
    UserTokens()
    getDataOfTokenType()
  }

  const getDataOfTokenType=async()=>{
    console.log(defaultAccount);
    const tx = {value: ethers.utils.parseEther("4.0")}
    console.log(await contract.getContentsOfEachTokenType("gold"))
  }

  useEffect(() => {
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
        setDefaultAccount={setDefaultAccount}
        setContracts={setContracts}
        userBalance = {userBalance}
        ConnectWalletHandler = {ConnectWalletHandler}
        errorMessage = {errorMessage}
        connButtonText = {connButtonText}
      />
      <Routes>
        <Route exact path="/" element={<Home 
        contract = {contract}
        />}></Route>
        <Route path="/MarketPlace" element={<MarketPlace 
        contract = {contract}
        />}></Route>
        <Route path="/myCollections" element={<Collections 
        contract = {contract}
        />}></Route>
        <Route exact path="/write" element={<Write 
        mint = {mint}
        />}></Route>
        <Route exact path="/singlePage" element={<SinglePage 
        contract = {contract}
        />}></Route>
      </Routes>
    </div>
  );
}

export default App;
