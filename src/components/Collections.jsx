import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useStyles as marketStyles } from "./styles/MarketPlace";
import { useStyles as homeStyles } from "./styles/Home";
import HorizontalScrolling from "./elements/HorizontalScroll";
import { content } from "./elements/dummyImages";
import ListHead from "./elements/ListHead";
import { useEffect } from "react";
import loader from "../assets/loading-yellow.gif";

const auctionContent = content;

const Collections = (props) => {
  var defaultAccount;
  var bookContract; 
  var marketContract;
  var provider;
  var signer;

  const marketClasses = marketStyles();
  const homeClasses = homeStyles();

  const [UserContents, setContents] = useState([]);
  const [UsergoldContents, setGoldContents] = useState([]);
  const [UsersilverContents, setSilverContents] = useState([]);
  const [UserbronzeContents, setBronzeContents] = useState([]);


  useEffect(() => {
  if(props.connButtonText === "Wallet Connected") {
      props.setup()
      .then(
        value => {
          // console.log(value)
          defaultAccount = value[0]
          bookContract = value[1] 
          marketContract = value[2] 
          provider = value[3]
          signer = value[4]
          // console.log(defaultAccount, bookContract, marketContract, provider, signer);
        })
        .then(()=>{
          bookContract.getAllContentsOfUser()
          .then(UserContents=>{
            console.log("User owned Content : ", UserContents);
            //Render User Contents
            setContents(UserContents);
          })
          bookContract.getContentsByTokenTypeofUser("gold",  defaultAccount)
          .then(UserGoldContents=>{
            console.log("User owned gold Content : ", UserGoldContents);
            //Render User Gold Content
            setGoldContents(UserGoldContents);
          })
          bookContract.getContentsByTokenTypeofUser("silver",  defaultAccount)
          .then(UserSilverContents=>{
            //Render User Silver Content
            console.log("User owned silver Content : ", UserSilverContents);
            setSilverContents(UserSilverContents);
          })
          bookContract.getContentsByTokenTypeofUser("bronze",  defaultAccount)
          .then(UserBronzeContents=>{
            console.log("User owned Bronze Content : ", UserBronzeContents);
            //Render User Bronze Content
            setBronzeContents(UserBronzeContents);
          })

        })
        .catch(err=>{
          console.log(err);
        })
    }
  }, [props.connButtonText])

  
  return (
    <div className={homeClasses.mainContent}>
      <div className={marketClasses.heading} style={{ marginTop: "30px" }}>
        <Typography>My Content Collections</Typography>
      </div>
      <div className={homeClasses.itemsList}>
        <div className={homeClasses.auctions}>
          <ListHead title={""} leftButton={"Total Owned"} />
          {UserContents.length === 0 ? (
            <img
              src={loader}
              alt='loading...'
              className={marketClasses.loader}
            />
          ) : (
            <HorizontalScrolling getItems={UserContents} isCollection={true} setup={props.setup} />
          )}
        </div>
        <div
          className={homeClasses.notableContents}
          style={{ marginTop: "80px" }}>
          <ListHead title={""} leftButton={"Gold"} />
          {UsergoldContents.length !== 0 ? (
            <HorizontalScrolling getItems={UsergoldContents} isCollection={true} setup={props.setup} />
          ) : (
            <img
              src={loader}
              alt='loading...'
              className={marketClasses.loader}
            />
          )}
        </div>
        <div
          className={homeClasses.notableContents}
          style={{ marginTop: "80px" }}>
          <ListHead title={""} leftButton={"Silver"} />
          {UsersilverContents.length !== 0 ? (
            <HorizontalScrolling getItems={UsersilverContents} isCollection={true} setup={props.setup} />
          ) : (
            <img
              src={loader}
              alt='loading...'
              className={marketClasses.loader}
            />
          )}
        </div>
        <div
          className={homeClasses.notableCreators}
          style={{ marginTop: "80px" }}>
          <ListHead title={""} leftButton={"Bronze"} />
          {UserbronzeContents.length !== 0 ? (
            <HorizontalScrolling getItems={UserbronzeContents} isCollection={true} setup={props.setup} />
          ) : (
            <img
              src={loader}
              alt='loading...'
              className={marketClasses.loader}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;
