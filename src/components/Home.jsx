import { Button, Divider, Typography, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import dummy from "../assets/dummy.jpg";
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
  const [goldContents, setGoldContents] = useState([]);
  const [silverContents, setSilverContents] = useState([]);
  const [bronzeContents, setBronzeContents] = useState([]);
  const [featuredContent, setFeaturedContent] = useState({});

  const navigate = useNavigate();
  const marketRoute = () => {
    navigate("/marketplace", { replace: true });
  };
  const singleRoute = () => {
    navigate("/singlePage", { replace: true });
  };

  useEffect(() => {
    const addContent = (content, item = { tokenId: "a", itemId: "b" }) => {
      let listed = {
        tokenId: item.tokenId,
        tokenIds: content.tokenIds,
        itemId: item.itemId,
        title: content.title,
        tokenType: content.tokenType,
        cid: content.cid,
        publicationDate: content.publicationDate,
        author: content.author,
        authorAddr: content.authorAddr,
        coverImageHash: content.coverImageHash,
        descriptionHash: content.descriptionHash,
        description: content.description,
        price: item.price,
      };
      return listed;
    };
    props
      .unSetup()
      .then((value) => {
        bookContract = value[0];
        marketContract = value[1];
        provider = value[2];
        signer = value[3];
      })
      .then(async () => {
        const items = await marketContract.fetchMarketItems();
        console.log(items);
        const tokenId = items[items.length - 1].tokenId;
        const cid = (await bookContract.getContentIndexByID(tokenId))[0];
        const content = await bookContract.getContentbyCID(cid);
        console.log("Feature content:", content);
        setFeaturedContent(addContent(content, items[items.length - 1]));

        bookContract.getContentsOfEachTokenType("gold").then((GoldContents) => {
          console.log("All gold Content : ", GoldContents);
          setGoldContents(GoldContents);
          //Render Gold Content
        });
        bookContract
          .getContentsOfEachTokenType("silver")
          .then((SilverContents) => {
            //Render Silver Content
            console.log("All silver Content : ", SilverContents);
            setSilverContents(SilverContents);
          });
        bookContract
          .getContentsOfEachTokenType("bronze")
          .then((BronzeContents) => {
            //Render Bronze Content
            console.log("All Bronze Content : ", BronzeContents);
            setBronzeContents(BronzeContents);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.connButtonText]);

  return (
    <div className={classes.mainContent}>
      <div className={classes.featuredContent}>
        <div className={classes.featured}>
          <Typography>Featured Contents</Typography>
          <div className={classes.NFTFeatures}>
            <div>
              <div className={classes.owner}>
                <Typography>
                  Title : {featuredContent.title} <br /> Owner :{" "}
                  {featuredContent.author} ({featuredContent.authorAddr} ){" "}
                  <br />
                  Author : {featuredContent.author} <br />
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
                    2 ETH
                  </Button>
                </Tooltip>
              </div>
              <Divider />
              <ReadMore content={featuredContent}>
                <div className={classes.description}>
                  <Typography>{featuredContent.description}</Typography>
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
          <img
            src={featuredContent.coverImageHash}
            className={classes.NFTImage}
            onError={(e) => {
              e.target.onerror = null; // prevents looping
            }}
          />
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
