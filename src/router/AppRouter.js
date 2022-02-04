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


function App() {

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [provider, setProvider] = useState(null);
  const ConnectWalletHandler = () => {
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
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/MarketPlace" element={<MarketPlace />}></Route>
        <Route path="/myCollections" element={<Collections />}></Route>
        <Route exact path="/write" element={<Write />}></Route>
        <Route exact path="/singlePage" element={<SinglePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
