import React, { useState } from "react";
import { useStyles as homeStyles } from "./styles/Home";
import { Typography, Button, Badge } from "@material-ui/core";
import { useStyles } from "./styles/SinglePage";
import dummy from "../assets/dummy.jpg";
import ComputeHash from "./ComputeHash";
import PDFViewer from "./PDFViewer";
import { useParams } from "react-router-dom";
import loader from "../assets/loading-yellow.gif";
import { useEffect } from "react";
import CryptoJS from "crypto-js";
import alt from "../assets/alt.png";
import { size } from "draft-js/lib/DefaultDraftBlockRenderMap";

function SinglePage(props) {
  const precision = 1000000000;
  const { tokenId } = useParams();
  const homeClasses = homeStyles();
  const classes = useStyles();
  const [content, setContent] = useState({});
  const [pdf, setpdf] = useState(null);
  const [price, setPrice] = useState(null);
  const [EncryptionKey, setEncryptionKey] = useState(null);
  const [buy, setbuy] = useState(null);
  var bookContract;
  var marketContract;
  var url;

  useEffect(() => {
    async function Get() {
      // getContent()
      if (props.connButtonText === "Wallet Connected") {
        await props.setup().then((value) => {
          bookContract = value[1];
          marketContract = value[2];
          console.log("bookContract", bookContract);
          console.log("market", marketContract);
        });
      } else {
        await props.unsetup().then((value) => {
          bookContract = value[0];
          marketContract = value[1];
          console.log("market", marketContract);
          console.log("bookContract", bookContract);
        });
      }
      await bookContract
        .getContentofToken(tokenId)
        .then(async (content) => {
          url = content.descriptionHash;
          setContent(content);
          const listing = await marketContract.getPrice(tokenId);
          const isListed = await marketContract.isTokenListed(tokenId);
          setbuy(isListed);
          console.log("listing", listing);
          setPrice(listing.toNumber() / precision);
          await bookContract.getEncryptionKey(tokenId).then((encryptionKey) => {
            if (
              encryptionKey ===
              "0x0000000000000000000000000000000000000000000000000000000000000000"
            ) {
              setEncryptionKey(null);
            } else {
              setEncryptionKey(encryptionKey);
            }
            console.log("EncryptionKey", EncryptionKey);
          });
        })
        .then(async () => {
          if (EncryptionKey !== null) {
            await fetch(url)
              .then((raw) => {
                return raw.blob();
              })
              .then((blob) => {
                var reader = new FileReader();
                reader.readAsText(blob);
                reader.onloadend = function () {
                  var base64data = reader.result;
                  setpdf(base64data);
                };
              });
          }
        })
        .catch((err) => {
          console.log("Fetch Error", err);
        });
    }
    Get();
  }, [props.connButtonText, EncryptionKey, price, buy]);

  const {
    cid,
    author,
    authorAddr,
    contentType,
    coverImageHash,
    description,
    descriptionHash,
    publicationDate,
    title,
    tokenIds,
    tokenType,
  } = content;
  const date = new Date(Number(publicationDate)).toString();
  var splitDate = date.split(" ");
  let color;
  if (tokenType === 0) {
    color = "#C9B037";
  } else if (tokenType === 1) {
    color = "#B4B4B4";
  } else {
    color = "#AD8A56";
  }
  const inDollars = price * 2580;

  return (
    <div className={classes.singleContent}>
      <div className={classes.bookDetails}>
        {content.length < 0 ? (
          <img src={loader} alt='loading...' />
        ) : (
          <>
            <img
              src={coverImageHash}
              alt='NFTImage'
              className={classes.NFTImage}
              onError={(e) => {
                e.target.src = alt;
                e.target.onerror = null; // prevents looping
              }}
            />
            <div className={classes.details}>
              <Typography>{title}</Typography>
              <div className={classes.buyDetails}>
                {buy ? (
                  <div>
                    Current Value
                    <div className={homeClasses.bidNumStyle}>{price} ETH </div>$
                    {inDollars}
                  </div>
                ) : (
                  <div>Not for Sale</div>
                )}
                <Badge
                  className={homeClasses.badge}
                  style={{ marginTop: "0px", backgroundColor: `${color}` }}>
                  {(() => {
                    switch (tokenType) {
                      case 0:
                        return "GOLD";
                      case 1:
                        return "SILVER";
                      case 2:
                        return "BRONZE";
                    }
                  })()}
                </Badge>
                {buy ? (
                  <Button
                    variant='contained'
                    onClick={props.buyContent.bind(this, tokenId, price)}
                    className={homeClasses.exploreButton}
                    style={{ marginTop: "0px" }}>
                    Buy Now
                  </Button>
                ) : (
                  <></>
                )}
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
                    <span style={{ color: "#FFD600" }}>{author}</span>
                  </div>
                </div>
                <div className={classes.right}>
                  {title}
                  <br />
                  {splitDate[0]} / {splitDate[1]}-{splitDate[2]}-{splitDate[3]}
                  <br />
                  On Sale
                  <div style={{ marginTop: "50px" }}>
                    Owner
                    <br />
                    <span
                      style={{
                        color: "#26EC8D",
                      }}>{`Holders : ${tokenIds}`}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
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
        <Typography>{description}</Typography>
      </div>
      {props.connButtonText === "Wallet Connected" ? (
        <>
          {EncryptionKey && pdf ? (
            <div className={classes.sPViewer}>
              <PDFViewer pdfBase64={pdf} decryptKey={EncryptionKey} />
            </div>
          ) : (
            <div>
              <Typography
                style={{
                  fontSize: "1.5rem",
                  color: "#FFD600",
                  marginBottom: "10px",
                  fontWeight: 500,
                }}>
                Buy this Book to View
              </Typography>
            </div>
          )}
        </>
      ) : (
        <div>
          <Typography
            style={{
              fontSize: "1.5rem",
              color: "#FFD600",
              marginBottom: "10px",
            }}>
            Connect your Wallet
          </Typography>
        </div>
      )}
    </div>
  );
}

export default SinglePage;
