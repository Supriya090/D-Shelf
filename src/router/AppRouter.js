import Header from '../components/Header';
import "../App.css"
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home from '../components/Home';
import Write from '../components/Write';
import MarketPlace from '../components/MarketPlace';
import Collections from '../components/Collections';
import SinglePage from '../components/SinglePage';
// import Web3 from "web3";

function App() {
  // const [isConnected, setIsConnected] = useState(false);
  // const [currentAccount, setCurrentAccount] = useState(null);
  // const [balance, setBalance] = useState(0);

  // const onLogin = async (provider) => {
  //   const web3 = new Web3(provider);
  //   const accounts = await web3.eth.getAccounts();
  //   if (accounts.length === 0) {
  //     console.log("Please connect to MetaMask!");
  //   } else if (accounts[0] !== currentAccount) {
  //     setCurrentAccount(accounts[0]);
  //     const accBalanceEth = web3.utils.fromWei(
  //       await web3.eth.getBalance(accounts[0]),
  //       "ether"
  //     );

  //     setBalance(Number(accBalanceEth).toFixed(6));
  //     setIsConnected(true);
  //   }
  // };

  // const onLogout = () => {
  //   setIsConnected(false);
  // };
  return (
    <div className="App">
      {/* <Header currentAccount={currentAccount} balance={balance} /> */}
      <Header />
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
