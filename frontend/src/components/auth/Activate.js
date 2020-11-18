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
          Ton compte a été crée
        </Typography>
        <p>
          Bienvenue Gédéon sur UT'Annonce, tu pourras publier tes annonces après
          avoir confirmer ton compte.
        </p>
        <p>Tu cliqueras sur le lien que nous t'avons envoyé par e-mail</p>
      </div>
    </Container>
  );
}
