import React from "react";
import {
  TextField,
  Typography,
  Button,
  Badge,
  Divider,
} from "@material-ui/core";
import Popup from "reactjs-popup";
import useStyles from "../styles/Scrollbar";
import { useStyles as HomeStyles } from "../styles/Home";
import { useStyles as PopStyles } from "../styles/Popup";
import { useStyles as WriteStyles } from "../styles/Write";
import { useState } from "react";
import { ethers } from "ethers";
import { bookAddress } from "../../bookABI.js";

const PopupBox = (props) => {
  const popClasses = PopStyles();
  const homeClasses = HomeStyles();
  const scrollClasses = useStyles();
  const writeClasses = WriteStyles();
  const [selectedToken, setSelectedToken] = useState(props.OwnedCollectionIds[0]);
  const [price, setPrice] = React.useState(null);
  let marketContract;

  let color;
  if (props.tokenType === 0) {
    color = "#C9B037";
  } else if (props.tokenType === 1) {
    color = "#B4B4B4";
  } else {
    color = "#AD8A56";
  }

  //   const color = "#C9B037";
  // Need to get the total token ids of user for that specific content
  // Done by filtering common number of array tokenids and user owned token ids
  const CreateMarketItem = async () => {
    if (price != null) {
      props
        .setup()
        .then((value) => {
          marketContract = value[2];
          const precision = 1000000000
          const pricing = ethers.BigNumber.from(Math.floor(price*precision));
          // let token;
          // if ((selectedToken >= 0)) {
          //   token = selectedToken;
          // }
          // else{
          //   token = props.OwnedCollectionIds[0];
          // }

          console.log("selected token 2", selectedToken, props.authorAddr);
          // console.log(tokenId);
          console.log(pricing);
          marketContract
            .createMarketItem(bookAddress, selectedToken, pricing,props.authorAddr)
            .then(async (transaction) => {
              console.log(transaction);
              const receipt = await transaction.wait();
              console.log(receipt);
              alert("Successfully listed for sale!");
            })
            .catch((err) => {
              console.log(err);
              alert("Failed to list for sale!");
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please enter a valid price!");
    }
  };
  return (
    <Popup
      trigger={
        <Button
          variant='contained'
          className={`${scrollClasses.voteButton} ${homeClasses.exploreButton}`}>
          List For Sale
        </Button>
      }
      modal>
      {(close) => (
        <div className={popClasses.modal}>
          <button className={popClasses.close} onClick={close}>
            &times;
          </button>
          <div className={popClasses.header}>
            {" "}
            <Typography style={{ marginBottom: "10px" }}>
              {props.title} (By {props.author})
            </Typography>
            <Badge
              className={scrollClasses.badge}
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
          </div>
          <div className={popClasses.content}>
            <div className={writeClasses.writerForm}>
              <div className={popClasses.tokenSelect}>
                <label>Choose Token Number</label>
                <select onChange={(e) => setSelectedToken(e.target.value)}>
                  {props.OwnedCollectionIds.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              {console.log("selectedddddd : ",selectedToken)}
              <TextField
                id='price'
                label='Price (ETH)'
                variant='outlined'
                name='price'
                type='number'
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
                className={popClasses.textField}
              />
            </div>
          </div>
          <Button
            variant='contained'
            className={`${scrollClasses.voteButton} ${homeClasses.exploreButton}`}
            onClick={CreateMarketItem}>
            Create Listing
          </Button>
        </div>
      )}
    </Popup>
  );
};

export default PopupBox;
