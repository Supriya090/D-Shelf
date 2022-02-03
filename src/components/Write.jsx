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

const Write = () => {
  const classes = useStyles();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
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
                CHOOSE FILE
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
                type='submit'
                value='Submit'
                className={`${classes.submitButton} ${classes.chooseFile}`}
              />
            </div>
          </div>
        </form>
        <Divider style={{ margin: "15px 0px", backgroundColor: "#fff" }} />
        <PDFViewer />
      </div>
    </div>
  );
};

export default Write;
