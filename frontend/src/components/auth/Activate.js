import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function Activate() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Votre compte a été crée
        </Typography>
        <p>
          Bienvenue sur UT'Annonce! vous pourriez publier votre annonces après
          avoir confirmer votre compte.
        </p>
        <p>Vous cliquerez sur le lien que nous vosu avons envoyé par e-mail</p>
      </div>
    </Container>
  );
}
