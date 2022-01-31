import { Typography } from "@material-ui/core";
import React from "react";
import { useStyles as marketStyles } from "./styles/MarketPlace";
import { useStyles as homeStyles } from "./styles/Home";
import HorizontalScrolling from "./elements/HorizontalScroll";
import { content } from "./elements/dummyImages";
import ListHead from "./elements/ListHead";

const auctionContent = content;

const Collections = () => {
  const marketClasses = marketStyles();
  const homeClasses = homeStyles();

  return (
    <div className={marketClasses.mainContent}>
      <div className={marketClasses.heading} style={{ marginTop: "30px" }}>
        <Typography>MY Content Collections</Typography>
      </div>
      <div className={homeClasses.itemsList}>
        <div className={homeClasses.auctions}>
          <ListHead title={""} leftButton={"Books"} hasRightButton={false} />
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

export default Collections;
