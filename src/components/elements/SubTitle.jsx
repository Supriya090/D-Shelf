import React from "react";
import { TextField, Typography, Button, Badge } from "@material-ui/core";
import useStyles from "../styles/Scrollbar";
import { useStyles as HomeStyles } from "../styles/Home";
import { useStyles as PopStyles } from "../styles/Popup";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import dummy from "../../assets/dummy.jpg";
import { usePalette } from "react-palette";
import PopupBox from "./Popup";
import { bookAddress } from "../../bookABI.js";

function SubTitle(props) {
  const homeClasses = HomeStyles();
  const scrollClasses = useStyles();
  const { data } = usePalette(props.src);
  // const options = props.OwnedCollectionIds
  // console.log(options);
  let saleStats;
  let CollectionsaleStats;

  const unlist = async () => {
    props.setup().then(async(value) => {
      const marketContract = value[2];
      await marketContract.removeMarketItem(bookAddress, props.tokenId).then(async (transaction) => {
        console.log(transaction);
        props.CollectionOnSale = false;
        props.OnSale = false;
      });
    });
  }

  if (props.onSale) {
    saleStats = (
      <div>
        <div className={`${scrollClasses.biddings} ${homeClasses.biddings}`}>
          <div>
            Current Value
            <div
              className={`${scrollClasses.bidNumStyle} ${homeClasses.bidNumStyle}`}>
              4 ETH{" "}
            </div>
            ($10000)
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Badge
              className={scrollClasses.badge}
              style={{ backgroundColor: "#C9B037" }}>
              Gold
            </Badge>
            <Button
              variant='contained'
              onClick={props.buyContent}
              className={`${scrollClasses.bidButton} ${homeClasses.exploreButton}`}>
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    );
  }
  if (props.CollectionOnSale) {
    CollectionsaleStats = (
      <div>
        <div className={`${scrollClasses.biddings} ${homeClasses.biddings}`}>
          <div>
            Current Value
            <div
              className={`${scrollClasses.bidNumStyle} ${homeClasses.bidNumStyle}`}>
              4 ETH{" "}
            </div>
            ($10000)
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Badge
              className={scrollClasses.badge}
              style={{ backgroundColor: "#C9B037" }}>
              Gold
            </Badge>
            <Button
              variant='contained'
              onClick={unlist}
              className={`${scrollClasses.bidButton} ${homeClasses.exploreButton}`}>
              Unlist Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (props.isTrending || props.onSale) {
    return (
      <div>
        <Typography>{props.title}</Typography>
        <Typography>Author: {props.author}</Typography>
        <div className={scrollClasses.voteButtons}>
          <Button
            variant='contained'
            className={`${scrollClasses.voteButton} ${homeClasses.exploreButton}`}>
            14 <ArrowUpwardRoundedIcon className={scrollClasses.voteArrow} />
            Upvote
          </Button>
          <Button
            variant='contained'
            className={`${scrollClasses.voteButton} ${homeClasses.exploreButton}`}>
            3 <ArrowDownwardRoundedIcon className={scrollClasses.voteArrow} />{" "}
            Downvote
          </Button>
        </div>
        {saleStats}
      </div>
    );
  } 
  if (props.CollectionOnSale) {
    return (
      <div>
        <Typography>{props.title}</Typography>
        <Typography>Author: {props.author}</Typography>
        {CollectionsaleStats}
      </div>
    );
  } 
  else if (props.isAuthor) {
    return (
      <div
        className={scrollClasses.forAuthor}
        style={{ backgroundColor: data.darkMuted }}>
        <img src={dummy} alt='avatar' className={scrollClasses.avatar} />
        <div className={scrollClasses.authorInfo}>
          <Typography>Author: {props.author}</Typography>
          <Typography style={{ marginBottom: "10px" }}>
            1000 followers
          </Typography>
          <Typography style={{ fontSize: "0.85rem" }}>
            I'm a five star basketball skills development coach for youth to
            professional talent. I'm passionate about implementing integrity and
            joy into my players. That's kinda how my meme came about!
          </Typography>
          <Button
            variant='contained'
            className={`${scrollClasses.followButton} ${homeClasses.exploreButton}`}>
            Follow
          </Button>
        </div>
      </div>
    );
  } else if (props.isCollection && props.OwnedCollectionIds) {
    return (
      <>
        <Typography style={{ marginBottom: "10px" }}>{props.title}</Typography>
        <Typography style={{ marginTop: "10px" }}>
          Author: {props.author}
        </Typography>
        <PopupBox
          author={props.author}
          setup={props.setup}
          OwnedCollectionIds={props.OwnedCollectionIds}
          title={props.title}
          tokenType={props.tokenType}
        />
      </>
    );
  } else {
    return null;
  }
}

export default SubTitle;
