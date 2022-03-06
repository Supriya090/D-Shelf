import React, { useState } from "react";
import { useStyles as homeStyles } from "./styles/Home";
import { Typography, Button } from "@material-ui/core";
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
  const { id, itemId, price } = useParams();
  const homeClasses = homeStyles();
  const classes = useStyles();
  const [content, setContent] = useState({});
  const [pdf, setpdf] = useState(null);
  const [EncryptionKey, setEncryptionKey] = useState(null);
;
  var bookContract;
  var url;
  // var LoadData;
  // var LoadPdf;

//   const LoadData = () => {
//     if(EncryptionKey !== "0x0000000000000000000000000000000000000000000000000000000000000000"){
//     return (<>
//       {LoadPdf}
//     </>
//     );
//   }
//   else{
//     return (
//       <div ><Typography >Buy Book to view Contents</Typography></div>
//     );
//   }
// }

// const LoadPdf =() => {
//  if(pdf){
//     console.log("pdf", pdf);
//     console.log("encryption key", EncryptionKey);
//     return (
//       <div className={classes.sPViewer}>
//         <PDFViewer pdfBase64={pdf} decryptKey={EncryptionKey}/>
//       </div>
//     );
//   }
//   else{
//     return (
//     <div className={classes.sPViewer}>
//       <img src={loader} alt="loading" />
//     </div>
//     );
//   }
// }
  function getContent() {
    return new Promise((resolve, reject) => {
      if (props.connButtonText === "Wallet Connected") {
        props.setup().then((value) => {
          bookContract = value[1];
          console.log("bookContract", bookContract);
          resolve(bookContract);
        });
      } else {
        props.unsetup().then((value) => {
          bookContract = value[0];
          console.log("bookContract", bookContract);
          resolve(bookContract);
        });
      }
    });
  }

  useEffect(() => {
    function Get() {
      getContent().then(async (bookContract) => {
        const content = await bookContract.getContentbyCID(id)
        url = content.descriptionHash;
        setContent(content);
        await bookContract.getEncryptionKey(id)
        .then((encryptionKey) => {
          if(encryptionKey == "0x0000000000000000000000000000000000000000000000000000000000000000"){
            setEncryptionKey(null);
          }else{
            setEncryptionKey(encryptionKey);
          }
          console.log("EncryptionKey", EncryptionKey)
        })
      })
      .then(async () => {
        if(EncryptionKey !== null){
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
  }, [props.connButtonText]);

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
  const date = new Date(publicationDate).toString();

  console.log(publicationDate);

  const inDollars = price * 2663;

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
                <div>
                  Current Value
                  <div className={homeClasses.bidNumStyle}>{price} ETH </div>$
                  {inDollars}
                </div>
                <Button
                  variant='contained'
                  onClick={props.buyContent.bind(this, itemId,price)}
                  className={homeClasses.exploreButton}
                  style={{ marginTop: "0px" }}>
                  Buy Now
                </Button>
                <Button
                  variant='contained'
                  className={homeClasses.exploreButton}
                  style={{ marginTop: "0px" }}>
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
                </Button>
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
                  {/* {publicationDate} */}
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
      {
        props.connButtonText === "Wallet Connected" ? (
        <>
        {
          EncryptionKey && pdf ? (
            <div className={classes.sPViewer}>
              <PDFViewer pdfBase64={pdf} decryptKey={EncryptionKey}/>
            </div>
          ) : (<div><Typography 
            style={{
            fontSize: "1.5rem",
            color: "#FFD600",
            marginBottom: "10px",
          }}
          >Buy this Book to View</Typography></div>)
        }
        </>
        ):(<div><Typography 
          style={{
          fontSize: "1.5rem",
          color: "#FFD600",
          marginBottom: "10px",
        }}
        >Connect your Wallet</Typography></div>)
      }
    </div>
  );
}

export default SinglePage;
