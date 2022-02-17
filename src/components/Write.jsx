import {
  Typography,
  TextField,
  TextareaAutosize,
  Divider,
} from "@material-ui/core";
import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from 'ipfs-http-client'

import WriteCopies from "./elements/WriteCopies";
import useStyles from "./styles/Write";

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')


const Write = (props) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const classes = useStyles();

  var defaultAccount;
  var bookContract; 
  var marketContract;
  var provider;
  var signer;
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfError, setPdfError] = useState(null);

  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
    goldNumber: 0,
    goldAmount: 0,
    silverNumber: 0,
    silverAmount: 0,
    bronzeNumber: 0,
    bronzeAmount: 0,
  });

  const handleOnChange = (event) => {
    const value = event.target.value;
    setInputValues({ ...inputValues, [event.target.name]: value });
  };


  const allowedFiles = ["application/pdf"];
  const handleFile = async (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
    
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile)
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          // let l1 = CryptoJS.AES.encrypt(e.target.result, "secret key 123").toString();
          // let l2 = CryptoJS.AES.decrypt(l1, "secret key 123").toString(CryptoJS.enc.Utf8)
          // console.log(l1)
          // console.log(l2)
          setPdfError("");
        };
        reader.onerror = function(event) {
          alert("Failed to read file!\n\n" + reader.error);
        };
      } else {
        setPdfError("Invalid file type: Please select only PDF");
        setPdfFile(null);
      }
    } 
  };

  const OnhandleMint = async(e) => {
    e.preventDefault();
    const { title, description, goldNumber, goldAmount, silverNumber, silverAmount, bronzeNumber, bronzeAmount } = inputValues;

    if (!title || !description || !goldNumber || !goldAmount || !silverNumber || !silverAmount || !bronzeNumber || !bronzeAmount){
      alert("Please fill all the fields");
      return
    } 
    if (!defaultAccount || !bookContract || !marketContract || !provider || !signer){
      alert("Please connect to Metamask / Refresh page");
      return
    } 
    console.log("content : ",title, description, goldNumber, goldAmount, silverNumber, silverAmount, bronzeNumber, bronzeAmount);
    console.log("Required : ",defaultAccount, bookContract, marketContract, provider, signer);
    let  pdfurl = null;
    let imageurl = null;
     client.add( CryptoJS.AES.encrypt(pdfFile, "secret key 123").toString(CryptoJS.enc.Utf8),
        { progress: (progress) => console.log(`Pdf received: ${progress}`) })
        .then( addedpdf => { 
          pdfurl = `https://ipfs.infura.io/ipfs/${addedpdf.path}`
          client.add( image, { progress: (progress) => console.log(`received : ${progress}`) })
          .then( addedImage => {
          imageurl = `https://ipfs.infura.io/ipfs/${addedImage.path}`
          console.log("addedImage : ",imageurl);
          console.log("addedpdf : ",pdfurl);

          let ContentMetadata = {
            title:title,
            tokenIds: [],
            tokenType: 1,
            contentType: 1,
            publicationDate: Date.now(),
            author: "Rahul Shah",
            authorAddr: defaultAccount,
            coverImageHash: imageurl,
            descriptionHash: pdfurl
          }
      
          console.log("ContentMetadata : ",ContentMetadata);
          const Amount = (goldNumber*0.003)+(silverNumber*0.002)+(bronzeNumber*0.001)+0.01; //0.01 is for the gas fee
          
            const tx = {value: ethers.utils.parseEther(Amount.toString()), gasLimit: 5000000};
            console.log("tx : ",tx);
            bookContract.mintBatch(ContentMetadata,goldNumber,silverNumber,bronzeNumber,tx)
            .then(async (transaction) => {
              await transaction.wait();
              console.log("transaction :", transaction);
              alert("Successfully minted , Your total tokens: ", await bookContract.balanceOf(defaultAccount));
              //Render Back to Home Page
            })
            .catch(error => {
              console.log("Error while signing: ", error);
            })
          })
        })
        .catch(error => {
          console.log('Error Minting: ', error)
        })
    

  };

  useEffect(() => {
    if (props.connButtonText === "Wallet Connected") {
      props.setup()
      .then(
        value => {
          defaultAccount = value[0]
          bookContract = value[1] 
          marketContract = value[2] 
          provider = value[3]
          signer = value[4]
          console.log("from useEffect : ",defaultAccount, bookContract, marketContract, provider, signer);
        })
        .catch(err=>{
          console.log(err);
        })
    }

  }, [props.connButtonText]);

  return (
    <div className={classes.writePageContent}>
      <div className={classes.successSubmit}>
        <Typography>Upload Book</Typography>
        {/* <div>Successfully Submitted!</div> */}
      </div>
      <div className={classes.uploadContent}>
        <form
          action=''
          noValidate
          autoComplete='off'
          className={classes.writerForm}
          onSubmit={props.mint}>
          <div className={classes.formContent}>
            <div className={classes.textFields}>
              <TextField
                id='bookTitle'
                label="Book's Title"
                variant='outlined'
                name='title'
                value={inputValues.title}
                onChange={handleOnChange}
                className={classes.textField}
              />
              <WriteCopies
                title='Gold'
                color='#C9B037'
                amountName='goldAmount'
                numberName='goldNumber'
                onChange={handleOnChange}
                initialVals={inputValues}
              />
              <WriteCopies
                title='Silver'
                color='#B4B4B4'
                amountName='silverAmount'
                numberName='silverNumber'
                onChange={handleOnChange}
                initialVals={inputValues}
              />
              <WriteCopies
                title='Bronze'
                color='#AD8A56'
                amountName='bronzeAmount'
                numberName='bronzeNumber'
                onChange={handleOnChange}
                initialVals={inputValues}
              />
              <Typography
                style={{
                  margin: "10px 0px 0px 10px",
                  fontSize: "1rem",
                }}>
                Book Description
              </Typography>
              <TextareaAutosize
                id='description'
                aria-label='Description'
                minRows={10}
                placeholder='A short description about your book'
                name='description'
                value={inputValues.description}
                onChange={handleOnChange}
              />
            </div>
            <div>
              <Typography
                style={{
                  margin: "80px 150px 0px 0px",
                  fontSize: "2rem",
                }}>
                Upload Book Cover
              </Typography>
              <div className={classes.chooseFile}>
                CHOOSE COVER
                <input
                  type='file'
                  accept='image/*'
                  required
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file && file.type.substring(0, 5) === "image") {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreview(reader.result);
                      };
                      reader.readAsDataURL(file);
                      setImage(file);
                    }
                  else {
                    setImage(null);
                    setPreview(null);
                  }
                  }}
                  className={classes.inputFile}
                />
              </div>
              <img src={preview} alt='' className={classes.uploadedImage} />

              <input
                type='button'
                value='Submit'
                className={`${classes.submitButton} ${classes.chooseFile}`}
                onClick={OnhandleMint}
              />
            </div>
          </div>
          <Divider style={{ margin: "15px 0px", backgroundColor: "#fff" }} />
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography
              style={{
                marginRight: "10px",
                fontSize: "2rem",
              }}>
              Upload PDF
            </Typography>

            <div className={classes.chooseFile} style={{ marginLeft: "30px" }}>
              CHOOSE FILE
              <input
                type='file'
                className='form-control'
                accept='application/pdf'
                required
                onChange={handleFile}
                className={classes.inputFile}
              />
            </div>
          </div>
          {pdfError && <span className='text-danger'>{pdfError}</span>}
        </form>
        { pdfFile && 
          (<div style={{height: "1000px"}}>
              <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js'> 
                <Viewer
                  fileUrl={pdfFile}
                  plugins={[defaultLayoutPluginInstance]}
                  defaultScale={SpecialZoomLevel.PageFit}
                  theme='dark'
                />
              </Worker>
          </div>)}
      </div>
    </div>
  );
};

export default Write;
