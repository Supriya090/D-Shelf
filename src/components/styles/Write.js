import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    formContent: {
        display: "flex",
        justifyContent: "space-between"
    },
    writePageContent: {
        marginTop: "110px",
        "& p": {
            fontFamily: "Rubik, sans-serif",
            fontSize: "3.2rem",
            color: "#fff",
            textAlign: "left",
            fontWeight: 500,
            marginLeft: "30px"
        }
    },
    uploadContent: {
        padding: "1rem",
        border: "1px solid #ccc",
        margin: "1rem 2rem",
        borderRadius: "5px",
        color: "#fff",
    },
    writerForm: {
        '& label': {
            color: "#fff"
        },
        '& label.Mui-focused': {
            color: '#fff',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#fff',
            },
            '&:hover fieldset': {
                borderColor: '#fff',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#fff',
            },
        },
    },
    textFields: {
        display: "flex",
        flexDirection: "column",
        width: "40%",
        "& input": {
            color: "#fff"
        },
        "& :nth-child(2)": {
            "& p": {
                fontSize: " 1.2rem",
                marginLeft: "0px",
                marginRight: "20px"
            }
        },
        "& textarea": {
            backgroundColor: "#000",
            margin: "15px",
            color: "#fff",
            border: "1px #fff solid",
            borderRadius: "5px",
            padding: "10px",
            fontFamily: "Rubik, sans-serif",
            fontSize: "0.9rem"

        }
    },
    textField: {
        margin: "10px"
    },
    money: {
        display: "flex",
    },
    chooseFile: {
        padding: "5px 10px",
        background: "#FFD600",
        border: "1px solid #FFD600",
        position: "relative",
        color: "#000",
        borderRadius: "2px",
        textAlign: "center",
        float: "left",
        cursor: "pointer",
        fontWeight: 500,
        fontFamily: "Rubik, sans-serif",
    },
    inputFile: {
        position: "absolute",
        zIndex: 1000,
        opacity: 0,
        cursor: "pointer",
        right: 0,
        top: 0,
        height: "100%",
        fontSize: "24px",
        width: "100%"
    },
    submitButton: {
        position: "relative",
        top: -120,
        right: -200,
        borderRadius: "4px",
        fontSize: "1.2rem"
    },
    uploadedImage: {
        height: "450px",
        position: "absolute",
        right: 205,
        bottom: -170
    },
    uploadPdf: {
        flex: "0 0 100%"
    }
    
}));

export default useStyles;