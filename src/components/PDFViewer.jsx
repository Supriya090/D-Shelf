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
  },
}));

const PDFViewer = (props) => {
  const { viewer } = useStyles();
  //const [render, setRender] = useState(null)

  //pdf file onChange state
  const [pdfFile, setPdfFile] = useState(null);

  //exports pdf from prop

  const {pdf} = props;
  //console.log(pdf);

  //starts reading data from the pdf and sets it after

  function dataUrl () {
    let reader = new FileReader();
    reader.readAsDataURL(pdf);
    reader.onloadend = (e) => {
    setPdfFile(e.target.result);
    console.log(pdfFile);
    };
  }
  
  
  
  var encrypted;
  var decrypted;

  function encrypt() {
    const string="string can be that base64 of pdf";
    //var string = pdfFile.substring(pdfFile.length - 100, pdfFile.length);
    //console.log(string);
    encrypted = CryptoJS.AES.encrypt(string, "1234567890");
    //setPdfFile(encrypted);
    //console.log(encrypted);
    //setPdfFile(pdfFile.substring(0, pdfFile.length - 99) + string);
  }

  function cropTest() {
    var len = pdfFile.length;
    var string = pdfFile.substring(len - 10, len);
    //console.log(pdfFile.substring(0, len - 10));
    //console.log(string);
    //console.log(pdfFile.substring(0, len - 10) + string);
    setPdfFile(pdfFile.substring(0, len - 10) + string);
  }
  

  function decrypt() {
    var bytes = CryptoJS.AES.decrypt(encrypted, "1234567890");
    var decrypted = bytes.toString(CryptoJS.enc.Utf8);
    
    //setPdfFile(decrypted);
    console.log("Decrypted message is");
    console.log(decrypted);
    //setPdfFile(decrypted); 
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

  
  pdf && dataUrl(); //sets pdfFile from DataURL of pdf
  encrypt();
  decrypt();
  //pdfFile && cropTest();

  return (
    <div>
      {/* View PDF */}
      <div className={viewer} style={{ height: pdfFile ? "1000px" : "0px" }}>
        {/* render this if we have a pdf file */}
        
        {pdfFile && (
          <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js'> 
            <Viewer
              fileUrl={pdfFile}
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
