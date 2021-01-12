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
    marginTop: "1.3rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  confirm_activation: {
    width: "50rem",
    maxWidth: "100%",
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
      maxWidth="sm"
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={1} style={{ textAlign: "center" }}>
          <Grid item lg={12} md={12} xs={12}>
            <Box p={2}>
              <Typography component="h1" variant="h5" align="center">
                Votre compte a été confirmé
              </Typography>
            </Box>
            <Typography variant="body" align="center">
              Connectez-vous à votre espace en cliquant sur le bouton ci-dessous
            </Typography>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <Button
              size="small"
              color="secondary"
              variant="outlined"
              component={Link}
              to="/auth/sign-in"
            >
              Se connecter
            </Button>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
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
