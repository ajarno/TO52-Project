import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Alert } from "@material-ui/lab";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { signIn } from "../../api/AuthAPI";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loginErrorMessages, setLoginErrorMessages] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [emailInvalidMessage, setEmailInvalidMessage] = useState("");
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [passwordInvalidMessage, setPasswordInvalidMessage] = useState("");

  function doSignIn(event) {
    event.preventDefault();
    //Validation section
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (email === "") {
      setIsEmailInvalid(true);
      setEmailInvalidMessage("L'adresse email est requise.");
    } else if (!pattern.test(email)) {
      setIsEmailInvalid(true);
      setEmailInvalidMessage("Veuillez saisir une adresse email valide.");
    } else if (password === "") {
      setIsPasswordInvalid(true);
      setPasswordInvalidMessage("Le mot de passe est requis.");
    } else {
      setIsEmailInvalid(false);
      setIsPasswordInvalid(false);
      //if validation process completed signIn
      signIn(email, password)
        .then((result) => {
          if (result.status === 200) {
            if (result.data.access) {
              localStorage.setItem("token", result.data.access);
            }
            setLoggedIn(true);
          } else if (result.status === 401) {
            setLoggedIn(false);
            setIsError(true);
            setLoginErrorMessages(
              "Adresse e-mail ou mot de passe invalide. Il vous reste 3 tentatives."
            );
          }
        })
        .catch((e) => {
          setIsError(true);
          setLoginErrorMessages(
            "Adresse e-mail ou mot de passe invalide. Il vous reste 3 tentatives."
          );
        });
    }
  }

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Se connecter
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresse email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            error={isEmailInvalid}
            helperText={isEmailInvalid && emailInvalidMessage}
            onChange={(evt) => {
              setEmail(evt.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            error={isPasswordInvalid}
            helperText={isPasswordInvalid && passwordInvalidMessage}
            onChange={(evt) => {
              setPassword(evt.target.value);
            }}
          />
          {isError && <Alert severity="error"> {loginErrorMessages}</Alert>}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="se souvenir de moi"
          />

          <Button
            //type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={doSignIn}
          >
            Se connecter
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/auth/forgot-password" variant="body2">
                Mot de passe oublié
              </Link>
            </Grid>
            <Grid item>
              <Link href="/auth/sign-up" variant="body2">
                Créer un compte
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}
