import { Button } from "@material-ui/core";
// import React, { useState } from "react";
import dummy from "../../assets/dummy.jpg";
import { useStyles } from "../styles/Collections";

const CollectedNFT = ({ nftCategory }) => {
  const classes = useStyles();
  
  return (
      <>
    <div>
        <Button variant='contained' className={classes.exploreButton}>
          {nftCategory}
        </Button>
        </div>
        <div className={classes.featuredContent}>
          <img src={dummy} alt='NFTImage' className={classes.NFTImage} />
          <img src={dummy} alt='NFTImage' className={classes.NFTImage} />
          <img src={dummy} alt='NFTImage' className={classes.NFTImage} />
          <img src={dummy} alt='NFTImage' className={classes.NFTImage} />
          <img src={dummy} alt='NFTImage' className={classes.NFTImage} />
        </div>
        </>
  );
}

export default CollectedNFT;
