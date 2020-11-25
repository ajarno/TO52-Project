import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { Alert } from "@material-ui/lab";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { signUp } from "../../api/AuthAPI";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpErrorMessages, setSignUpErrorMessages] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [emailInvalidMessage, setEmailInvalidMessage] = useState("");
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [passwordInvalidMessage, setPasswordInvalidMessage] = useState("");

  function doSignUp(event) {
    event.preventDefault();
    //Validation section
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    var strongPasswordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    /*    var mediumPasswordRegex = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    ); */
    if (email === "") {
      setIsEmailInvalid(true);
      setEmailInvalidMessage("L'adresse email est requise.");
    } else if (!pattern.test(email)) {
      setIsEmailInvalid(true);
      setEmailInvalidMessage("Veuillez saisir une adresse email valide.");
    } else if (password === "") {
      setIsPasswordInvalid(true);
      setPasswordInvalidMessage("Le mot de passe est requis.");
    } else if (!strongPasswordRegex.test(password)) {
      setIsPasswordInvalid(true);
      setPasswordInvalidMessage(
        "Le mot de passe doit contenir au moin 8 caractères y compris caractères alphanumériques et numériques."
      );
    } else {
      setIsEmailInvalid(false);
      setIsPasswordInvalid(false);
      //if validation process completed signUp
      signUp(email, password)
        .then((result) => {
          if (result.status === 201) {
            setIsSignUp(true);
            setIsError(false);
          } else {
            setIsSignUp(false);
            setIsError(true);
            setSignUpErrorMessages(
              "Une erreur est survenue lors de la création du compte, vérifiez si vous n'avez pas déjà un compte avec cet email ."
            );
          }
        })
        .catch((e) => {
          setIsSignUp(false);
          setIsError(true);
          setSignUpErrorMessages(
            "Une erreur est survenue lors de la création du compte, vérifiez si vous n'avez pas déjà un compte avec cet email ."
          );
        });
    }
  }

  //TODO:  Mettre Redirect dans Route
  if (isSignUp) {
    return <Redirect to="/auth/activate" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          S'inscrire
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                type="email"
                fullWidth
                id="email"
                label="Adresse email"
                name="email"
                autoComplete="email"
                value={email}
                error={isEmailInvalid}
                helperText={isEmailInvalid && emailInvalidMessage}
                onChange={(evt) => {
                  setEmail(evt.target.value);
                  console.log("change");
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                error={isPasswordInvalid}
                helperText={isPasswordInvalid && passwordInvalidMessage}
                value={password}
                onChange={(evt) => {
                  setPassword(evt.target.value);
                }}
              />
            </Grid>
            {isError && <Alert severity="error"> {signUpErrorMessages}</Alert>}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Je veux recevoir les informations et mises à jours par email."
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={doSignUp}
          >
            S'inscrire
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/auth/sign-in" variant="body2">
                Vous avez déjà un compte ? Se connecter
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
