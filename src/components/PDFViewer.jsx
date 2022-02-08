import React, { useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { useStyles as writeStyles } from "./styles/Write";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

const useStyles = makeStyles((theme) => ({
  viewer: {
    backgroundColor: "#e4e4e4",
    overflowY: "auto",
    marginTop: "2rem",
  },
  chooseFile: {
    padding: "5px 10px",
    background: "#FFD600",
    border: "1px solid #FFD600",
    position: "relative",
    color: "#000",
    borderRadius: "2px",
    textAlign: "center",
    float: "left",
    cursor: "pointer",
    fontWeight: 500,
    fontFamily: "Rubik, sans-serif",
    marginLeft: "20px",
  },
  inputFile: {
    position: "absolute",
    zIndex: 1000,
    opacity: 0,
    cursor: "pointer",
    right: 0,
    top: 0,
    height: "100%",
    fontSize: "24px",
    width: "100%",
  },
}));

const PDFViewer = (props) => {

  
  // const classes = writeStyles();
  const { viewer } = useStyles();

  //pdf file onChange state
  const [pdfFile, setPdfFile] = useState(null);

  //exports pdf from prop
  const {pdf} = props;

  //starts reading data from the pdf and sets it after
  let reader = new FileReader();
  reader.readAsDataURL(pdf);
  reader.onloadend = (e) => {
    setPdfFile(e.target.result);
  };


  //Disabling download and print buttons from plugin
  const transform = (slot) => ({
    ...slot,
    Download: () => <></>,
    Print: () => <></>,
    Search: () => <></>,
  });

  const renderToolbar = (Toolbar) => (
    <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
  );

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar, //for rendering element removed toolbar
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

  const { renderDefaultToolbar } =
    defaultLayoutPluginInstance.toolbarPluginInstance;

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

  return (
    <div>
      {/* View PDF */}
      <div className={viewer} style={{ height: pdfFile ? "600px" : "0px" }}>
        {/* render this if we have a pdf file */}
        {pdfFile && (
          <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js'>
            <Viewer
              fileUrl={pdfFile}
              plugins={[defaultLayoutPluginInstance]}
              defaultScale={SpecialZoomLevel.NormalSize}
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
