import { Button, Divider, Typography, Tooltip } from "@material-ui/core";
import React, { useEffect } from "react";
import dummy from "../assets/dummy.jpg";
import dummy2 from "../assets/dummy1.jpg";
import { useStyles } from "./styles/Home";
import HorizontalScrolling from "./elements/HorizontalScroll";
import { content } from "./elements/dummyImages";
import ListHead from "./elements/ListHead";
import { useNavigate } from "react-router";
import ReadMore from "./elements/ReadMore";

const auctionContent = content;

const Home = (props) => {

  var bookContract; 
  var marketContract;
  var provider;
  var signer;

  const classes = useStyles();
  const navigate = useNavigate();
  const marketRoute = () => {
    navigate("/marketplace", { replace: true });
  };
  const singleRoute = () => {
    navigate("/singlePage", { replace: true });
  };

  useEffect(() => {
    props.unSetup()
    .then(
      value => {
        bookContract = value[0] 
        marketContract = value[1] 
        provider = value[2]
        signer = value[3]
      })
      .then(()=>{
        bookContract.getContentsOfEachTokenType("gold")
        .then(GoldContents=>{
          console.log("All gold Content : ", GoldContents);
          //Render Gold Content
        })
        bookContract.getContentsOfEachTokenType("silver")
        .then(SilverContents=>{
          //Render Silver Content
          console.log("All silver Content : ", SilverContents);
        })
        bookContract.getContentsOfEachTokenType("bronze")
        .then(BronzeContents=>{
          console.log("All Bronze Content : ", BronzeContents);
          //Render Bronze Content
        })

      })
      .catch(err=>{
        console.log(err);
      })
  }, [])


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
                <Tooltip title='$10000'>
                  <Button
                    variant='contained'
                    className={classes.exploreButton}
                    style={{
                      color: "#fff",
                      backgroundColor: "#000",
                      fontWeight: 500,
                      cursor: "default",
                    }}>
                    4 ETH
                  </Button>
                </Tooltip>
              </div>
              <Divider />
              <ReadMore>
                <div className={classes.description}>
                  <Typography>
                    Following the story of a marriage come undone, this moving
                    book-length sequence is broken down into four seasons,
                    distilling the details of the failed relationship through
                    physical processes of nature, such as the buzzing life of
                    wildflowers and birds that the speaker's wife and mother,
                    studies daily for clues on happiness. Intricately
                    constructed and brimming with resourceful linguistic play,
                    these poems are elemental odes on the end of love and its
                    eventual renewal.
                  </Typography>
                </div>
              </ReadMore>
            </div>
          </div>
          <Button
            variant='contained'
            className={classes.exploreButton}
            style={{ marginTop: "40px" }}>
            Explore More
          </Button>
        </div>
        <div className={classes.currentBid}>
          <img src={dummy} alt='NFTImage' className={classes.NFTImage} />
        </div>
      </div>
      <div className={classes.itemsList}>
        <div className={classes.auctions}>
          <ListHead title={"On Auctions"} leftButton={"On Sale"} />
          <HorizontalScrolling getItems={auctionContent} onSale={true} />
        </div>
        <div className={classes.notableContents} style={{ marginTop: "80px" }}>
          <ListHead
            title={"Notable Contents"}
            leftButton={"Trending"}
            hasRightButton={true}
          />
          <HorizontalScrolling getItems={auctionContent} isTrending={true} />
        </div>
        <div className={classes.notableCreators} style={{ marginTop: "80px" }}>
          <ListHead
            title={"Notable Writers"}
            leftButton={"Popular"}
            hasRightButton={true}
          />
          <HorizontalScrolling getItems={auctionContent} isAuthor={true} />
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
