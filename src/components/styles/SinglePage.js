import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    singleContent: {
        display: "flex",
        flexDirection: "column",
    },
    bookDetails: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "stretch",
        margin: "20px",
        marginBottom: "0px",
        "& p": {
            fontFamily: "Rubik, sans-serif",
            fontSize: "3.5rem",
            color: "#fff",
            textAlign: "left",
            fontWeight: 500
        },
    },
    NFTImage: {
        maxHeight: "450px",
        marginTop: "30px",
        borderRadius: "20px",
        boxShadow: "3px 3px 1px #313131"
    },
    buyDetails: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#141414",
        borderRadius: "5px",
        padding: "20px 30px",
        width: "400px",
        "& button": {
            borderRadius: "12px"
        }
    },
    bidDetails: {
        display: "flex",
        lineHeight: 1.8,
        justifyContent: "space-around",
        marginTop: "20px",
        fontSize: "1.2rem"
    },
    left: {
        textAlign: "left"
    },
    right: {
        textAlign: "right"
    },
    details: {
        marginTop: "20px",
        color: "#fff",
        fontFamily: "Rubik, sans-serif",
    },
    description: {
        backgroundColor: "#313131",
        borderRadius: "10px",
        "& p": {
            fontFamily: "Rubik, sans-serif",
            color: "#fff",
            textAlign: "left",
            fontSize: "1.1rem",
        },
        padding: "25px 40px",
        margin: "40px 130px"
    }
}));


export { useStyles };