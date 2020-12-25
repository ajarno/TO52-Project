import React from "react";
import { Box, Grid, makeStyles } from "@material-ui/core";
import Profile from "./Profile";
import ProfileDetails from "./ProfileDetails";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(4),
    },
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: "0 auto",
  },
}));

const Account = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <Grid
          container
          direction="row"
          justify="space-evenly"
        >
          <Grid item lg={3} md={3} xs={12}>
            <Profile />
          </Grid>
          <Grid item lg={7} md={6} xs={12}>
            <ProfileDetails />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Account;
