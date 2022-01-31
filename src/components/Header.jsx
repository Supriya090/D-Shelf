import React from "react";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo.png";
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
  },
  {
    label: "Connect Wallet",
    href: "/connectwallet",
  },
];

const Header = () => {
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
                  Patra
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
              <div>{getMenuButtons()}</div>
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
