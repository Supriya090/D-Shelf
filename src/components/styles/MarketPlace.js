import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    heading: {
        "& p": {
            fontFamily: "Rancho, cursive",
            fontSize: "4rem",
            color: "#fff",
            textAlign: "center",
            marginTop: "30px",
            marginBottom: "0px"
        },
    },
}));


export { useStyles };