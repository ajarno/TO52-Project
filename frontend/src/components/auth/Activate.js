import React from "react";
import {
  Box,
  Container,
  makeStyles,
  Typography,
  CssBaseline,
} from "@material-ui/core";

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
        <Box p={2}>
          <Typography component="h1" variant="h5">
            Votre compte a été créé
          </Typography>
        </Box>
        <Typography variant="body">
          Un email de confirmation vous a été envoyé.
        </Typography>
        <Typography variant="body" align="center">
          Cliquez sur le lien compris dans celui-ci pour valider votre adresse
          mail.
        </Typography>
      </div>
    </Container>
  );
}
