import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fullWidth: {
    width: "100%",
  },
  topSpaced: {
    marginTop: theme.spacing(1),
  },
}));

export default function RevealButton(props) {
  const classes = useStyles();
  const [revealed, setRevealed] = useState(false);

  return (
    <React.Fragment>
      {!revealed && (
        <Button className={[props.fullWidth ? classes.fullWidth : "", props.spaced ? classes.topSpaced : "" ].join(" ")}
          startIcon={props.startIcon}
          variant="outlined"
          color="primary"
          onClick={() => setRevealed(true)}
        >
          {props.text}
        </Button>
      )}
      {revealed && (
        <Button className={[props.fullWidth ? classes.fullWidth : "", props.spaced ? classes.topSpaced : "" ].join(" ")}
          startIcon={props.startIcon}
          variant="contained"
          color="primary"
          onClick={props.onClick}
        >
          {props.revealedText}
        </Button>
      )}
    </React.Fragment>
  );
}
