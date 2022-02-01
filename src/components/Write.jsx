import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PDFViewer from "./PDFViewer"


const useStyles = makeStyles((theme) => ({
  writePageContent: {
    display: "flex",
  },
  uploadContent: {
    padding: "1rem",
    border: "1px solid #ccc",
    margin: "2rem",
    borderRadius: "5px",
    color: "#fff",
    width: "1700px",
  },
}));

const Write = () => {
  const {
    writePageContent,
    uploadContent,
  } = useStyles();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  useEffect(() => { 
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      }
      reader.readAsDataURL(image);
    }
    else {
      setPreview(null);
    }
  }, [image]);

  return (
    <div className={writePageContent}>
      <div className={uploadContent}>
        <form action="">
          <label>Author:</label>
          <input type="text" name="name" required/><br /><br />

          <label>Price:</label>
          <input type="text" name="price" required/><br /><br/>

          <label>No of Copies:</label>
          <input type="text" name="noOfCopies" required/><br /><br />

          <label>Description:</label>
          <input type="text" name="description" required/><br /><br />

          <label>Book Cover</label>
          <input 
            type="file" 
            accept="image/*"
            required
            onChange={(event) => {
              const file = event.target.files[0];
              if (file && file.type.substring(0,5) === "image") {
                setImage(file);
              }
              else {
                setImage(null);
              }
            }} />
          <input type="submit" value="Submit"/>
          
        </form> 
        <br /> <br />
        <img src={preview} alt=""/>
        <br /> <br />    
        <PDFViewer />
      </div>
    </div>
  );
  
};

export default Write;
