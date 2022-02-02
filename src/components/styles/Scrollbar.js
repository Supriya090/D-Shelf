import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    card: {
        margin: "20px 10px",
        "& p": {
            fontSize: "0.9rem",
            textAlign: "center",
            marginBottom: "25px"
        },
        padding: "10px",
        backgroundColor: "#313131",
        borderRadius: "10px",
        position: "relative"
    },
    voteButtons: {
        display: "flex",
        justifyContent: "space-between"
    },
    voteButton: {
        fontSize: "0.8rem",
        padding: "2px 12px",
        margin: "10px 5px"
    },
    voteArrow: {
        borderRadius: "50%",
        backgroundColor: "#000",
        color: "#fff",
        margin: "0px 2px 0px 12px",
        fontSize: "1.1rem",
    },
    biddings: {
        justifyContent: "space-around",
        margin: "15px 0px",
        fontSize: "0.9rem"
    },
    bidNumStyle: {
        margin: "5px 0px"
    },
    bidButton: {
        borderRadius: "5px",
        fontFamily: "Rubik, sans-serif",
        fontSize: "1.1rem",
        padding: "2px 15px",
        marginBottom: "15px"
    },
    arrow: {
        width: 50,
        height: 50
    },
    scrollMenu: {
        margin: "10px 50px 50px 50px",
    },
    scrollBar: {

    },
    image: {
        borderRadius: "10px",
        height: "400px",
        marginBottom: "15px"
    },
    forAuthor: {
        position: "absolute",
        left: 0,
        bottom: 0,
        padding: "50px 15px 0px 15px",
        borderRadius: "10px",
        height: "60%",
        opacity: 0.95
    },
    avatar: {
        height: "80px",
        width: "80px",
        borderRadius: "50%",
        position: "absolute",
        left: 0,
        right: 0,
        top: -40,
        marginLeft: "auto",
        marginRight: "auto",
    },
    authorInfo: {
        "& p": {
            margin: "0px"
        }
    },
    followButton: {
        fontSize: "1.0rem",
        padding: "1px 18px",
        margin: "10px 5px",
        position: "absolute",
        bottom: 15,
        left: 0,
        right: 0,
        marginLeft: "auto",
        marginRight: "auto",
    },

}));

export default useStyles;