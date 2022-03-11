import React from "react";
import { Typography, Button, Badge } from "@material-ui/core";
import useStyles from "../styles/Scrollbar";
import { useStyles as HomeStyles } from "../styles/Home";
// import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
// import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
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

  let color;
  if (props.tokenType === 0) {
    color = "#C9B037";
  } else if (props.tokenType === 1) {
    color = "#B4B4B4";
  } else {
    color = "#AD8A56";
  }

  console.log(props);
  const unlist = async () => {
    props.setup().then(async (value) => {
      const marketContract = value[2];
      await marketContract
        .removeMarketItem(bookAddress, props.tokenId)
        .then(async (transaction) => {
          console.log(transaction);
          props.CollectionOnSale = false;
          props.OnSale = false;
        });
    });
  };

  if (props.onSale) {
    saleStats = (
      <div>
        <div className={`${scrollClasses.biddings} ${homeClasses.biddings}`}>
          <div>
            Current Value
            <div
              className={`${scrollClasses.bidNumStyle} ${homeClasses.bidNumStyle}`}>
              {props.price}
            </div>
            ${props.price * 2657}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
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
              ${props.price * 2657}
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
        {/* <div className={scrollClasses.voteButtons}>
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
        </div> */}
        <Badge
          className={homeClasses.badge}
          style={{ backgroundColor: `${color}` }}>
          {(() => {
            switch (props.tokenType) {
              case 0:
                return "GOLD";
              case 1:
                return "SILVER";
              case 2:
                return "BRONZE";
            }
          })()}
        </Badge>
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
  } else if (props.isAuthor) {
    return (
      <div
        className={scrollClasses.forAuthor}
        style={{ backgroundColor: data.darkMuted }}>
        <img src={props.avatar} alt='avatar' className={scrollClasses.avatar} />
        <div className={scrollClasses.authorInfo}>
          <Typography style={{ marginTop: "5px" }}>
            Author: {props.author}
          </Typography>
          <Typography style={{ marginBottom: "15px" }}>
            {props.followers} Followers
          </Typography>
          <Typography style={{ fontSize: "0.8rem" }}>
            {props.authorDescription}
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
          authorAddr={props.authorAddr}
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
