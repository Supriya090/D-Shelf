import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  close: {
    cursor: "pointer",
    position: "absolute",
    display: "block",
    padding: "2px 5px",
    lineHeight: "20px",
    right: "-10px",
    top: "-10px",
    fontSize: "24px",
    background: "#ffffff",
    borderRadius: "18px",
    border: "1px solid #cfcece"
  },
  modal: {
    backgroundColor: "#313131",
    padding: "30px 50px",
    borderRadius: "5px",
    fontFamily: "Rubik, sans-serif",
    color: "#fff",
  },
  header: {
    width: "100%",
    borderBottom: "1px solid gray",
    fontSize: "18px",
    textAlign: "center",
    paddingBottom: "10px",
    fontWeight: 500
  },
  content: {
    width: "100%",
    padding: "10px 5px"
  },
  tokenSelect: {
    margin: "10px 0px 20px 0px",
    "& label": {
      marginRight: "20px"
    },
  },
  "& input": {
    color: "#fff"
  },
}));

export { useStyles };