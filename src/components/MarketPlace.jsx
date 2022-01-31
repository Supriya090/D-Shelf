import { Typography } from "@material-ui/core";
import React from "react";
import { useStyles as marketStyles } from "./styles/MarketPlace";
import { useStyles as homeStyles } from "./styles/Home";
import HorizontalScrolling from "./elements/HorizontalScroll";
import { content } from "./elements/dummyImages";
import ListHead from "./elements/ListHead";
// const auctionContent = [];

const auctionContent = content;

const MarketPlace = () => {
  const marketClasses = marketStyles();
  const homeClasses = homeStyles();

  return (
    <div className={marketClasses.mainContent}>
      <div className={marketClasses.heading} style={{ marginTop: "30px" }}>
        <Typography>All Contents</Typography>
      </div>
      <div className={homeClasses.itemsList}>
        <div className={homeClasses.auctions}>
          <ListHead title={""} leftButton={"Trending"} hasRightButton={false} />
          <HorizontalScrolling getItems={auctionContent} />
        </div>
        <div className={homeClasses.notableContents}>
          <ListHead title={""} leftButton={"Top Sold"} hasRightButton={false} />
          <HorizontalScrolling getItems={auctionContent} />
        </div>
        <div className={homeClasses.notableCreators}>
          <ListHead title={""} leftButton={"Live"} hasRightButton={false} />
          <HorizontalScrolling getItems={auctionContent} />
        </div>
        <div className={homeClasses.notableCreators}>
          <ListHead
            title={""}
            leftButton={"Blog Post"}
            hasRightButton={false}
          />
          <HorizontalScrolling getItems={auctionContent} />
        </div>
        <div className={homeClasses.notableCreators}>
          <ListHead title={""} leftButton={"Poems"} hasRightButton={false} />
          <HorizontalScrolling getItems={auctionContent} />
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
