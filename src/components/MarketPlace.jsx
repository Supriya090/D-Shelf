import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useStyles as marketStyles } from "./styles/MarketPlace";
import { useStyles as homeStyles } from "./styles/Home";
import HorizontalScrolling from "./elements/HorizontalScroll";
import { content } from "./elements/dummyImages";
import ListHead from "./elements/ListHead";
import loader from "../assets/loading-yellow.gif";

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
    const addContent = (content,item={tokenId:"a",itemId:"b"}) => {
      let listed = {
        tokenId : item.tokenId,
        tokenIds : content.tokenIds,
        itemId : item.itemId,
        title : content.title,
        tokenType : content.tokenType,
        cid : content.cid,
        publicationDate : content.publicationDate,
        author : content.author,
        authorAddr: content.authorAddr,
        coverImageHash: content.coverImageHash,
        descriptionHash: content.descriptionHash,
        description: content.description,
        price:item.price
        }
        return listed
    }
    props
      .unSetup()
      .then((value) => {
        bookContract = value[0];
        marketContract = value[1];
        provider = value[2];
        signer = value[3];
      })
      .then(async() => {
        console.log(marketContract)
        const items =  await marketContract.fetchMarketItems()
        console.log(items)
        let listedcontent = []
    
        
        for(const item of items){
          const content = await bookContract.getContentofToken(item.tokenId)
          listedcontent.push(addContent(content,item))
        }
        let gold = [], silver = [], bronze =[]
        for(const content of listedcontent){
        
          if(content.tokenType == 0){
            gold.push(content)
          }
          if(content.tokenType == 1){
            silver.push(content)
          }
          if(content.tokenType == 2){
            bronze.push(content)
          }
        }
        setGoldContents(gold)
        setSilverContents(silver)
        setBronzeContents(bronze)
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
            <img
              src={loader}
              alt='loading...'
              className={marketClasses.loader}
            />
          ) : (
            <HorizontalScrolling getItems={goldContents} isTrending={true} buyContent={props.buyContent} />
          )}
        </div>
        <div
          className={homeClasses.notableContents}
          style={{ marginTop: "80px" }}>
          <ListHead title={""} leftButton={"Silver"} />
          {silverContents.length !== 0 ? (
            <HorizontalScrolling getItems={silverContents} isTrending={true} buyContent={props.buyContent} />
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
          {bronzeContents.length !== 0 ? (
            <HorizontalScrolling getItems={bronzeContents} isTrending={true} />
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

export default MarketPlace;
