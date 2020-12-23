import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffectOnlyOnce, useForceUpdate } from "../../api/Utils";
import {
  fetchAdById,
  postPictureAd,
  deletePictureAd,
  postLocationAd,
  putAd,
} from "../../api/AdsAPI";
import BackBar from "../../shared/components/BackBar";
import PicturesManager from "./PicturesManager";
import AutocompleteLocation from "../../shared/components/AutocompleteLocation";
import CheckIcon from "@material-ui/icons/Check";
import {
  TextField,
  FormControl,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormHelperText,
  Grid,
  Fab,
  Zoom,
  useTheme,
  Container,
} from "@material-ui/core";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    marginTop: "1em",
  },
  actionsContainer: {
    position: "sticky",
    WebkitPosition: "-webkit-sticky",
    bottom: "5vh",
    left: "calc(100% - 13vh)",
    marginBottom: theme.spacing(2),
  },
  text: {
    width: "100%",
  },
}));

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function AdEditable(props) {
  const classes = useStyles();
  const theme = useTheme();

  const forceUpdate = useForceUpdate();

  // -------------------------------------------------------
  // ------------------- INITIALIZATION --------------------
  // -------------------------------------------------------
  const [ad, setAd] = useState({
    headline: "",
    category: "",
    description: "",
    price: "",
  });
  const [updatedFields, setUpdatedFields] = useState({});

  const [pictures, setPictures] = useState([]);
  const [deletedPictures, setDeletedPictures] = useState([]);
  const [addedPictures, setAddedPictures] = useState([]);

  const [location, setLocation] = useState({});
  const [newLocation, setNewLocation] = useState({});

  const [changed, setChanged] = useState(false);
  const [error, setError] = useState({});

  useEffectOnlyOnce(() => {
    fetchAdById(props.match.params.id)
      .then((result) => {
        let _ad = result.data;
        _ad.location["value"] = "";
        if (_ad.location["street"])
          _ad.location["value"] = _ad.location["value"].concat(
            _ad.location["street"] + ", "
          );
        _ad.location["value"] = _ad.location["value"].concat(
          _ad.location["city"] + ", "
        );
        _ad.location["value"] = _ad.location["value"].concat(
          _ad.location["country"]
        );
        setAd(_ad);
        setPictures(_ad.pictures);
        setLocation(_ad.location);
      })
      .catch((err) => {
        console.error(err.message);
        // window.location.href = "/not-found";
      });
  });

  // -------------------------------------------------------
  // -------------- UPDATE AD AND VALIDATION ---------------
  // -------------------------------------------------------
  function catchReturn(ev) {
    if (ev.key === "Enter") {
      var target = ev.srcElement || ev.target;
      var next = target;
      while ((next = next.nextElementSibling)) {
        if (next == null) break;
        if (next.tagName.toLowerCase() === "input") {
          next.focus();
          break;
        }
      }
      ev.preventDefault();
    }
  }

  function handleAdChange(evt, type) {
    setChanged(true);

    switch (type) {
      case "location":
        const newLocation = evt;
        setLocation(newLocation);
        setNewLocation(newLocation);
        validate(type, evt);
        break;

      default:
        const newValue = evt.target.value;
        let _updatedAd = { ...ad };
        _updatedAd[type] = newValue;
        setAd(_updatedAd);
        let _updatedFields = { ...updatedFields };
        _updatedFields[type] = newValue;
        setUpdatedFields(_updatedFields);
        validate(type);
        break;
    }
  }

  const validate = (type, location = null) => {
    let err = {};
    switch (type) {
      case "headline":
        err = !document.getElementById("ad-title").validity.valid;
        break;
      case "description":
        err = !document.getElementById("ad-description").validity.valid;
        break;
      case "price":
        err = !document.getElementById("ad-price").validity.valid;
        break;
      case "location":
        err = Object.keys(location).length === 0;
        break;

      default:
        err = error;
    }
    return setTypeError(type, err);
  };

  function setTypeError(type, boolean) {
    let newError = { ...error };
    newError[type] = boolean;
    setError(newError);
    return newError;
  }

  // -------------------------------------------------------
  // ------------------ MANAGE PICTURES --------------------
  // -------------------------------------------------------
  function adPicture(files, file) {
    setChanged(true);

    toBase64(file).then((picture) => {
      files.push(picture);
      setAddedPictures(files);
      forceUpdate();
    });
  }

  function removePicture(pictures, file) {
    setChanged(true);

    // Take out the element from the array
    const index = pictures.indexOf(file);
    if (index !== -1) {
      pictures.splice(index, 1);
    }

    // Save changes depending on whether the backup is temporary or in the database
    const databaseSavedPicture = file.pic;
    if (databaseSavedPicture) {
      const arr = deletedPictures;
      arr.push(file.id);
      setDeletedPictures(arr);
      setPictures(pictures);
    } else {
      setAddedPictures(pictures);
    }
    forceUpdate();
  }

  // -------------------------------------------------------
  // ------------------- PUSH CHANGES ----------------------
  // -------------------------------------------------------
  async function update() {
    const requests = [];

    deletedPictures.forEach((fileId) => {
      requests.push(deletePictureAd(fileId));
    });
    addedPictures.forEach((file) => {
      const picture = new FormData();
      picture.append("relatedAd", props.match.params.id);
      picture.append("pic", file);
      requests.push(postPictureAd(picture));
    });

    if (Object.keys(newLocation).length !== 0) {
      const loc = {
        country: newLocation["country"],
        countryCode: newLocation["countryCode"],
        region: newLocation["administrative"],
        county: newLocation["county"],
        postalCode: newLocation["postcode"],
        lat: newLocation["latlng"]["lat"],
        lng: newLocation["latlng"]["lng"],
        ad: [props.match.params.id],
      };
      if (newLocation["city"]) {
        loc["city"] = newLocation["city"];
        loc["street"] = newLocation["name"];
      } else {
        loc["city"] = newLocation["name"];
      }
      requests.push(postLocationAd(loc));
    }

    if (Object.keys(updatedFields).length !== 0) {
      const updatedAd = { ...updatedFields };
      updatedAd["id"] = props.match.params.id;
      requests.push(putAd(updatedAd));
    }

    Axios.all(requests).then(() => {
      window.location.reload()
    });
  }

  // -------------------------------------------------------
  // --------------------- RENDERING -----------------------
  // -------------------------------------------------------
  return (
    <React.Fragment>
      <BackBar title={`Edition de l'annonce`} />

      <Container maxWidth="lg">
        {ad && (
          <Grid
            className={classes.container}
            container
            spacing={3}
            justify="center"
            alignItems="stretch"
          >
            <Grid item xs={9} lg={7}>
              <TextField
                autoFocus
                required
                inputProps={{ minLength: 5 }}
                error={error["headline"]}
                helperText={
                  error["headline"]
                    ? "Ce champs est requis et doit comporter minimum 5 caractères"
                    : ""
                }
                value={ad.headline}
                onChange={(evt) => handleAdChange(evt, "headline")}
                className={classes.text}
                id="ad-title"
                variant="outlined"
                label="Nom de l'annonce"
                onKeyPress={(ev) => catchReturn(ev, "headline")}
              />
            </Grid>
            <Grid item xs={3} lg={2}>
              <FormControl
                className={[classes.margin, classes.textField].join(" ")}
                variant="outlined"
                fullWidth
                error={error["price"]}
              >
                <InputLabel htmlFor="ad-price">Prix *</InputLabel>
                <OutlinedInput
                  id="ad-price"
                  type="number"
                  required
                  inputProps={{
                    "aria-label": "weight",
                    min: 0,
                  }}
                  value={ad.price}
                  onChange={(evt) => handleAdChange(evt, "price")}
                  onKeyPress={(ev) => catchReturn(ev, "price")}
                  endAdornment={
                    <InputAdornment position="end">€</InputAdornment>
                  }
                  labelWidth={40}
                  fullWidth
                />
                {error["price"] && (
                  <FormHelperText id="price-helper-text">
                    Veuillez indiquer un prix.
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={9}>
              <AutocompleteLocation
                location={location}
                countries={["fr"]}
                placeholder="Entrez le lieu où se situe votre bien"
                required
                error={error["location"]}
                onChange={(location) => {
                  handleAdChange(location, "location");
                }}
                onClear={() => {
                  handleAdChange({}, "location");
                }}
              />
            </Grid>
            <Grid item xs={12} lg={9}>
              <TextField
                id="ad-description"
                required
                inputProps={{ minLength: 5 }}
                className={classes.text}
                label="Description"
                variant="outlined"
                value={ad.description}
                error={error["description"]}
                helperText={
                  error["description"]
                    ? "Veuillez indiquer une description pour votre annonce (minimum 5 caractères)"
                    : ""
                }
                onChange={(evt) => handleAdChange(evt, "description")}
                multiline
                rows={5}
              />
            </Grid>
            <Grid item xs={12} lg={9}>
              <PicturesManager
                files={pictures}
                newFiles={addedPictures}
                onAdd={adPicture}
                onRemove={removePicture}
              />
            </Grid>
          </Grid>
        )}
      </Container>
      {changed && (
        <Zoom
          in
          timeout={{
            enter: theme.transitions.duration.enteringScreen,
            exit: theme.transitions.duration.leavingScreen,
          }}
          style={{
            transitionDelay: `${theme.transitions.duration.leavingScreen}ms`,
          }}
          unmountOnExit
        >
          <Fab
            className={classes.actionsContainer}
            color="secondary"
            aria-label="validate"
            disabled={!Object.keys(error).every((type) => !error[type])}
            onClick={update}
          >
            <CheckIcon />
          </Fab>
        </Zoom>
      )}
    </React.Fragment>
  );
}
