import React, { useState } from "react";
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
import { resetPasswordConfirm } from "../../api/AuthAPI";

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

export default function ResetPasswordConfirm() {
  const classes = useStyles();
  const [password, setPassword] = useState("");

  const resetPassword = (event) => {
    event.preventDefault();
    resetPasswordConfirm(password);
  };
  //let uid = this.props.match.params.uid;
  //let token = this.props.match.params.token;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form>
          <Card className={classes.card}>
            <CardContent>
              <Box p={3}>
                <Typography variant="h6" align="center">
                  Réinitialisation de votre mot de passe
                </Typography>
              </Box>
              <Box p={1}>
                <Typography variant="body1">
                  Entrez votre nouveau mot de passe
                </Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid item md={12} lg={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Mot de passe"
                    name="password"
                    onChange={(event) => {
                      event.preventDefault();
                      setPassword(event.target.value);
                    }}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={resetPassword}
              >
                Réinitialiser
              </Button>
            </CardActions>
          </Card>
        </form>
      </div>
    </Container>
  );
}
