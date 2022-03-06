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
import SearchIcon from "@material-ui/icons/Search";

import { useStyles } from "./styles/Header";
import WalletInfo from "./elements/WalletInfo";

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
  
  const [title, setTitle] = useState([]);
  var bookContract;
  function getContent() {
    return new Promise((resolve, reject) => {
      if (props.connButtonText === "Wallet Connected") {
        props.setup().then((value) => {
          bookContract = value[1];
          console.log("bookContract", bookContract);
          resolve(bookContract);
        });
      } else {
        props.unsetup().then((value) => {
          bookContract = value[0];
          console.log("bookContract", bookContract);
          resolve(bookContract);
        });
      }
    });
  }

  useEffect(() => {
    function Get() {
      getContent().then(async (bookContract) => {
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
      })
    }
    Get();
  }, [])

  console.log("title", title)
  //Require popup searching
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
