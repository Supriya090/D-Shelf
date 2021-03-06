import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    heading: {
        "& p": {
            fontFamily: "Rubik, sans-serif",
            fontSize: "4rem",
            color: "#fff",
            textAlign: "center",
            marginTop: "30px",
            marginBottom: "0px",
            fontWeight: 500
        },
    },

    loader: {
        height: "100px",
        marginTop: "100px"
    }
}));


export { useStyles };