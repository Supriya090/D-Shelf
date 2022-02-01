import React, {useState} from "react";
import { makeStyles } from "@material-ui/core";
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const useStyles = makeStyles((theme) => ({
    viewer: {
      backgroundColor: "#e4e4e4",
      //display: "flex",
      //justifyContent:" center",
      //alignItems: "center",
      overflowY: "auto",
      margin: "1rem",
    }
}));

const PDFViewer = () => {
    const {
        viewer,
    } = useStyles();

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        toolbarPlugin: {
            fullScreenPlugin: {
                // Zoom to fit the screen after entering and exiting the full screen mode
                onEnterFullScreen: (zoom) => {
                    zoom(SpecialZoomLevel.ActualSize);
                },

                onExitFullScreen: (zoom) => {
                    zoom(SpecialZoomLevel.ActualSize);
                },

                //Toolbar in fullscreen
                getFullScreenTarget: (pagesContainer) =>
                    pagesContainer.closest('[data-testid="default-layout__body"]'),
                renderExitFullScreenButton: (props) => <></>,
            },
        },
    });

    //pdf file onChange state
    const [pdfFile, setPdfFile]=useState(null);
    //pdf file error state
    const [pdfError, setPdfError]=useState("");

    //handle file onChange event
    const allowedFiles = ["application/pdf"];
    const handleFile = (e) => {
        let selectedFile = e.target.files[0];
        if(selectedFile) {
            if(selectedFile && allowedFiles.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend=(e)=>{
                    setPdfError("");
                    setPdfFile(e.target.result);
                }
            }
            else {
                setPdfError("Invalid file type: Please select only PDF");
                setPdfFile("");
            }
        }
    }

    return (
        <div>
            <form>
                <label>Upload PDF</label>    
                <input 
                    type="file" 
                    className="form-control"
                    accept = "application/pdf"
                    required
                    onChange={handleFile}
                />

                {/* Display error message in case user selects other than pdf */}
                {pdfError && <span className="text-danger">{pdfError}</span>}
            </form>
            <br />

            {/* View PDF */}
            <div className={viewer} style={{height: pdfFile?"600px":"0px"}}>
                {/* render this if we have a pdf file */}
                {pdfFile && (
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
                        <Viewer  
                            fileUrl = {pdfFile} plugins={[defaultLayoutPluginInstance]} 
                            defaultScale = {SpecialZoomLevel.NormalSize} 
                            theme = "dark"
                        />
                    </Worker>
                )}
            </div>
        </div>
    );
}

export default PDFViewer;