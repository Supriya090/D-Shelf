import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import CryptoJS from "crypto-js";

const useStyles = makeStyles((theme) => ({
  viewer: {
    backgroundColor: "#e4e4e4",
    overflowY: "auto",
    marginTop: "2rem",
    height: "1000px",
  },
}));

const PDFViewer = (props) => {
  const { viewer } = useStyles();

  //exports pdf from prop

  var {pdfBase64} = props; 

  //console.log(String(pdfBase64));
  const len = pdfBase64.length;
  const cutLen = 5000;
  var enLen; //for 100 -> 172

  const encrypt = () => {
    //full pdf string encryption --->
    //pdfBase64 = CryptoJS.AES.encrypt(pdfBase64, "1234567890");

    
    //last 100 character encryption--->
    var string = pdfBase64.substring(len - cutLen,len);
    const encrypted = CryptoJS.AES.encrypt(string, "1234567890");
    enLen = String(encrypted).length;
    pdfBase64 = pdfBase64.substring(0, len - cutLen) + encrypted;
  }


  const decrypt = () => {
    
    //full pdf string decryption --->
    var bytes = CryptoJS.AES.decrypt(pdfBase64, "1234567890");
    pdfBase64 = bytes.toString(CryptoJS.enc.Utf8);
    

    /*
    //last 100 character decryption--->
    var upLen = pdfBase64.length;
    console.log(pdfBase64);
    console.log(enLen);


    var bytes = CryptoJS.AES.decrypt(pdfBase64.substring(upLen - enLen,upLen), "1234567890");
    var decrypted = bytes.toString(CryptoJS.enc.Utf8);
    pdfBase64 = pdfBase64.substring(0, upLen - enLen) + decrypted;
    console.log(pdfBase64);
    console.log(pdfBase64.length);*/
  }
  

  
  // ****** Toolbar related codes **********
  //Disabling download and print buttons from plugin
  const transform = (slot) => ({
    ...slot,
    Download: () => <></>,
    Print: () => <></>,
    Search: () => <></>,
  });

  //assigning changed toolbar to renderToolbar
  const renderToolbar = (Toolbar) => (
    <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
  );

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar, //rendering element removed toolbar
    toolbarPlugin: {
      fullScreenPlugin: {
        // Zoom to fit the screen after entering and exiting the full screen mode
        onEnterFullScreen: (zoom) => {
          zoom(SpecialZoomLevel.PageFit);
        },

        onExitFullScreen: (zoom) => {
          zoom(SpecialZoomLevel.ActualSize);
        },

        //Toolbar in fullscreen
        getFullScreenTarget: (pagesContainer) =>
          pagesContainer.closest('[data-testid="default-layout__body"]'),
        renderExitFullScreenButton: () => <></>,
      },
    },
  });

  const { renderDefaultToolbar } = defaultLayoutPluginInstance.toolbarPluginInstance;

  //removing the text element in the pdf
  const CustomPageLayer = ({ renderPageProps }) => {
    React.useEffect(() => {
      // Mark the page rendered completely when the canvas layer is rendered completely
      // So the next page will be rendered
      if (renderPageProps.canvasLayerRendered) {
        renderPageProps.markRendered(renderPageProps.pageIndex);
      }
    }, [renderPageProps.canvasLayerRendered]);

    return (
      <>
        {renderPageProps.canvasLayer.children}
        {renderPageProps.annotationLayer.children}
      </>
    );
  };

  const renderPage = (props) => <CustomPageLayer renderPageProps={props} />;
  
  //encrypt();
  decrypt();

  return (
    <div>
      {/* View PDF */}
      <div className={viewer}>
        {/* render this if we have a pdf file */}
        {pdfBase64 && (
          <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js'> 
            <Viewer
              fileUrl={pdfBase64}
              plugins={[defaultLayoutPluginInstance]}
              defaultScale={SpecialZoomLevel.PageFit}
              theme='dark'
              renderPage={renderPage}
            />
          </Worker>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
