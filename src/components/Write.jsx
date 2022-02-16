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

const Write = (props) => {
  const classes = useStyles();

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

  const allowedFiles = ["application/pdf"];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        setPdfError("");
        setPdfFile(selectedFile);
      }
    } else {
      setPdfError("Invalid file type: Please select only PDF");
      setPdfFile(null);
    }
  };

  const [submitted, setSubmitted] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
          onSubmit={handleOnSubmit}>
          <div className={classes.formContent}>
            <div className={classes.textFields}>
              <TextField
                id='bookTitle'
                label="Book's Title"
                variant='outlined'
                name='title'
                value={props.inputValues.title}
                onChange={props.handleOnChange}
                className={classes.textField}
              />
              <WriteCopies
                title='Gold'
                color='#C9B037'
                amountName='goldAmount'
                numberName='goldNumber'
                onChange={props.handleOnChange}
                initialVals={props.inputValues}
              />
              <WriteCopies
                title='Silver'
                color='#B4B4B4'
                amountName='silverAmount'
                numberName='silverNumber'
                onChange={props.handleOnChange}
                initialVals={props.inputValues}
              />
              <WriteCopies
                title='Bronze'
                color='#AD8A56'
                amountName='silverAmount'
                numberName='silverNumber'
                onChange={props.handleOnChange}
                initialVals={props.inputValues}
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
                value={props.inputValues.description}
                onChange={props.handleOnChange}
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
        {pdfFile && <PDFViewer pdf={pdfFile} />}
      </div>
    </div>
  );
};

export default Write;
