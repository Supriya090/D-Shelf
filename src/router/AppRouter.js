import Header from '../components/Header';
import React, { useState, useEffect, useMemo } from "react";
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
import { SettingsOutlined } from '@material-ui/icons';



function App() {
  const privateKey = "63f2d254a4256178b90f6ed5b0830641dd1d7d7ea2dca4f618037a2597e2ed1e";
  let defaultAccount = null;
  let bookContract = null;
  let marketContract = null;
  let provider = null;
  let signer = null;
  let list = []
  const [title, setTitle] = useState([]);
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
  const buyContent = async(tokenId,amount) => { 
        // const amount = 1;
        console.log('buyContent', tokenId, Number(amount));
        const tx = {
          value: ethers.utils.parseEther(amount.toString()),
          gasLimit: 10000000,
        };
        marketContract.createMarketSale(bookAddress, tokenId,tx)
        .then(async(transaction) => {
          console.log(transaction);
          const receipt = await transaction.wait();
          console.log(receipt);
          alert("Content Bought");
        })
        .then(async() => {
          const approvance = await bookContract.setApproval(tokenId)
          console.log("Approval : ",approvance);
        })
        .catch(err => {
          console.log(err);
          alert("Some error occured");
        });
   
    
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
      await bookContract.getContentList()
        .then((list)=>{
          var List = []
          list.map((item)=>{
            List.push({...item})
          })
          List.shift()
          for(var i = 0; i < List.length; i++){
            delete List[i][0];
            delete List[i][1];
            delete List[i][2];
            delete List[i][3];
            delete List[i][4];
            delete List[i][5];
            delete List[i][6];
            delete List[i][7];
            delete List[i][8];
            delete List[i][9];
            delete List[i][10];
          }
        setTitle(List)
        })
    }
    GetConnected();
    async function OnWalletChange() {
      window.ethereum.on('accountsChanged', function (accounts) {
        alert('accountsChanged');
        setup()
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
        title={title}
        errorMessage={errorMessage}
        connButtonText={connButtonText}
      />)

      <Routes>
        <Route exact path="/" element={<Home connButtonText={connButtonText} unSetup={unSetup} buyContent={buyContent} title={title}/>}></Route>
        <Route path="/MarketPlace" element={<MarketPlace unSetup={unSetup} buyContent={buyContent} />}></Route>
        <Route path="/myCollections" element={<Collections connButtonText={connButtonText} setup={setup} />}></Route>
        <Route exact path="/write" element={<Write connButtonText={connButtonText} setup={setup} />}></Route>
        <Route exact path="/singlePage/:tokenId" element={<SinglePage setup={setup} unsetup={unSetup} connButtonText={connButtonText} buyContent={buyContent} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
