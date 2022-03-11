import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    mainContent: {
        marginTop: "130px"
    },
    featuredContent: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        margin: "20px",
        marginBottom: "0px"
    },
    moreButton: {
        color: "#FFD600",
        fontFamily: "Rubik, sans-serif",
    },
    featured: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        "& p": {
            fontFamily: "Rubik, sans-serif",
            fontSize: "3.2rem",
            color: "#fff",
            textAlign: "left",
            fontWeight: 500
        },
    },
    currentBid: {
        margin: "30px",
    },
    NFTImage: {
        maxHeight: "450px",
        borderRadius: "20px",
        boxShadow: "3px 3px 1px #313131"
    },
    NFTFeatures: {
        backgroundColor: "#313131",
        borderRadius: "10px",
        marginTop: "20px",
        "& p": {
            fontSize: "1.1rem",
            fontWeight: 400

        },
        "& hr": {
            margin: "15px 0px",
            backgroundColor: "#fff"
        },
        padding: "25px",
        maxWidth: "600px",
    },
    owner: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    description: {
        "& p": {
            fontSize: "0.9rem",
        },
    },
    exploreButton: {
        backgroundColor: "#FFD600",
        transition: "0.5s all ease-out",
        "&:hover": {
            backgroundColor: "rgba(255, 214, 0,0.7)",
        },
        borderRadius: "10px",
        fontFamily: "Rubik, sans-serif",
        fontSize: "1.1rem",
        textTransform: "capitalize",
        fontWeight: 600,
        padding: "2px 20px",
        marginTop: "20px",
    },
    biddings: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
        color: "#fff",
        fontFamily: "Rubik, sans-serif",
    },
    bidNumStyle: {
        fontSize: "1.5rem",
        margin: "10px 0px",
        fontWeight: 500,
        color: "#26EC8D",
    },
    itemsList: {
        "& p": {
            fontFamily: "Rubik, sans-serif",
            fontSize: "3rem",
            fontWeight: 500,
            color: "#fff",
            textAlign: "left",
        },
    },
    auctionHead: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "30px 80px 0px 80px",
    },
    listButton: {
        backgroundColor: "rgba(255, 255, 255,0.08)",
        color: "#FFD600",
        "&:hover": {
            backgroundColor: "rgba(255, 255, 255,0.1)",
        },
        fontWeight: 500,
        padding: "5px 25px"
    },
    badge: {
        padding: "5px 15px",
        borderRadius: "5px",
        fontSize: "0.8rem",
        fontWeight: 500,
        color: "#000",
        margin: "0px 15px",
        fontFamily: "Rubik, sans-serif",
    },
    badges: {
        display: "flex",
        flexDirection: "column"
    }
}));


export { useStyles };