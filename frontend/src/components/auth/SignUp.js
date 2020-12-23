import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  TextField,
  CssBaseline,
  Button,
  FormControlLabel,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  FormHelperText,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
  OutlinedInput,
} from "@material-ui/core/";
import { Alert } from "@material-ui/lab";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Visibility, VisibilityOff } from "@material-ui/icons/";
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
  helperText: {
    marginLeft: theme.spacing(2),
    color: "red",
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
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
    setPassword(password);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
    if (!document.getElementById("email").validity.valid) {
      setIsEmailInvalid(true);
      setEmailInvalidMessage("L'adresse email est requise.");
    } else if (!document.getElementById("password").validity.valid) {
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
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="password">Mot de passe</InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  name="password"
                  error={isPasswordInvalid}
                  onChange={(evt) => {
                    setPassword(evt.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={100}
                />
              </FormControl>
              {isPasswordInvalid && (
                <FormHelperText
                  className={classes.helperText}
                  id="component-error-text"
                >
                  {passwordInvalidMessage}
                </FormHelperText>
              )}
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
