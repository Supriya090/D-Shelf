import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useStyles as marketStyles } from "./styles/MarketPlace";
import { useStyles as homeStyles } from "./styles/Home";
import HorizontalScrolling from "./elements/HorizontalScroll";
import { content } from "./elements/dummyImages";
import ListHead from "./elements/ListHead";

const MarketPlace = (props) => {
  var bookContract;
  var marketContract;
  var provider;
  var signer;

  const marketClasses = marketStyles();
  const homeClasses = homeStyles();

  const [goldContents, setGoldContents] = useState([]);
  const [silverContents, setSilverContents] = useState([]);
  const [bronzeContents, setBronzeContents] = useState([]);

  useEffect(() => {
    props
      .unSetup()
      .then((value) => {
        bookContract = value[0];
        marketContract = value[1];
        provider = value[2];
        signer = value[3];
      })
      .then(() => {
        bookContract.getContentsOfEachTokenType("gold").then((GoldContents) => {
          console.log("All gold Content : ", GoldContents);
          //Render Gold Content
          setGoldContents(GoldContents);
        });
        bookContract
          .getContentsOfEachTokenType("silver")
          .then((SilverContents) => {
            console.log("All silver Content : ", SilverContents);
            //Render Silver Content
            setSilverContents(SilverContents);
          });
        bookContract
          .getContentsOfEachTokenType("bronze")
          .then((BronzeContents) => {
            console.log("All Bronze Content : ", BronzeContents);
            //Render Bronze Content
            setBronzeContents(BronzeContents);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={homeClasses.mainContent}>
      <div className={marketClasses.heading} style={{ marginTop: "30px" }}>
        <Typography>All Contents</Typography>
      </div>
      <div className={homeClasses.itemsList}>
        <div className={homeClasses.auctions}>
          <ListHead title={""} leftButton={"Gold"} />
          {goldContents.length === 0 ? (
            <Typography>Loading</Typography>
          ) : (
            <HorizontalScrolling getItems={goldContents} isTrending={true} />
          )}
        </div>
        <div
          className={homeClasses.notableContents}
          style={{ marginTop: "80px" }}>
          <ListHead title={""} leftButton={"Silver"} />
          {silverContents.length !== 0 ? (
            <HorizontalScrolling getItems={silverContents} isTrending={true} />
          ) : (
            <Typography>Loading</Typography>
          )}
        </div>
        <div
          className={homeClasses.notableCreators}
          style={{ marginTop: "80px" }}>
          <ListHead title={""} leftButton={"Bronze"} />
          {bronzeContents.length !== 0 ? (
            <HorizontalScrolling getItems={bronzeContents} isTrending={true} />
          ) : (
            <Typography>Loading</Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
