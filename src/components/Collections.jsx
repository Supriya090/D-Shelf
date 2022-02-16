import { Typography } from "@material-ui/core";
import React from "react";
import { useStyles as marketStyles } from "./styles/MarketPlace";
import { useStyles as homeStyles } from "./styles/Home";
import HorizontalScrolling from "./elements/HorizontalScroll";
import { content } from "./elements/dummyImages";
import ListHead from "./elements/ListHead";
import { useEffect } from "react";

const auctionContent = content;

const Collections = (props) => {
  var defaultAccount;
  var bookContract; 
  var marketContract;
  var provider;
  var signer;

  const marketClasses = marketStyles();
  const homeClasses = homeStyles();

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
          })
          bookContract.getContentsByTokenTypeofUser("gold",  defaultAccount)
          .then(UserGoldContents=>{
            console.log("User owned gold Content : ", UserGoldContents);
            //Render User Gold Content
          })
          bookContract.getContentsByTokenTypeofUser("silver",  defaultAccount)
          .then(UserSilverContents=>{
            //Render User Silver Content
            console.log("User owned silver Content : ", UserSilverContents);
          })
          bookContract.getContentsByTokenTypeofUser("bronze",  defaultAccount)
          .then(UserBronzeContents=>{
            console.log("User owned Bronze Content : ", UserBronzeContents);
            //Render User Bronze Content
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
          <ListHead title={""} leftButton={"Gold"} />
          <HorizontalScrolling
            getItems={auctionContent}
            isCollection={true}
            style={{ marginTop: "80px" }}
          />
        </div>
        <div className={homeClasses.notableCreators}>
          <ListHead title={""} leftButton={"Silver"} />
          <HorizontalScrolling
            getItems={auctionContent}
            isCollection={true}
            style={{ marginTop: "80px" }}
          />
        </div>
        <div className={homeClasses.notableCreators}>
          <ListHead title={""} leftButton={"Bronze"} />
          <HorizontalScrolling
            getItems={auctionContent}
            isCollection={true}
            style={{ marginTop: "80px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Collections;
