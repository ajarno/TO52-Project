import React, { useState } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  makeStyles,
} from "@material-ui/core";
import InputMask from "react-input-mask";
import CardActions from "@material-ui/core/CardActions";
import {
  createOrUpdateProfile,
  fetchUserProfile,
} from "../../api/UserProfileAPI";

const useStyles = makeStyles((theme) => ({
  root: {},
  divider: {
    background: theme.primary,
  },
  compte: {
    marginBottom: theme.spacing(3),
  },
  adresse: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  button: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
}));

export default function ProfileDetails() {
  const classes = useStyles();
  const [values, setValues] = useState({
    /*surname: "",
    first_name: "",
    //email: "demo@devias.io",
    brith_day: "",
    tel: "",
    address_street: "",
    address_postal_code: "",
    address_city: "",
    address_country: "France",*/
    setValue,
  });
  function setValue() {
    fetchUserProfile()
      .then((result) => {
        if (result.status === 200) {
          console.log("resultat", result);
          const data = result.data.profile;
          const profile = {};
          profile["surname"] = data.surname;
          profile["first_name"] = data.first_name;
          profile["brith_day"] = data.surname;
          profile["tel"] = data.tel;
          profile["address_street"] = data.address_street;
          profile["address_postal_code"] = data.address_postal_code;
          profile["address_city"] = data.address_city;
          profile["address_country"] = data.address_country;
          //return result.data.profile;
        } else if (result.status === 204) {
          return "";
        }
      })
      .catch((e) => {});
  }
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  function updateInfos(event) {
    console.log("i'm here");
    console.log(values);
    createOrUpdateProfile(
      values.surname,
      //values.first_name,
      values.brith_day,
      values.tel,
      values.address_street,
      //values.address_postal_code,
      values.address_city,
      values.address_country
    );
  }

  return (
    <div>
      <form className={classes.form} id="infos" enctype="multipart/form-data">
        <div className={classes.compte}>
          <Typography variant="h6">Informations de compte</Typography>
          <Divider className={classes.divider} />
        </div>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Prénom"
                  name="first_name"
                  onChange={handleChange}
                  required
                  value={values.first_name}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Nom"
                  name="surname"
                  onChange={handleChange}
                  required
                  value={values.surname}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Date de naissance"
                  type="brith_day"
                  onChange={handleChange}
                  defaultValue="2000-05-24"
                  variant="outlined"
                  value={values.brith_day}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Télétel"
                  name="tel"
                  onChange={handleChange}
                  variant="outlined"
                  value={values.tel}
                >
                  <InputMask mask="(0)999 999 99 99" maskChar=" " />
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
        </Card>
        <div className={classes.adresse}>
          <Typography variant="h6">Adresse</Typography>
          <Divider className={classes.divider} />
        </div>
        <Card>
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Adresse"
                  name="address_street"
                  onChange={handleChange}
                  value={values.address_street}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Code postal"
                  name="address_postal_code"
                  onChange={handleChange}
                  value={values.address_postal_code}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Ville"
                  name="address_city"
                  onChange={handleChange}
                  value={values.address_city}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Pays"
                  name="address_country"
                  defaultValue="France"
                  onChange={handleChange}
                  value={values.address_country}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Divider />
        <Button
          //type="submit"
          variant="contained"
          color="primary"
          className={(classes.submit, classes.button)}
          onClick={updateInfos}
        >
          Enregister les modifications
        </Button>
      </form>
      <form className={classes.form}>
        <div className={classes.adresse}>
          <Typography variant="h6">Mot de passe</Typography>
          <Divider className={classes.divider} />
        </div>
        <Card>
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="Nouveau mot de passe"
                  name="first_name"
                  onChange={handleChange}
                  required
                  value={values.first_name}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Mot de passe actuel"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              //type="submit"

              variant="contained"
              color="primary"
              className={(classes.submit, classes.cardAction)}
            >
              Modifier mon mot de passe
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
}

ProfileDetails.propTypes = {
  className: PropTypes.string,
};
