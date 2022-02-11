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

  var {pdf} = props; 
  const len = pdf.length;
  var enLen;

  function encrypt() {
    //full pdf string encryption --->
    //pdf = CryptoJS.AES.encrypt(pdf, "1234567890");


    //last 100 character encryption--->
    var string = pdf.substring(len - 100,len);
    const encrypted = CryptoJS.AES.encrypt(string, "1234567890");
    enLen = String(encrypted).length;
    pdf = pdf.substring(0, len - 100) + encrypted;
  }

  function decrypt() {
    //full pdf string decryption --->
    var bytes = CryptoJS.AES.decrypt(pdf, "1234567890");
    pdf = bytes.toString(CryptoJS.enc.Utf8);

    /*
    //last 100 character decryption--->
    var upLen = pdf.length;

    var bytes = CryptoJS.AES.decrypt(pdf.substring(upLen - enLen,upLen), "1234567890");
    var decrypted = bytes.toString(CryptoJS.enc.Utf8);
    pdf = pdf.substring(0, upLen - enLen) + decrypted;
    */
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
  
  //pdf && dataUrl(); //sets pdfFile from DataURL of pdf
  //encrypt();
  decrypt();
  //pdfFile && cropTest();

  return (
    <div>
      {/* View PDF */}
      <div className={viewer}>
        {/* render this if we have a pdf file */}
        {pdf && (
          <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js'> 
            <Viewer
              fileUrl={pdf}
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
