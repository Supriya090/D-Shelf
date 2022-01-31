import React from "react";
import { useStyles as homeStyles } from "./styles/Home";
import { Typography, Button, Divider } from "@material-ui/core";
import dummy from "../assets/dummy.jpg";

function SinglePage() {
  const homeClasses = homeStyles();
  return (
    <div className={homeClasses.featuredContent}>
      <div className={homeClasses.currentBid}>
        <img src={dummy} alt='NFTImage' className={homeClasses.NFTImage} />
        <div className={homeClasses.biddings}>
          <div>
            Current Bid
            <div className={homeClasses.bidNumStyle}>4 ETH </div>
            ($10000)
          </div>
          <div>
            Remaining Time{" "}
            <div className={homeClasses.bidNumStyle}>10 : 22 : 29</div>
          </div>
        </div>
      </div>
      <div className={homeClasses.featured}>
        <Typography>Featured Contents</Typography>
        <div className={homeClasses.NFTFeatures}>
          <div>
            <div className={homeClasses.owner}>
              <Typography>
                Title : The Crow&apos;s Vow <br /> Owner : Susan Briscoe (
                0xD43f4536...5e4 ) <br />
                Author : Susan Briscoe <br />
              </Typography>
              <Button variant='contained' className={homeClasses.exploreButton}>
                Place a Bid
              </Button>
            </div>
            <Divider />
            <div className={homeClasses.description}>
              <Typography>
                Following the story of a marriage come undone, this moving
                book-length sequence is broken down into four seasons,
                distilling the details of the failed relationship through
                physical processes of nature, such as the buzzing life of
                wildflowers and birds that the speaker?a wife and mother?studies
                daily for clues on happiness. Intricately constructed and
                brimming with resourceful linguistic play, these poems are
                elemental odes on the end of love and its eventual renewal.
              </Typography>
            </div>
          </div>
        </div>
        <Button variant='contained' className={homeClasses.exploreButton}>
          Explore More
        </Button>
      </div>
    </div>
  );
}

export default SinglePage;
