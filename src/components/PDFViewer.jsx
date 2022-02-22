import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { makeStyles } from "@material-ui/core";
import CryptoJS from "crypto-js";
import React from "react";

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

  const decrypt = () => {
    //full pdf string decryption --->
    const bytes = CryptoJS.AES.decrypt(pdfBase64, "secret key 123");
    pdfBase64 = bytes.toString(CryptoJS.enc.Utf8);
  }
  

  // ****** TOOLBAR RELATED CODES **********
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

  // decrypt();

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
