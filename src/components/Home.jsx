import { Button, Divider, Typography, Tooltip, Badge } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useStyles as marketStyles } from "./styles/MarketPlace";
import dummy from "../assets/dummy.jpg";
import { useStyles } from "./styles/Home";
import HorizontalScrolling from "./elements/HorizontalScroll";
import { content } from "./elements/dummyImages";
import ListHead from "./elements/ListHead";
import { useNavigate } from "react-router";
import ReadMore from "./elements/ReadMore";
import loader from "../assets/loading-yellow.gif";

const auctionContent = content;

const Home = (props) => {
  var bookContract;
  var marketContract;
  var provider;
  var signer;

  const marketClasses = marketStyles();

  const classes = useStyles();
  const [goldContents, setGoldContents] = useState([]);
  const [silverContents, setSilverContents] = useState([]);
  const [bronzeContents, setBronzeContents] = useState([]);
  const [featuredContent, setFeaturedContent] = useState({});
  const [listedContent, setlistedContent] = useState([]);
  const [RecentlyMinted, setRecentlyMinted] = useState([]);
  const [price, setPrice] = useState(null);

  let color;
  if (featuredContent.tokenType === 0) {
    color = "#C9B037";
  } else if (featuredContent.tokenType === 1) {
    color = "#B4B4B4";
  } else {
    color = "#AD8A56";
  }

  const navigate = useNavigate();
  const marketRoute = () => {
    navigate("/marketplace", { replace: true });
  };
  const singleRoute = () => {
    navigate("/singlePage", { replace: true });
  };

  useEffect(() => {
    const addContent = (content, item = { tokenId: "a", itemId: "b" }, price) => {
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
        price: price,
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
        //All listed content in reverse limited to top of 10
        const items = await marketContract.fetchMarketItems();
        let listedcontent = [];
        for (const item of items) {
          const content = await bookContract.getContentofToken(item.tokenId);
          const price = await marketContract.getPrice(item.tokenId);
          console.log("ok",content ,price);
          listedcontent.push(addContent(content, item, price.toNumber()));
        }
        let contents = []
        for(const content of listedcontent){
          contents.push(content)
        }
        contents = contents.reverse().slice(0, 10);
        console.log(contents);
        setlistedContent(contents);

        //Featured content
        const tokenId = items[items.length - 1].tokenId;
        const content = await bookContract.getContentofToken(tokenId);
        console.log("Feature content:", content);
        setFeaturedContent(addContent(content, items[items.length - 1]));

        const listing = await marketContract.getPrice(tokenId);
        console.log("listing", listing);
        setPrice(listing.toNumber() / 1000000000);
        //Recently minted content limited to top of 10
        console.log("Recently minted:", props.title);
        setRecentlyMinted(props.title.reverse().slice(0, 10));

        // bookContract.getContentsOfEachTokenType("gold").then((GoldContents) => {
        //   console.log("All gold Content : ", GoldContents);
        //   setGoldContents(GoldContents);
        //   //Render Gold Content
        // });
        // bookContract
        //   .getContentsOfEachTokenType("silver")
        //   .then((SilverContents) => {
        //     //Render Silver Content
        //     console.log("All silver Content : ", SilverContents);
        //     setSilverContents(SilverContents);
        //   });
        // bookContract
        //   .getContentsOfEachTokenType("bronze")
        //   .then((BronzeContents) => {
        //     //Render Bronze Content
        //     console.log("All Bronze Content : ", BronzeContents);
        //     setBronzeContents(BronzeContents);
        //   });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.connButtonText, props.title]);

  const inDollars = "$ " + price * 2580;
  return (
    <div className={classes.mainContent}>
      <div className={classes.featuredContent}>
        <div className={classes.featured}>
          <Typography>Featured Content</Typography>
          <div className={classes.NFTFeatures}>
            <div>
              <div className={classes.owner}>
                <Typography>
                  Title : {featuredContent.title} <br /> Owner :{" "}
                  {featuredContent.author} ({featuredContent.authorAddr} ){" "}
                  <br />
                  Author : {featuredContent.author} <br />
                </Typography>
                <div className={classes.badges}>
                  <Badge
                    className={classes.badge}
                    style={{ backgroundColor: `${color}` }}>
                    {console.log(featuredContent.tokenType)}
                    {(() => {
                      switch (featuredContent.tokenType) {
                        case 0:
                          return "GOLD";
                        case 1:
                          return "SILVER";
                        case 2:
                          return "BRONZE";
                      }
                    })()}
                  </Badge>
                  <Tooltip title={inDollars}>
                    <Badge
                      className={classes.badge}
                      style={{
                        color: "#fff",
                        backgroundColor: "#000",
                        fontSize: "1rem",
                        marginTop: "10px",
                      }}>
                      {price} ETH
                    </Badge>
                  </Tooltip>
                </div>
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
          <ListHead title={"Recently Listed"} leftButton={"On Sale"} />
          {listedContent.length === 0 ? (
            <img
              src={loader}
              className={marketClasses.loader}
              alt='loading...'
            />
          ) : (
            <HorizontalScrolling
              getItems={listedContent}
              isTrending={false}
              onSale={true}
              buyContent={props.buyContent}
            />
          )}
        </div>
        <div className={classes.auctions}>
          <ListHead title={"Recently Minted"} leftButton={"New Content"} />
          {console.log(RecentlyMinted)}
          {RecentlyMinted.length === 0 ? (
            <img
              src={loader}
              className={marketClasses.loader}
              alt='loading...'
            />
          ) : (
            <HorizontalScrolling
              getItems={RecentlyMinted}
              isTrending={true}
              onSale={false}
            />
          )}
        </div>
        <div className={classes.notableCreators} style={{ marginTop: "80px" }}>
          <ListHead
            title={"Notable Writers"}
            leftButton={"Popular"}
            // hasRightButton={true}
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
