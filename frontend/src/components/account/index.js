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
        <Grid container spacing={2}>
          <Box alignItems="center">
            <Typography component="h1" variant="h6" spacing={5}>
              Profil
            </Typography>
          </Box>
        </Grid>
        <Grid container spacing={3}>
          <Grid item lg={2} md={2} xs={12}>
            <Profile />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <ProfileDetails />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Account;
