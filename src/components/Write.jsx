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

import WriteCopies from "./elements/WriteCopies";
import useStyles from "./styles/Write";


const Write = (props) => {
  const classes = useStyles();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfError, setPdfError] = useState(null);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);


  var pdf;
  const allowedFiles = ["application/pdf"];

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
          let reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onloadend = (e) => {
            pdf = e.target.result;
            setPdfFile(pdf);
            pdf = CryptoJS.AES.encrypt(pdf, "1234567890");
            setPdfError("");
          };
      };
    } 
    else {
      setPdfError("Invalid file type: Please select only PDF");
      setPdfFile(null);
    }
  };

  return (
    <div className={classes.writePageContent}>
      <Typography>Upload Book</Typography>
      <div className={classes.uploadContent}>
        <form
          action=''
          noValidate
          autoComplete='off'
          className={classes.writerForm}>
          <div className={classes.formContent}>
            <div className={classes.textFields}>
              <TextField
                id='bookTitle'
                label="Book's Title"
                variant='outlined'
                className={classes.textField}
              />
              <WriteCopies title='Gold' color='#C9B037' />
              <WriteCopies title='Silver' color='#B4B4B4' />
              <WriteCopies title='Bronze' color='#AD8A56' />
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
                      setImage(file);
                    } else {
                      setImage(null);
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
                onClick={props.mint}
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
          </div>)
        }
      </div>
    </div>
  );
};

export default Write;
