import {
  Typography,
  TextField,
  TextareaAutosize,
  Divider,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PDFViewer from "./PDFViewer";
import useStyles from "./styles/Write";
import WriteCopies from "./elements/WriteCopies";
import CryptoJS from "crypto-js";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from 'ipfs-http-client'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')


const Write = (props) => {
  const classes = useStyles();
  var defaultAccount;
  var bookContract; 
  var marketContract;
  var provider;
  var signer;
  const [ImageUrl, setImageUrl] = useState(null)
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [pdfUrl, setpdfUrl] = useState(null)
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

  const encrypt = (pdf) => {
    //full pdf string encryption --->
    //console.log(pdf);
    pdf = CryptoJS.AES.encrypt(pdf, "1234567890");
    setPdfFile(pdf);
    
    
    //last 100 character encryption--->
    //var string = pdf.substring(len - 100,len);
    //const encrypted = CryptoJS.AES.encrypt(string, "1234567890");
    //enLen = String(encrypted).length;
    //pdf = pdf.substring(0, len - 100) + encrypted;
  }

  const allowedFiles = ["application/pdf"];
  const handleFile = async (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
          let reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onloadend = (e) => {
            encrypt(e.target.result);
            //setPdfFile(e.target.result);
            setPdfError("");
          };
          try {
            const addedpdf = await client.add(
              selectedFile,
              {
                progress: (progress) => console.log(`Pdf received: ${progress}`)
              }
            )
            const pdfurl = `https://ipfs.infura.io/ipfs/${addedpdf.path}`
            setpdfUrl(pdfurl)
          } catch (error) {
            console.log('Error uploading pdf file: ', error)
          } 
        };
      } else {
        setPdfError("Invalid file type: Please select only PDF");
        setPdfFile(null);
        setpdfUrl(null);
      }
    };

  const OnhandleMint = async(e) => {
    e.preventDefault();
    const { title, description, goldNumber, goldAmount, silverNumber, silverAmount, bronzeNumber, bronzeAmount } = inputValues;
    if (!title || !description || !goldNumber || !goldAmount || !silverNumber || !silverAmount || !bronzeNumber || !bronzeAmount || !pdfUrl || !ImageUrl) return
    console.log("content : ",title, description, goldNumber, goldAmount, silverNumber, silverAmount, bronzeNumber, bronzeAmount, pdfUrl, ImageUrl);
    console.log("Required : ",defaultAccount, bookContract, marketContract, provider, signer);
    let ContentMetadata = {
      title:title,
      tokenIds: [],
      tokenType: 1,
      contentType: 1,
      publicationDate: Date.now(),
      author: "Rahul Shah",
      authorAddr: defaultAccount,
      coverImageHash: ImageUrl,
      descriptionHash: pdfUrl
    }

    let Amount = goldNumber*0.003+silverNumber*0.002+bronzeNumber*0.001+0.01
    
    if(defaultAccount && bookContract && marketContract && provider && signer){
      const tx = {value: ethers.utils.parseEther(String(Amount)), gasLimit: 5000000};
      bookContract.mintBatch(ContentMetadata,goldNumber,silverNumber,bronzeNumber,tx)
      .then(async (transaction) => {
        await transaction.wait();
        console.log("transaction :", transaction);
        console.log("Minted Successfully : ", await bookContract.balanceOf(defaultAccount));
        //Render Back to Home Page
      })
      .catch(error => {
        console.log("Error : ", error);
      })
    }
    else{
      alert("Please connect to Metamask");
    }

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
          // console.log(defaultAccount, bookContract, marketContract, provider, signer);
        })
        .catch(err=>{
          console.log(err);
        })
    }
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [props.connButtonText,image]);

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
                  onChange={async(event) => {
                    const file = event.target.files[0];
                    if (file && file.type.substring(0, 5) === "image") {
                      setImage(file);
                      try{
                        const added = await client.add(
                          file,
                          {
                            progress: (progress) => console.log(`received : ${progress}`)
                          }
                        )
                          const url = `https://ipfs.infura.io/ipfs/${added.path}`
                          setImageUrl(url)
                      }
                      catch(error){
                        console.log("Error Uploading Image",error);
                      }
                    }
                  else {
                    setImage(null);
                    setImageUrl(null);
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
        {pdfFile && <PDFViewer pdfBase64={pdfFile} />}
      </div>
    </div>
  );
};

export default Write;
