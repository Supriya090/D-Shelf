import { Typography, TextField, InputAdornment } from "@material-ui/core";
import useStyles from "../styles/Write";

function WriteCopies({ title, color }) {
  const classes = useStyles();
  return (
    <div className={classes.moneyDiv}>
      <Typography
        style={{
          margin: "10px 0px 0px 10px",
          fontSize: "1.5rem",
          color: color,
        }}>
        {title}
      </Typography>
      <div className={classes.money}>
        <TextField
          id='price'
          label='Enter Price'
          variant='outlined'
          className={classes.textField}
          type='number'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>ETH</InputAdornment>
            ),
          }}
        />
        <TextField
          id='number'
          label='Number of Copies'
          variant='outlined'
          type='number'
          className={classes.textField}
        />
      </div>
    </div>
  );
}

export default WriteCopies;
