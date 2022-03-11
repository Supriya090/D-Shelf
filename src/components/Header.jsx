import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router";
import logo from "../assets/logo.png";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  InputBase,
} from "@material-ui/core";

import { useStyles } from "./styles/Header";
import WalletInfo from "./elements/WalletInfo";
import SearchBar from "./elements/SearchBar";
import { setBlockData } from "draft-js/lib/DraftModifier";

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
    label: "Upload",
    href: "/write",
  },
];

const Header = (props) => {
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

  const navigate = useNavigate();
  const logoClick = () => {
    navigate("/", { replace: true });
  }

  const[searchValue, setSearchValue] = useState([]);
  useEffect(() => {
    setSearchValue(props.title);
  }, [props.title]);
  
  const displayHeader = () => {
    let walletDetails;
    if (props.connButtonText === "Wallet Connected") {
      walletDetails = (
        <WalletInfo
          defaultAccount={props.userAccount}
          userBalance={props.userBalance}
        />
      );
    }
    return (
      <header>
        <AppBar className={header} position='fixed'>
          <Box
            borderBottom={1}
            borderColor={"#c3a400"}
            marginRight={4}
            marginLeft={4}>
            <Toolbar className={toolbar}>
              <div className={logoName} onClick={logoClick}>
                <img src={logo} alt='logo' className={img} />
                <Typography variant='h6' component='h1' className={headerTitle}>
                  D-Shelf
                </Typography>
              </div>
              <SearchBar data={searchValue} />
              <div style={{ display: "flex" }}>
                {getMenuButtons()}
                <Button
                  onClick={props.setup}
                  className={headerButton}>
                  {props.connButtonText}
                </Button>
                {walletDetails}
                {props.errorMessage}
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
