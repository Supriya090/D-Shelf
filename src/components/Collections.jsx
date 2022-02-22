import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useStyles as marketStyles } from "./styles/MarketPlace";
import { useStyles as homeStyles } from "./styles/Home";
import HorizontalScrolling from "./elements/HorizontalScroll";
import ListHead from "./elements/ListHead";
import { useEffect } from "react";
import loader from "../assets/loading-yellow.gif";

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
  const [TotalBronzeIds, setTotalBronzeIds] = useState(null);
  const [TotalSilverIds, setTotalSilverIds] = useState(null);
  const [TotalGoldIds, setTotalGoldIds] = useState(null);
  const [TotalIds, setTotalIds] = useState(null);

  useEffect(() => {
    if (props.connButtonText === "Wallet Connected") {
      props
        .setup()
        .then((value) => {
          // console.log(value)
          defaultAccount = value[0];
          bookContract = value[1];
          marketContract = value[2];
          provider = value[3];
          signer = value[4];
          // console.log(defaultAccount, bookContract, marketContract, provider, signer);
        })
        .then(async () => {
          await bookContract.getTotalgoldTokens().then((totalTokens) => {
            setTotalIds(totalTokens);
          });
          await bookContract.getAllContentsOfUser().then((UserContents) => {
            console.log("User owned Content : ", UserContents);
            //Render User Contents
            setContents(UserContents);
          });
          await bookContract.getTotalgoldTokens().then((totalGoldTokens) => {
            var TotalGoldIds = [];
            for (var i = 0; i < totalGoldTokens.length; i++) {
              TotalGoldIds.push(totalGoldTokens[i].toNumber());
            }
            setTotalGoldIds(TotalGoldIds);
          });
          await bookContract
            .getContentsByTokenTypeofUser("gold", defaultAccount)
            .then((UserGoldContents) => {
              console.log("User owned gold Content : ", UserGoldContents);
              //Render User Gold Content
              setGoldContents(UserGoldContents);
            });
          await bookContract
            .getTotalsilverTokens()
            .then((totalSilverTokens) => {
              var TotalSilverIds = [];
              for (var i = 0; i < totalSilverTokens.length; i++) {
                TotalSilverIds.push(totalSilverTokens[i].toNumber());
              }
              setTotalSilverIds(TotalSilverIds);
            });
          await bookContract
            .getContentsByTokenTypeofUser("silver", defaultAccount)
            .then((UserSilverContents) => {
              //Render User Silver Content
              console.log("User owned silver Content : ", UserSilverContents);
              setSilverContents(UserSilverContents);
            });
          await bookContract
            .getTotalbronzeTokens()
            .then((totalBronzeTokens) => {
              var TotalBronzeIds = [];
              for (var i = 0; i < totalBronzeTokens.length; i++) {
                TotalBronzeIds.push(totalBronzeTokens[i].toNumber());
              }
              setTotalBronzeIds(TotalBronzeIds);
            });
          await bookContract
            .getContentsByTokenTypeofUser("bronze", defaultAccount)
            .then((UserBronzeContents) => {
              console.log("User owned Bronze Content : ", UserBronzeContents);
              //Render User Bronze Content
              setBronzeContents(UserBronzeContents);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.connButtonText]);

  return (
    <div className={homeClasses.mainContent}>
      <div className={marketClasses.heading} style={{ marginTop: "30px" }}>
        <Typography>My Content Collections</Typography>
      </div>
      <div className={homeClasses.itemsList}>
        <div className={homeClasses.auctions}>
          <ListHead title={""} leftButton={"Total Owned"} />
          {UserContents.length === 0 && TotalIds === 0 ? (
            <img
              src={loader}
              alt='loading...'
              className={marketClasses.loader}
            />
          ) : (
            <></>
            // <HorizontalScrolling getItems={UserContents} isCollection={true} setup={props.setup} TotalIds={TotalIds} />
          )}
        </div>
        <div
          className={homeClasses.notableContents}
          style={{ marginTop: "80px" }}>
          <ListHead title={""} leftButton={"Gold"} />
          {UsergoldContents.length !== 0 && TotalGoldIds !== 0 ? (
            <HorizontalScrolling
              getItems={UsergoldContents}
              isCollection={true}
              setup={props.setup}
              TotalGoldIds={TotalGoldIds}
              type='gold'
            />
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
          {UsersilverContents.length !== 0 && TotalSilverIds !== 0 ? (
            <HorizontalScrolling
              getItems={UsersilverContents}
              isCollection={true}
              setup={props.setup}
              TotalSilverIds={TotalSilverIds}
              type='silver'
            />
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
          {UserbronzeContents.length !== 0 && TotalBronzeIds !== 0 ? (
            <HorizontalScrolling
              getItems={UserbronzeContents}
              isCollection={true}
              TotalBronzeIds={TotalBronzeIds}
              type='bronze'
            />
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
