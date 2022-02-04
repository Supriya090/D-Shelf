import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "../styles/Home";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  detailsButton: {
    position: "absolute",
    bottom: 100,
  },
  dialogBox: {},
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function WalletInfo({ defaultAccount = "", userBalance = "" }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = styles;
  const homeClasses = useStyles();
  return (
    <div>
      <Button
        onClick={handleClickOpen}
        className={`${homeClasses.exploreButton} ${classes.detailsButton}`}>
        Wallet Details
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        className={classes.dialogBox}>
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          Wallet Details
        </DialogTitle>
        <DialogContent dividers>
          <div className='accountDisplay'>
            <h3>Address: {defaultAccount}</h3>
          </div>
          <div className='balanceDisplay'>
            <h3>Balance: {userBalance}</h3>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

<></>;
