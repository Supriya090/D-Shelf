import React from "react";
import { Typography, Button } from "@material-ui/core";
import useStyles from "../styles/Scrollbar";
import { useStyles as HomeStyles } from "../styles/Home";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import dummy from "../../assets/dummy.jpg";

function SubTitle({
  isTrending = false,
  isAuthor = false,
  onSale = false,
  isCollection = false,
}) {
  const homeClasses = HomeStyles();
  const scrollClasses = useStyles();

  console.log(isCollection);
  let saleStats;
  if (onSale) {
    saleStats = (
      <div>
        <div className={`${scrollClasses.biddings} ${homeClasses.biddings}`}>
          <div>
            Current Bid
            <div
              className={`${scrollClasses.bidNumStyle} ${homeClasses.bidNumStyle}`}>
              4 ETH{" "}
            </div>
            ($10000)
          </div>
          <div>
            Remaining Time{" "}
            <div
              className={`${scrollClasses.bidNumStyle} ${homeClasses.bidNumStyle}`}>
              10 : 22 : 29
            </div>
          </div>
        </div>
        <Button
          variant='contained'
          className={`${scrollClasses.bidButton} ${homeClasses.exploreButton}`}>
          Place a Bid
        </Button>
      </div>
    );
  }

  if (isTrending || onSale) {
    return (
      <div>
        <Typography>
          Learn to read Novels Like a Professor
          <br />
          Tips by Supriya Khadka
        </Typography>
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
  } else if (isAuthor) {
    return (
      <div className={scrollClasses.forAuthor}>
        <img src={dummy} alt='avatar' className={scrollClasses.avatar} />
        <div className={scrollClasses.authorInfo}>
          <Typography>Rahul Shah</Typography>
          <Typography style={{ marginBottom: "10px" }}>
            1000 followers
          </Typography>
          <Typography style={{ fontSize: "1.05rem" }}>
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
  } else if (isCollection) {
    return (
      <>
        <Typography>
          Learn to read Novels Like a Professor
          <br />
          Tips by Supriya Khadka
        </Typography>
        <Button
          variant='contained'
          className={`${scrollClasses.voteButton} ${homeClasses.exploreButton}`}>
          List For Sale
        </Button>
      </>
    );
  } else {
    return null;
  }
}

export default SubTitle;
