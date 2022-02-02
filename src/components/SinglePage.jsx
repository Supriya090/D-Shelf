import React from "react";
import { useStyles as homeStyles } from "./styles/Home";
import { Typography, Button } from "@material-ui/core";
import dummy from "../assets/dummy.jpg";
import { useStyles } from "./styles/SinglePage";

function SinglePage() {
  const homeClasses = homeStyles();
  const classes = useStyles();
  return (
    <div className={classes.singleContent}>
      <div className={classes.bookDetails}>
        <img src={dummy} alt='NFTImage' className={classes.NFTImage} />
        <div className={classes.details}>
          <Typography>The Crow's Vow</Typography>
          <div className={classes.buyDetails}>
            <div>
              Current Value
              <div className={homeClasses.bidNumStyle}>4 ETH </div>
              ($10000)
            </div>
            <Button
              variant='contained'
              className={homeClasses.exploreButton}
              style={{ marginTop: "0px" }}>
              Buy Now
            </Button>
          </div>
          <div className={classes.bidDetails}>
            <div className={classes.left}>
              Title
              <br />
              Minted Date
              <br />
              Status
              <div style={{ marginTop: "50px" }}>
                Creator
                <br />
                <span style={{ color: "#FFD600" }}>Rahul Shah</span>
              </div>
            </div>
            <div className={classes.right}>
              The Crow's Vow
              <br />
              20 Oct, 2021
              <br />
              On Sale
              <div style={{ marginTop: "50px" }}>
                Owner
                <br />
                <span style={{ color: "#26EC8D" }}>Rahul Shah</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.description}>
        <Typography
          style={{
            fontSize: "1.5rem",
            color: "#FFD600",
            marginBottom: "10px",
          }}>
          Description
        </Typography>
        <Typography>
          Following the story of a marriage come undone, this moving book-length
          sequence is broken down into four seasons, distilling the details of
          the failed relationship through physical processes of nature, such as
          the buzzing life of wildflowers and birds that the speaker, a wife and
          mother, studies daily for clues on happiness. Intricately constructed
          and brimming with resourceful linguistic play, these poems are
          elemental odes on the end of love and its eventual renewal.
        </Typography>
      </div>
    </div>
  );
}

export default SinglePage;
