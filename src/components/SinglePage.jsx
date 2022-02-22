import React, { useState } from "react";
import { useStyles as homeStyles } from "./styles/Home";
import { Typography, Button } from "@material-ui/core";
import dummy from "../assets/dummy.jpg";
import { useStyles } from "./styles/SinglePage";
import PDFViewer from "./PDFViewer";
import pdf from "../assets/pdf";
import { useParams } from "react-router-dom";
import loader from "../assets/loading-yellow.gif";
import { useEffect } from "react";
import CryptoJS from "crypto-js";

function SinglePage(props) {

  const { id } = useParams();
  const homeClasses = homeStyles();
  const classes = useStyles();
  const [content, setContent] = useState({});
  const [pdf, setpdf] = useState(null);
  var bookContract;

    function getContent() {
     return new Promise( (resolve, reject) => {
      if(props.connButtonText === "Wallet Connected"){
        props.setup()
        .then(
          value => {
            bookContract = value[1]
            console.log("bookContract", bookContract);
            resolve(bookContract);
        })
      }else{
        props.unsetup()
        .then(
          value => {
            bookContract = value[0]
            console.log("bookContract", bookContract);
            resolve(bookContract);
        })
      }
    })
  }

  useEffect(() => {
    function Get(){
    getContent()
    .then( async(bookContract) => {
      console.log("bookContract", bookContract)
    await bookContract.getContentbyCID(id)
    .then(async(content)=>  {
      setContent(content)
      await fetch(content.descriptionHash)
      .then(async(raw) => {
        await raw.text()
        .then(text => {
          console.log("text", text);
          // var encrypted = CryptoJS.AES.decrypt(text, "secret key 123");
          // var decrypted = encrypted.toString(CryptoJS.enc.Utf8);
          setpdf(text);
        })
      })
    })
    .catch(err=>{
      console.log("Fetch Error",err);
    })
  })}
  Get()
  }, [props.connButtonText])

  const { cid, author, authorAddr, contentType, coverImageHash, description, 
          descriptionHash, publicationDate, title, tokenIds, tokenType } = content
  const date = new Date(publicationDate).toString();

  console.log("encryptedPdf 2 : ", pdf);
  return (
    <div className={classes.singleContent}>
      <div className={classes.bookDetails}>
        {content.length < 0 ?(
              <img
                src={loader}
                alt='loading...'
              />
            ):( 
            <>
            <img src={coverImageHash} alt='NFTImage' className={classes.NFTImage} />
            <div className={classes.details}>
              <Typography>{title}</Typography>
              <div className={classes.buyDetails}>
                <div>
                  Current Value
                  <div className={homeClasses.bidNumStyle}>4 ETH </div>
                  ($10000)
                </div>
                <Button
                  variant='contained'
                  onClick={props.buyContent}
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
                      case 0:   return "GOLD";
                      case 1: return "SILVER";
                      case 2:  return "BRONZE";
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
                  {date}
                  <br />
                  On Sale
                  <div style={{ marginTop: "50px" }}>
                    Owner
                    <br />
                    <span style={{ color: "#26EC8D" }}>{`Holders : ${tokenIds}`}</span>
                  </div>
                </div>
              </div>
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
            <Typography>
              {description}
            </Typography>
          </div>
          {pdf ? (
          <div className={classes.sPViewer}>
              <PDFViewer pdfBase64={pdf} />
          </div>) : (<div>Loading ...</div>)}
        </>
        )}
      </div>
    </div>
  );
}

export default SinglePage;
