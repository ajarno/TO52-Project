import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  Button,
  Typography,
  Divider,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Snackbar,
} from "@material-ui/core";
import InputMask from "react-input-mask";
import MuiAlert from "@material-ui/lab/Alert";
import { Visibility, VisibilityOff } from "@material-ui/icons/";
import {
  createOrUpdateProfile,
  fetchUserProfile,
} from "../../api/UserProfileAPI";
import { updatePassword } from "../../api/AuthAPI";
import { logout } from "../../api/AuthAPI";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = (theme) => ({
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
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
});

class ProfileDetails extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      profile: {
        avatar: "",
        surname: "",
        first_name: "",
        birth_day: "",
        tel: "",
        address_street: "",
        address_postal_code: "",
        address_city: "",
        address_country: "",
      },
      isLoading: true,
      current_password: "",
      new_password: "",
      show_current_password: false,
      show_new_password: false,
      notification_open: false,
      notification_message: "",
      errorNot: false,
      error: {},
      changePasswordError: true,
    };
  }

  componentDidMount() {
    this.fetchProfile();
  }

  fetchProfile() {
    fetchUserProfile()
      .then((result) => {
        if (result.status === 200) {
          this.setState({
            profile: result.data.profile,
            isLoading: false,
            current_password: "",
            new_password: "",
          });
        } else if (result.status === 204) {
          return {};
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  }

  showNotification = () => {
    this.setState({
      notification_open: true,
    });
  };

  closeNotifcation = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      notification_open: false,
    });
  };

  handleClickShowPassword = () => {
    this.setState({
      show_new_password: !this.state.show_new_password,
      new_password: this.state.new_password,
    });
  };

  handleClickShowCurPassword = () => {
    this.setState({
      show_current_password: !this.state.show_current_password,
      current_password: this.state.current_password,
    });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState((prevState) => {
      return {
        profile: {
          ...prevState.profile,
          [name]: value,
        },
      };
    });
    this.validate(name);
  };

  setPassword = (event) => {
    updatePassword(
      this.state.new_password,
      this.state.new_password,
      this.state.current_password
    )
      .then((result) => {
        if (result.status === 204) {
          this.setState({
            notification_open: true,
            notification_message:
              " Votre mot de passe a été modifié avec succès!",
          });

          this.showNotification();
          logout();
        } else {
          this.setState({
            notification_open: true,
            errorNot: true,
            notification_message:
              " Une erreur est survenue lors de la modification de votre mot de passse!",
          });
          return {};
        }
      })
      .catch((error) => this.setState({ isLoading: false }));
  };

  handleChangePassword = (event) => {
    var strongPasswordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    this.setState({
      new_password: event.target.value,
      changePasswordError: strongPasswordRegex.test(this.state.new_password),
    });
  };

  updateInfos = (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("avatar", sessionStorage.getItem("avatar-post"));
    formData.append("surname", this.state.profile.surname);
    formData.append("first_name", this.state.profile.first_name);
    formData.append("birth_day", this.state.profile.birth_day);
    formData.append("tel", this.state.profile.tel);
    formData.append("address_street", this.state.profile.address_street);
    formData.append(
      "address_postal_code",
      this.state.profile.address_postal_code
    );
    formData.append("address_city", this.state.profile.address_city);
    formData.append("address_country", this.state.profile.address_country);

    createOrUpdateProfile(formData).then((result) => {
      if (result) {
        this.setState({
          notification_message: "Votre profil a été mis à jour avec succès",
        });
      } else {
        this.setState({
          errorNot: true,
          notification_message:
            "Une erreur est survenue lors de la création  de votre profil",
        });
      }
      //window.location.reload(false);
      this.setState({
        notification_open: true,
      });
    });
  };

  // Validation
  validate = (type) => {
    let err = {};
    switch (type) {
      case "first_name":
        err = !document.getElementById("first_name").validity.valid;
        break;
      case "surname":
        err = !document.getElementById("surname").validity.valid;
        break;
      case "birth_day":
        err = !document.getElementById("birth_day").validity.valid;
        break;
      case "tel":
        err = !document.getElementById("tel").validity.valid;
        break;
      default:
        err = this.state.errors;
    }
    return this.setTypeError(type, err);
  };

  setTypeError(type, boolean) {
    let newError = { ...this.state.error };
    newError[type] = boolean;
    this.setState({
      error: newError,
    });
    return newError;
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <form className={classes.form} id="infos">
          <div className={classes.compte}>
            <Typography variant="h6">Informations de compte</Typography>
            <Divider className={classes.divider} />
          </div>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                id="first_name"
                label="Prénom"
                name="first_name"
                onChange={this.handleChange}
                required
                value={this.state.profile.first_name}
                variant="outlined"
                inputProps={{ minLength: 2 }}
                error={this.state.error["first_name"]}
                helperText={
                  this.state.error["first_name"] ? "Le prénom est requis" : ""
                }
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nom"
                name="surname"
                id="surname"
                onChange={this.handleChange}
                required
                value={this.state.profile.surname}
                variant="outlined"
                inputProps={{ minLength: 5 }}
                error={this.state.error["surname"]}
                helperText={
                  this.state.error["surname"]
                    ? "Le nom de famille est requis"
                    : ""
                }
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                id="birth_day"
                fullWidth
                label="Date de naissance"
                onChange={this.handleChange}
                type="date"
                variant="outlined"
                name="birth_day"
                value={this.state.profile.birth_day}
                InputLabelProps={{
                  shrink: true,
                }}
                error={this.state.error["birth_day"]}
                helperText={
                  this.state.error["birth_day"]
                    ? "La date de naissance est requis"
                    : ""
                }
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                id="tel"
                fullWidth
                label="Téléphone"
                name="tel"
                type="text"
                onChange={this.handleChange}
                variant="outlined"
                value={this.state.profile.tel}
                inputProps={{ minLength: 10, maxLenght: 10 }}
                error={this.state.error["tel"]}
                helperText={
                  this.state.error["tel"]
                    ? "Ce champ est requis et doit être au max 10 caractères"
                    : ""
                }
              >
                <InputMask mask="(0)999 999 99 99" maskChar=" " />
              </TextField>
            </Grid>
          </Grid>
          <div className={classes.adresse}>
            <Typography variant="h6">Adresse</Typography>
            <Divider className={classes.divider} />
          </div>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Adresse"
                name="address_street"
                onChange={this.handleChange}
                value={this.state.profile.address_street}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Code postal"
                name="address_postal_code"
                onChange={this.handleChange}
                value={this.state.profile.address_postal_code}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Ville"
                name="address_city"
                onChange={this.handleChange}
                value={this.state.profile.address_city}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Pays"
                name="address_country"
                defaultValue="France"
                onChange={this.handleChange}
                value={this.state.profile.address_country}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            className={(classes.submit, classes.button)}
            onClick={this.updateInfos}
          >
            Enregister les modifications
          </Button>
        </form>
        <form id="change_pass_form" className={classes.form}>
          <div className={classes.adresse}>
            <Typography variant="h6">Mot de passe</Typography>
            <Divider className={classes.divider} />
          </div>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <FormControl
                variant="outlined"
                fullWidth
                error={!this.state.changePasswordError}
                helperText={
                  !this.state.changePasswordError ? "Le prénom est requis" : ""
                }
              >
                <InputLabel htmlFor="new_password">
                  Nouveau mot de passe
                </InputLabel>
                <OutlinedInput
                  id="new_password"
                  type={this.state.show_new_password ? "text" : "password"}
                  value={this.state.new_password}
                  name="new_password"
                  onChange={this.handleChangePassword}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                        edge="end"
                      >
                        {this.state.show_new_password ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={170}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="current_password">
                  Mot de passe actuel
                </InputLabel>
                <OutlinedInput
                  id="current_password"
                  type={this.state.show_current_password ? "text" : "password"}
                  value={this.state.current_password}
                  name="current_password"
                  onChange={(event) => {
                    event.preventDefault();
                    this.setState({ current_password: event.target.value });
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowCurPassword}
                        onMouseDown={this.handleMouseDownPassword}
                        edge="end"
                      >
                        {this.state.show_current_password ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={170}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            className={(classes.submit, classes.button)}
            onClick={this.setPassword}
          >
            Modifier mon mot de passe
          </Button>
        </form>
        <Snackbar
          open={this.state.notification_open}
          autoHideDuration={6000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Alert
            onClose={this.closeNotifcation}
            severity={this.state.errorNot ? "error" : "success"}
          >
            {this.state.notification_message}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
ProfileDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ProfileDetails);
