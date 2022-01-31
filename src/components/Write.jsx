import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
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

  return (
    <div className={writePageContent}>
      <div className={uploadContent}>      
        <PDFViewer />
      </div>
    </div>
  );
  
};

export default Write;
