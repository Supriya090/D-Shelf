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
  const [defaultAccount, setDefaultAccount] = useState('');
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  let defaultAccount2 = null
  const ConnectWalletHandler = async () => {
    try {
      if (window.ethereum && defaultAccount == '') {
        // set ethers provider
        setProvider(new ethers.providers.Web3Provider(window.ethereum));

        // connect to metamask
        let result = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setConnButtonText('Wallet Connected')
        setDefaultAccount(result[0])
        defaultAccount2 = result[0]
      } else if (!window.ethereum) {
        console.log('Need to install MetaMask')
        setErrorMessage('Please install MetaMask browser extension to interact');
      }
    }
    catch (error) {
      console.log(error);
    }

    let signer = await (new ethers.providers.Web3Provider(window.ethereum)).getSigner()
    const contract = new ethers.Contract(bookAddress, bookAbi, signer)
    // console.log(contract)
    console.log(defaultAccount2);
    contract.connect(defaultAccount2)
    console.log(defaultAccount2)
    setDefaultAccount(defaultAccount2)

    const contractMarket = new ethers.Contract(bookMarketAddress, bookMarketAbi, signer)


    console.log("Tokens:", await contract.getTokensOwnedByUser(defaultAccount2))

    setContract(contract)

  }

  const getTokensByUser = async () => {
    const tokens = await contract.getTokensOwnedByUser(defaultAccount)
    return tokens
  }

  const mint = async () => {
    const content = {
      tokenIds: [],
      tokenType: 0,
      contentType: 0,
      publicationDate: 1225666,
      author: "Ranju GC",
      authorAddr: defaultAccount,
      ipfsHash: "thank you",
      coverImageHash: "coverImage",
      onBid: false,
      descriptionHash: "descriptionHash",
      Price: 400,
      isBurnt: false
    }
    const tx = { value: ethers.utils.parseEther("2.0") }

    // console.log(defaultAccount)

    console.log(await contract.mintBatch("abc", content, 5, 10, 20, tx))
    // console.log("Tokens:",await contract.getTokensOwnedByUser(defaultAccount))
  }

  const getDataOfTokenType = async (tokentype) => {
    const tokens = await contract.getContentsOfEachTokenType(tokentype)
    return tokens
  }

  const getContentsByTokenTypeofUser = async (tokentype) => {
    const tokens = await contract.getContentsByTokenTypeofUser(tokentype)
    return tokens
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
          contract={contract}
        />}></Route>
        <Route path="/MarketPlace" element={<MarketPlace
          contract={contract}
        />}></Route>
        <Route path="/myCollections" element={<Collections
          contract={contract}
        />}></Route>
        <Route exact path="/write" element={<Write
          mint={mint}
        />}></Route>
        <Route exact path="/singlePage" element={<SinglePage
          contract={contract}
        />}></Route>
      </Routes>
    </div>
  );
}

export default App;
