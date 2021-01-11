import React, { useState } from "react";
import { Alert } from "@material-ui/lab";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  makeStyles,
  Container,
  Typography,
  Link,
  Grid,
  Checkbox,
  Box,
  TextField,
  CssBaseline,
  Button,
  Avatar,
  FormControlLabel,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@material-ui/core/";
import { Visibility, VisibilityOff } from "@material-ui/icons/";
import { signIn } from "../../api/AuthAPI";
import { fetchUserProfile } from "../../api/UserProfileAPI";

//styles
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
  helperText: {
    marginLeft: theme.spacing(2),
    color: "red",
  },
}));

//SignIn component
export default function SignIn() {
  const classes = useStyles();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loginErrorMessages, setLoginErrorMessages] = useState("");
  const [email, setEmail] = useState(
    localStorage.getItem("authEmail") ? localStorage.getItem("authEmail") : ""
  );
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("authEmail") ? true : false
  );
  const [password, setPassword] = useState("");
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

  function doSignIn(event) {
    event.preventDefault();
    //Validation section
    if (!document.getElementById("email").validity.valid) {
      setIsEmailInvalid(true);
      setEmailInvalidMessage("L'adresse email est requise.");
    } else if (!document.getElementById("password").validity.valid) {
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
              sessionStorage.setItem("token", result.data.access);
            }
            setLoggedIn(true);
          } else if (result.status === 401) {
            setLoggedIn(false);
            setIsError(true);
            setLoginErrorMessages("Adresse e-mail ou mot de passe invalide.");
          }
        })
        .catch((e) => {
          setIsError(true);
          setLoginErrorMessages("Adresse e-mail ou mot de passe invalide.");
        });
    }
  }

  if (isLoggedIn) {
    var page = "";
    fetchUserProfile()
      .then((result) => {
        if (Object.keys(result.data).length > 1) {
          page = window.location.href = "/";
        } else {
          page = window.location.href = "/account";
        }
      })
      .catch((e) => {});
    return page;
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
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
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
                type="email"
                value={email}
                error={isEmailInvalid}
                helperText={isEmailInvalid && emailInvalidMessage}
                onChange={(evt) => {
                  setEmail(evt.target.value);
                }}
              />
            </Grid>
            <Grid item lg={12} md={12} xs={12}>
              <FormControl variant="outlined" fullWidth required>
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
            {isError && <Alert severity="error"> {loginErrorMessages}</Alert>}

            <Grid item lg={6} md={6} xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(evt) => {
                      setRememberMe(evt.target.checked);
                      if (evt.target.checked)
                        localStorage.setItem("authEmail", email);
                      else if (localStorage.getItem("authEmail"))
                        localStorage.removeItem("authEmail");
                    }}
                    color="primary"
                  />
                }
                label="Se souvenir de moi"
              />
            </Grid>
          </Grid>

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
              <Link href="/auth/lost-password" variant="body2">
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
