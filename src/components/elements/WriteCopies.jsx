import { Typography, TextField, InputAdornment } from "@material-ui/core";
import useStyles from "../styles/Write";
import React from "react";

function WriteCopies(props) {
  const classes = useStyles();
  return (
    <div className={classes.moneyDiv}>
      <Typography
        style={{
          margin: "10px 0px 0px 10px",
          fontSize: "1.5rem",
          color: props.color,
        }}>
        {props.title}
      </Typography>
      <div className={classes.money}>
        <TextField
          id='price'
          label='Enter Price'
          variant='outlined'
          className={classes.textField}
          type='number'
          name={props.amountName}
          value={props.initialVals.amount}
          onChange={(e) => props.onChange(e)}
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
          name='number'
          name={props.numberName}
          value={props.initialVals.number}
          className={classes.textField}
          onChange={(e) => props.onChange(e)}
        />
      </div>
    </div>
  );
}

export default WriteCopies;
