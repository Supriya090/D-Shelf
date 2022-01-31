import { makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const useStyles = makeStyles((theme) => ({
  writePageContent: {
    display: "flex",
  },
  wrapperClass: {
    padding: "1rem",
    border: "1px solid #ccc",
    margin: "2rem",
    borderRadius: "5px",
  },
  editorClass: {
    backgroundColor: "#141414",
    padding: "0px 15px",
    color: "#fff",
    border: "1px solid #ccc",
    fontFamily: "Rubik, sans-serif",
    height: "350px",
    borderRadius: "3px",
  },
  toolbarClass: {
    border: "1px solid #ccc",
    backgroundColor: "#000",
    fontFamily: "Rubik, sans-serif",
  },
  uploadContent: {
    padding: "1rem",
    border: "1px solid #ccc",
    margin: "2rem",
    borderRadius: "5px",
    color: "#fff",
  },
}));

const Write = () => {
  const {
    wrapperClass,
    editorClass,
    toolbarClass,
    writePageContent,
    uploadContent,
  } = useStyles();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  return (
    <div className={writePageContent}>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName={wrapperClass}
        editorClassName={editorClass}
        toolbarClassName={toolbarClass}
      />
      <div className={uploadContent}>Upload Content</div>
    </div>
  );
};

export default Write;
