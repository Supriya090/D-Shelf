import React from "react";
import { TextField, Typography, Button } from "@material-ui/core";
import useStyles from "../styles/Scrollbar";
import { useStyles as HomeStyles } from "../styles/Home";
import { useStyles as PopStyles } from "../styles/Popup";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import dummy from "../../assets/dummy.jpg";
import { usePalette } from "react-palette";
import Popup from "reactjs-popup";
import { bookAddress } from "../../bookABI.js";

function SubTitle (props) {
  const homeClasses = HomeStyles();
  const popClasses = PopStyles();
  const scrollClasses = useStyles();
  const { data } = usePalette(props.src);

  const [price, setPrice] = React.useState(null);
  let saleStats;
  let marketContract;

    // Need to get the total token ids of user for that specific content
    // Done by filtering common number of array tokenids and user owned token ids
  const CreateMarketItem = async() => {
    if (price != null) {
      props
      .setup()
      .then((value) => {
        marketContract = value[2];
        //need to get token id
        const tokenId = 1;
        marketContract.createMarketItem(bookAddress, tokenId, price)
        .then(async(transaction) => {
          console.log(transaction);
          const receipt = await transaction.wait();
          console.log(receipt);
          alert("Successfully listed for sale!");
        })
        .catch(err => {
          console.log(err);
          alert("Failed to list for sale!");
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }else{
      alert("Please enter a valid price!");
    }
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
              variant='contained'
              className={`${scrollClasses.bidButton} ${homeClasses.exploreButton}`}>
              Buy Now
            </Button>
            <Button
              variant='contained'
              className={`${scrollClasses.bidButton} ${homeClasses.exploreButton}`}
              style={{ backgroundColor: "#C9B037" }}>
              Gold
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
  } else if (props.isAuthor) {
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
  } else if (props.isCollection) {
    return (
      <>
        <Typography>
          Learn to read Novels Like a Professor
          <br />
          Tips by Supriya Khadka
        </Typography>

        <Popup
          trigger={<Button
              variant='contained'
              className={`${scrollClasses.voteButton} ${homeClasses.exploreButton}`}>
              List For Sale
            </Button>
          }
          modal
        >
        {close => (
          <div >
            <button  className={popClasses.close} onClick={close}>
              &times;
            </button>
            <div >
              <input
                type='text'
                placeholder='Price'
                autofocus='autofocus'
                onChange={ event => { setPrice(event.target.value) }}
                />
            </div>
            <button
              className={`${scrollClasses.followButton} ${homeClasses.exploreButton}`}
              onClick={CreateMarketItem}
            >
              Create Listing
            </button>
          </div>
        )}
      </Popup>
      </>
    );
  } else {
    return null;
  }
}

export default SubTitle;
