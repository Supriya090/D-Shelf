import { Button, Divider, Typography } from "@material-ui/core";
import React from "react";
import dummy from "../assets/dummy.jpg";
import ReadMore from "./elements/ReadMore";
import { useStyles } from "./styles/Home";
import HorizontalScrolling from "./elements/HorizontalScroll";
import { content } from "./elements/dummyImages";
import ListHead from "./elements/ListHead";
import { useNavigate } from "react-router";

const auctionContent = content;

const Home = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const marketRoute = () => {
    navigate("/marketplace", { replace: true });
  };
  const singleRoute = () => {
    navigate("/singlePage", { replace: true });
  };

  return (
    <div className={classes.mainContent}>
      <div className={classes.featuredContent}>
        <div className={classes.featured}>
          <Typography>Featured Contents</Typography>
          <div className={classes.NFTFeatures}>
            <div>
              <div className={classes.owner}>
                <Typography>
                  Title : The Crow&apos;s Vow <br /> Owner : Susan Briscoe (
                  0xD43f4536...5e4 ) <br />
                  Author : Susan Briscoe <br />
                </Typography>
                <Button variant='contained' className={classes.exploreButton}>
                  Place a Bid
                </Button>
              </div>
              <Divider />
              <ReadMore>
                <div className={classes.description}>
                  <Typography>
                    Following the story of a marriage come undone, this moving
                    book-length sequence is broken down into four seasons,
                    distilling the details of the failed relationship through
                    physical processes of nature, such as the buzzing life of
                    wildflowers and birds that the speaker?a wife and
                    mother?studies daily for clues on happiness. Intricately
                    constructed and brimming with resourceful linguistic play,
                    these poems are elemental odes on the end of love and its
                    eventual renewal.
                  </Typography>
                </div>
              </ReadMore>
            </div>
          </div>
          <Button variant='contained' className={classes.exploreButton}>
            Explore More
          </Button>
        </div>
        <div className={classes.currentBid}>
          <img src={dummy} alt='NFTImage' className={classes.NFTImage} />
          <div className={classes.biddings}>
            <div>
              Current Bid
              <div className={classes.bidNumStyle}>4 ETH </div>
              ($10000)
            </div>
            <div>
              Remaining Time{" "}
              <div className={classes.bidNumStyle}>10 : 22 : 29</div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.itemsList}>
        <div className={classes.auctions}>
          <ListHead
            title={"On Auctions"}
            leftButton={"On Sale"}
            hasRightButton={false}
          />
          <HorizontalScrolling getItems={auctionContent} />
        </div>
        <div className={classes.notableContents}>
          <ListHead
            title={"Notable Contents"}
            leftButton={"Trending"}
            hasRightButton={true}
          />
          <HorizontalScrolling getItems={auctionContent} />
        </div>
        <div className={classes.notableCreators}>
          <ListHead
            title={"Notable Writers"}
            leftButton={"Popular"}
            hasRightButton={true}
          />
          <HorizontalScrolling getItems={auctionContent} />
        </div>
      </div>
      <Button
        variant='contained'
        className={classes.exploreButton}
        style={{ margin: "50px 0px" }}
        onClick={marketRoute}>
        Explore Marketplace
      </Button>
    </div>
  );
};

export default Home;
