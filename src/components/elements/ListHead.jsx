import { Button, Typography, Badge } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { useStyles } from "../styles/Home";

function ListHead({ title, leftButton, hasRightButton = false }) {
  const classes = useStyles();

  function RightButton() {
    if (hasRightButton) {
      return (
        <Badge
          variant='contained'
          className={`${classes.listButton} ${classes.exploreButton}`}>
          View All
        </Badge>
      );
    } else {
      return null;
    }
  }

  return (
    <div className={classes.auctionHead}>
      <Badge
        variant='contained'
        className={`${classes.listButton} ${classes.exploreButton}`}>
        {leftButton} <ArrowDownwardIcon />{" "}
      </Badge>
      <Typography>{title}</Typography>
      <RightButton />
    </div>
  );
}

export default ListHead;
