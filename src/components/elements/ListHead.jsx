import { Button, Typography } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { useStyles } from "../styles/Home";

function ListHead({ title, leftButton, hasRightButton = false }) {
  const classes = useStyles();

  function RightButton() {
    if (hasRightButton) {
      return (
        <Button
          variant='contained'
          className={`${classes.listButton} ${classes.exploreButton}`}>
          View All
        </Button>
      );
    } else {
      return null;
    }
  }

  return (
    <div className={classes.auctionHead}>
      <Button
        variant='contained'
        className={`${classes.listButton} ${classes.exploreButton}`}>
        {leftButton} <ArrowDownwardIcon />{" "}
      </Button>
      <Typography>{title}</Typography>
      <RightButton />
    </div>
  );
}

export default ListHead;
