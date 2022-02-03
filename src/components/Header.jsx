import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo.png";
import {ethers} from 'ethers'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  InputBase,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { useStyles } from "./styles/Header";

const headersData = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "MarketPlace",
    href: "/marketplace",
  },
  {
    label: "My Collections",
    href: "/mycollections",
  },
  {
    label: "Write",
    href: "/write",
  }
];

const Header = () => {

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
  const {
    header,
    img,
    headerTitle,
    headerButton,
    toolbar,
    logoName,
    search,
    searchIcon,
    inputInput,
    inputRoot,
  } = useStyles();
  const displayHeader = () => {
    return (
      <header>
        <AppBar className={header} position='static'>
          <Box
            borderBottom={1}
            borderColor={"#c3a400"}
            marginRight={4}
            marginLeft={4}>
            <Toolbar className={toolbar}>
              <div className={logoName}>
                <img src={logo} alt='logo' className={img} />
                <Typography variant='h6' component='h1' className={headerTitle}>
                  D-Shelf
                </Typography>
              </div>
              <div className={search}>
                <div className={searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder='Search Content ...'
                  classes={{
                    root: inputRoot,
                    input: inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
              <div>{getMenuButtons()}
                  <Button onClick={ConnectWalletHandler} className={headerButton}>
                    {connButtonText}
                  </Button>
                  <div className='accountDisplay'>
                    <h3>Address: {defaultAccount}</h3>
                  </div>
                  <div className='balanceDisplay'>
                    <h3>Balance: {userBalance}</h3>
                  </div>
                  {errorMessage}
              </div>
            </Toolbar>
          </Box>
        </AppBar>
      </header>
    );
  };

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: headerButton,
          }}>
          {label}
        </Button>
      );
    });
  };

  return <div>{displayHeader()}</div>;
};

export default Header;
