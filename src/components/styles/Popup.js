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

  }));

  export  {useStyles};