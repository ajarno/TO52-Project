import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  makeStyles,
  Container,
  CssBaseline,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function ConfirmActivation() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Box p={2}>
          <Typography component="h1" variant="h5">
            Votre compte a été confirmé
          </Typography>
        </Box>
        <Typography variant="body">
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
      </div>
    </Container>
  );
}
