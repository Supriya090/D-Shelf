import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    mainContent: {
        marginTop: "40px"
    },
    featuredContent: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "stretch",
        margin: "20px",
        marginBottom: "0px"
    },
    featured: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        "& p": {
            fontFamily: "Rancho, cursive",
            fontSize: "4rem",
            color: "#fff",
            textAlign: "left",
        },
    },
    currentBid: {
        margin: "30px",
    },
    NFTImage: {
        maxWidth: "350px",
        maxHeight: "350px",
        margin: "0px 30px",
    },
    NFTFeatures: {
        backgroundColor: "#313131",
        borderRadius: "10px",
        marginTop: "20px",
        "& p": {
            fontSize: "1.3rem",
        },
        "& hr": {
            margin: "10px 0px",
        },
        padding: "25px",
        maxWidth: "600px",
    },
    owner: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    description: {
        "& p": {
            fontSize: "1.15rem",
        },
    },
    exploreButton: {
        backgroundColor: "#FFD600",
        transition: "0.5s all ease-out",
        "&:hover": {
            backgroundColor: "rgba(255, 214, 0,0.7)",
        },
        borderRadius: "30px",
        fontFamily: "Rancho, cursive",
        fontSize: "1.5rem",
        textTransform: "capitalize",
        fontWeight: 500,
        padding: "2px 30px",
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
            fontFamily: "Rancho, cursive",
            fontSize: "4rem",
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
        paddingTop: "0px"
    }
}));


export { useStyles };