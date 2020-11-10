import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Copyright from '../../shared/components/Copyright'
import { signIn } from "../../api/AuthAPI";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  function doSignIn(){
    signIn(email,password)
      .then(result => {
        if (result.status ===200) {
          setLoggedIn(true);
          console.log("Is log in")
        } else {
          setIsError(true); 
          console.log("Is not log in")
        }
      })
      .catch(e => {
        setIsError(true);
        console.log(e)
      }
    )
  }
//TODO:  Mettre Redirect dans Route
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
        <form className={classes.form} noValidate>
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
            onChange={evt => {
              setEmail(evt.target.value);
              console.log("change")
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
            onChange={evt => {
              setPassword(evt.target.value)
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="se souvenir de moi"
          />
          <Button
            type="submit"
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
        { isError &&<h1>The username or password provided were incorrect!</h1> }
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}