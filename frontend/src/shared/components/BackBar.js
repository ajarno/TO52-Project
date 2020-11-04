import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Paper, IconButton } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const useStyles = makeStyles((theme) => ({
  menu: {
    backgroundColor: theme.palette.primary.transparent, //rgba(0, 121, 255, 0.6)
    height: "fit-content",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  },
  tab: {
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

export default function BackBar() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <React.Fragment>
      <Paper className={classes.menu} elevation={0} position="static" square>
        <IconButton onClick={history.goBack} color="primary">
          <KeyboardBackspaceIcon />
        </IconButton>
      </Paper>
    </React.Fragment>
  );
}
