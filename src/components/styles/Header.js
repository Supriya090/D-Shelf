import { makeStyles, alpha } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 5px",
    },
    header: {
        paddingTop: "20px",
        backgroundColor: "#000000",
    },
    logoName: {
        display: "flex",
        alignItems: "center",
    },
    img: {
        margin: "10px 0px",
        width: "50px",
        height: "50px",
    },
    headerTitle: {
        margin: "5px 0px 0px 10px",
        display: "inline-block",
        fontFamily: "Quicksand, sans-serif",
        fontWeight: 600,
        fontSize: "1.75rem",
        color: "#C4C4C4",
        textTransform: "capitalize",
    },
    headerButton: {
        fontFamily: "Rubik, sans-serif",
        fontWeight: 600,
        fontSize: "0.9rem",
        color: "#FFFFFF",
        borderRadius: "10px",
        size: "small",
        marginLeft: "40px",
        transition: "0.5s all ease-out",
        "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
        },
        "&:last-child": {
            backgroundColor: "#c3a400",
            color: "#000",
        },
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
        fontFamily: "Rancho, cursive",
        fontSize: "1.25rem",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "15ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));


export { useStyles };