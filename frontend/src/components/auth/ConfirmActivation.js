import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  makeStyles,
  Container,
  CssBaseline,
  Typography,
  Grid,
} from "@material-ui/core";
import confirm_activation from "../../assets/confirm_activation.svg";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  confirm_activation: {
    height: "30rem",
    width: "30rem",
    verticalAlign: "middle",
    marginRight: "10px",
  },
}));

export default function ConfirmActivation() {
  const classes = useStyles();

  return (
    <Container
      container
      direction="column"
      justify="center"
      alignItems="center"
      component="main"
      maxWidth="xs"
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item lg={12} md={12} xs={12}>
            <Box p={2}>
              <Typography component="h1" variant="h5" align="center">
                Votre compte a été confirmé
              </Typography>
            </Box>
            <Typography variant="body" align="center">
              Connecter vous à votre espace en cliquant ici
              <Button
                size="small"
                color="primary"
                component={Link}
                to="/auth/sign-in"
              >
                Se connecter
              </Button>
            </Typography>
          </Grid>
          <Grid item lg={6} md={12} xs={12}>
            <img
              src={confirm_activation}
              className={classes.confirm_activation}
              alt="logo"
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
