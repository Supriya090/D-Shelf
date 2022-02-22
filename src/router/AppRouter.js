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
  const privateKey = "63f2d254a4256178b90f6ed5b0830641dd1d7d7ea2dca4f618037a2597e2ed1e";
  let defaultAccount = null;
  let bookContract = null;
  let marketContract = null;
  let provider = null;
  let signer = null;
  let list = []
  const [errorMessage, setErrorMessage] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');

  //Please connect your account to the wallet first the click the button
  //If you have changed your account from wallet the click button again to refresh the defaultAccount

  const ConnectWalletHandler = async () => {
    if (window.ethereum) {
      // set ethers provider
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      bookContract = new ethers.Contract(bookAddress, bookAbi, signer);
      marketContract = new ethers.Contract(bookMarketAddress, bookMarketAbi, signer);

      // connect to metamask
      // if(!checkIfWalletIsConnected){
        await window.ethereum.request({
          method: "eth_accounts",
        })
        .then(async(account) => {
          if (account.length > 0) {
            defaultAccount = account[0];
          }
          else{
            await window.ethereum.request({ method: 'wallet_requestPermissions',
                params: [{
                  eth_accounts: {}
                }] 
              })
            }
        })
        .then(async() => {
          await window.ethereum.request({ method: 'eth_requestAccounts' })
          .then((account) => {
            setErrorMessage(null);
            defaultAccount = account[0];
            setConnButtonText('Wallet Connected');
            bookContract.connect(defaultAccount);
            marketContract.connect(defaultAccount);
            console.log(defaultAccount)
          })
        .catch(error => {
          console.log(error);
        })
      })
    } else {
      // Ethers.js
      alert('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
    }
  }
  const buyContent = async(tokenId) => { 
        const amount = 1;
        const tx = {
          value: ethers.utils.parseEther(amount.toString()),
          gasLimit: 5000000,
        };
        marketContract.createMarketSale(bookAddress, tokenId,tx)
        .then(async(transaction) => {
          console.log(transaction);
          const receipt = await transaction.wait();
          console.log(receipt);
          alert("Content Bought");
        })
        .catch(err => {
          console.log(err);
          alert("Some error occured");
        });
   
    
  }

  const fetchOwnContent = async() => { 
    const items = await marketContract.fetchMyNFTs()
    console.log(items[0].tokenId)
    let listedcontent = []

    
    for(const item of items){
      const cid = (await bookContract.getContentIndexByID(item.tokenId))[0]
      const content = await bookContract.getContentbyCID(cid)
      let listed = {
        tokenId : item.tokenId,
        itemId : item.itemId,
        content : content
      }
      listedcontent.push(listed)  
    }
    console.log(listedcontent)
    return listedcontent
  }

  const setup = () => {
    return new Promise((resolve, reject) => {
      ConnectWalletHandler()
        .then(() => {
          // const list = Promise.all([ defaultAccount, bookContract, marketContract, provider, signer ])
          const list = [defaultAccount, bookContract, marketContract, provider, signer]
          console.log(list)
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
      if ( window.ethereum !== undefined) {
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
        provider = new ethers.providers.AlchemyProvider("rinkeby", "cQwQ1GuU6HfIcVaHoHMZe7dKl_ttPwGL")        
        const wallet = new ethers.Wallet(privateKey, provider);
        const signer = wallet.connect(provider);
        bookContract = new ethers.Contract(bookAddress, bookAbi, signer);
        marketContract = new ethers.Contract(bookMarketAddress, bookMarketAbi, signer);
        list = [bookContract, marketContract, provider, signer]
        resolve(list);
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

    async function GetConnected(){
      if(window.ethereum){
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
        setup()
        }else{
          await window.ethereum.request({ method: 'wallet_requestPermissions',
          params: [{
            eth_accounts: {}
          }] 
        })
        }
      }else{
        unSetup()
      }
    }
    GetConnected();
  
    async function OnWalletChange() {
      window.ethereum.on('accountsChanged', function (accounts) {
        // Time to reload your interface with accounts[0]!
        // console.log("accountsChanged :", accounts[0]);
        setConnButtonText('Wallet Changed');
        setErrorMessage('Click button to refresh contents');
      })
    }
    
    OnWalletChange();
    if (window.ethereum !== undefined) {
    if (defaultAccount && connButtonText === 'Wallet Connected') {
      provider.getBalance(defaultAccount)
        .then(balanceResult => {
          setUserBalance(ethers.utils.formatEther(balanceResult));
        })
    };}
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
        <Route exact path="/" element={<Home connButtonText={connButtonText} unSetup={unSetup} />}></Route>
        <Route path="/MarketPlace" element={<MarketPlace unSetup={unSetup} buyContent={buyContent} />}></Route>
        <Route path="/myCollections" element={<Collections connButtonText={connButtonText} setup={setup} />}></Route>
        <Route exact path="/write" element={<Write connButtonText={connButtonText} setup={setup} />}></Route>
        <Route exact path="/singlePage/:id" element={<SinglePage setup={setup} unsetup={unSetup} connButtonText={connButtonText} buyContent={buyContent} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
