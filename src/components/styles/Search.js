import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    searchInputs: {
        display: "flex"
    },

    search: {
        "& input": {
            backgroundColor: "rgb(255, 253, 253)",
            border: 0,
            borderRadius: "5px",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            fontSize: "15px",
            padding: "5px 15px",
            height: "30px",
            width: "170px",
            "& focus": {
                outline: "none"
            }
        }
    },

    searchIcon: {
        // height: "60px",
        width: "40px",
        backgroundColor: "rgb(58, 58, 58)",
        display: "grid",
        borderRadius: "5px",
        borderTopLeftRadius: "0px",
        borderBottomLeftRadius: "0px",
        placeItems: "center",
        "& svg": {
            fontSize: "25px"
        }
    },

    dataResult: {
        position: "fixed",
        border: "2px white",
        marginTop: "15px",
        width: "contain",
        height: "contain",
        backgroundColor: "rgb(41, 41, 41)",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        overflow: "hidden",
        "& :-webkit-scrollbar": {
            display: "none"
        },
        "& a": {
            textDecoration: "none",
            "& :hover": {
                color: "lightgrey"
            }
        },
        borderRadius: "5px",
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px"
    },

    dataItem: {
        width: "100%",
        height: "50px",
        display: "flex",
        alignItems: "center",
        color: "black",
        "& p": {
            margin: "0px 15px",
            color: "white",
            fontFamily: "Rubik, sans-serif",
            fontSize: "15px"
        },
        borderStyle: "solid white"
    },

    "#clearBtn": {
        cursor: "pointer"
    },
    badge: {
        padding: "5px 15px",
        borderRadius: "5px",
        fontSize: "0.8rem",
        fontWeight: 500,
        color: "#000",
        margin: "0px 15px",
        fontFamily: "Rubik, sans-serif",
    }
}));

export { useStyles };