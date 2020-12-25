import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  makeStyles,
  Container,
  CssBaseline,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  TextField,
} from "@material-ui/core";
import { resetPassword } from "../../api/AuthAPI";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    padding: theme.spacing(2),
  },
}));

export default function ResetPassword() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isMailSent, setIsMailSent] = useState(false);

  const recoveryPawword = (event) => {
    event.preventDefault();
    resetPassword(email)
      .then((result) => {
        if (result.status === 204) {
          setMessage(
            "Un email de recupération de votre mot de passe vous a été envoyé."
          );
          setIsMailSent(!isMailSent);
        }
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form>
          <Card className={classes.card}>
            <CardContent>
              <Box p={3}>
                <Typography variant="h6" align="center">
                  Mot de passe oublié ?
                </Typography>
              </Box>
              {!isMailSent && (
                <div>
                  <Box p={1}>
                    <Typography variant="body1">
                      Entrez l'adresse e-mail associée à votre compte
                    </Typography>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item md={12} lg={12} xs={12}>
                      <TextField
                        fullWidth
                        label="E-mail"
                        name="email"
                        onChange={(event) => {
                          event.preventDefault();
                          setEmail(event.target.value);
                        }}
                        variant="outlined"
                        type="email"
                      />
                    </Grid>
                  </Grid>
                </div>
              )}
              {isMailSent && (
                <Box p={1}>
                  <Typography variant="body1">{message}</Typography>
                </Box>
              )}
            </CardContent>
            <CardActions>
              {!isMailSent && (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={recoveryPawword}
                >
                  Continuer
                </Button>
              )}
            </CardActions>
          </Card>
        </form>
        <Box p={3}>
          <Typography variant="body">
            Mot de passe retouvé
            <Button
              size="small"
              color="primary"
              component={Link}
              to="/auth/sign-in"
            >
              Se connecter
            </Button>
          </Typography>
        </Box>
      </div>
    </Container>
  );
}
