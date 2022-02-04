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
    if (window.ethereum && defaultAccount == null) {
      // set ethers provider
      setProvider(new ethers.providers.Web3Provider(window.ethereum));

      // connect to metamask
      window.ethereum.request({ method: 'eth_requestAccounts'})
      .then(result => {
        setConnButtonText('Wallet Connected');
        setDefaultAccount(result[0]);
      })
      .catch(error => {
        setErrorMessage(error.message);
      });

    } else if (!window.ethereum){
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
    }

    let signer = await (new ethers.providers.Web3Provider(window.ethereum)).getSigner()
    const contract = new ethers.Contract("0xEA9E8318328314519dfeFc00222352B63349Ba2b", bookAbi, signer)
    console.log(contract)

    contract.connect(defaultAccount) 


    console.log("Tokens:",await contract.getContentIndexByID(3))
    setContract(contract)
  }

  const getUserCollections=()=>{
    console.log(contract.methods.getTokensOwnedByUser())
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
        contract = {contract}
        />}></Route>
        <Route exact path="/singlePage" element={<SinglePage 
        contract = {contract}
        />}></Route>
      </Routes>
    </div>
  );
}

export default App;
