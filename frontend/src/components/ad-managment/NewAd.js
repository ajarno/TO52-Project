import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useCategories } from "../../api/CategoriesAPI";
// import { postAd } from "../../api/AdsAPI";
import BackBar from "../../shared/components/BackBar";
import PicturesDropzone from "../../shared/components/PicturesDropzone";
import AutcompleteLocation from "../../shared/components/AutocompleteLocation";
import clsx from "clsx";
import {
  TextField,
  FormControl,
  InputAdornment,
  Step,
  Stepper,
  StepButton,
  Typography,
  Button,
  StepContent,
  MenuItem,
  OutlinedInput,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    position: "sticky",
    WebkitPosition: "-webkit-sticky",
    bottom: "5vh",
    float: "right",
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  container: {
    width: "100%",
    "& .MuiStepLabel-labelContainer": {
      textAlign: "initial",
    },
    "& .MuiStepConnector-lineVertical": {
      minHeight: 10,
    },
    "& .MuiStepContent-root": {
      paddingTop: 12,
    },
  },
  text: {
    width: "90%",
  },
}));

export default function AdDisplayer(props) {
  const classes = useStyles();

  // =================================================================
  // ================== DEFINITION OF THE CONSTANTS ==================
  // =================================================================
  const mapTypeToIndex = [
    "headline",
    "category",
    "description",
    "price",
    "pictures",
    "location",
    "owner",
  ];
  const steps = getSteps();
  const categories = useCategories();

  // =================================================================
  // ======================= HELPERS FUNCTIONS =======================
  // =================================================================
  function isOptionnalSteps(stepNumber) {
    return ["pictures", "owner"].includes(mapTypeToIndex[stepNumber]);
  }

  const allStepsCompleted = () => {
    return Object.keys(completed).length === steps.length;
  };

  // =================================================================
  // ================== DEFINITION OF THE VARIABLES ==================
  // =================================================================
  const [ad, setAd] = useState({
    headline: "",
    category: "",
    description: "",
    price: "",
    uploadedPictures: [],
    location: {},
  });
  const [error, setError] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  // =================================================================
  // ================== DEFINITION OF THE FUNCTIONS ==================
  // ======================= IN THE CALL ORDER =======================
  // =================================================================

  // -------------------------- NAVIGATION ---------------------------
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function catchReturn(ev, step) {
    if (ev.key === "Enter") {
      handleNext(step);
      ev.preventDefault();
    }
  }

  const goTo = (newActiveStep) => {
    completeStepWhitoutError();
    if (isOptionnalSteps(activeStep)) handleComplete();
    setActiveStep(newActiveStep);
  };

  const handleNext = () => {
    completeStepWhitoutError();
    if (isOptionnalSteps(activeStep)) handleComplete();

    const newActiveStep =
      activeStep === steps.length - 1 && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  // --------------------- UPDATE AND VALIDATION ---------------------
  function completeStepWhitoutError() {
    const containsError = validate(ad)[activeStep];
    handleComplete(!containsError);
  }

  const handleComplete = (boolean = true) => {
    const newCompleted = completed;
    boolean
      ? (newCompleted[activeStep] = true)
      : delete newCompleted[activeStep];
    setCompleted(newCompleted);
  };

  function handleAdChange(evt, type) {
    let updated = { ...ad };
    updated[type] = ["pictures", "location"].includes(type)
      ? evt
      : evt.target.value;
    setAd(updated);
    validate(updated);
  }

  const validate = (ad) => {
    switch (mapTypeToIndex[activeStep]) {
      case "headline":
        return setTypeError(
          !document.getElementById("ad-title").validity.valid
        );
      case "category":
        return setTypeError(ad.category === "");
      case "description":
        return setTypeError(
          !document.getElementById("ad-description").validity.valid
        );
      case "price":
        return setTypeError(
          !document.getElementById("ad-price").validity.valid
        );
      case "location":
        return setTypeError(Object.keys(ad.location).length === 0);

      default:
        return error;
    }
  };

  function setTypeError(boolean) {
    let newError = { ...error };
    newError[activeStep] = boolean;
    setError(newError);
    return newError;
  }

  // ========================================================
  // ======================= RENDERING ======================
  // ========================================================
  function getSteps() {
    return [
      "Quel est le titre de l'annonce ?",
      "Sélectionnez une catégorie",
      "Ajoutez une description",
      "Quel est votre prix ?",
      "Ajoutez des photos",
      "Où se situe votre bien ?",
      "Vérifiez vos coordonnées",
    ];
  }

  function getStepContent(step) {
    switch (step) {
      case mapTypeToIndex.indexOf("headline"):
        return (
          <TextField
            autoFocus
            required
            inputProps={{ minLength: 5 }}
            error={error[mapTypeToIndex.indexOf("headline")]}
            helperText={
              error[mapTypeToIndex.indexOf("headline")]
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
        );
      case mapTypeToIndex.indexOf("category"):
        return (
          <TextField
            id="ad-category"
            required
            select
            value={ad.category}
            label="Catégorie"
            variant="outlined"
            error={error[mapTypeToIndex.indexOf("category")]}
            helperText={
              error[mapTypeToIndex.indexOf("category")]
                ? "Veuillez sélectionner une catégorie"
                : ""
            }
            onChange={(evt) => {
              handleAdChange(evt, "category");
            }}
            className={classes.text}
          >
            {categories &&
              categories.map((category) => (
                <MenuItem key={category.slug} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
          </TextField>
        );
      case mapTypeToIndex.indexOf("description"):
        return (
          <TextField
            id="ad-description"
            required
            inputProps={{ minLength: 5 }}
            className={classes.text}
            label="Description"
            variant="outlined"
            value={ad.description}
            error={error[mapTypeToIndex.indexOf("description")]}
            helperText={
              error[mapTypeToIndex.indexOf("description")]
                ? "Veuillez indiquer une description pour votre annonce (minimum 5 caractères)"
                : ""
            }
            onChange={(evt) => handleAdChange(evt, "description")}
            multiline
            rows={5}
          />
        );
      case mapTypeToIndex.indexOf("price"):
        return (
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            error={error[mapTypeToIndex.indexOf("price")]}
          >
            <InputLabel htmlFor="ad-price">Prix</InputLabel>
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
              endAdornment={<InputAdornment position="end">€</InputAdornment>}
              labelWidth={30}
            />
            {error[mapTypeToIndex.indexOf("price")] && (
              <FormHelperText id="price-helper-text">
                Veuillez indiquer un prix.
              </FormHelperText>
            )}
          </FormControl>
        );
      case mapTypeToIndex.indexOf("pictures"):
        return (
          <PicturesDropzone
            initFiles={ad.pictures}
            onChange={(files) => handleAdChange(files, "pictures")}
          />
        );
      case mapTypeToIndex.indexOf("location"):
        return (
          <React.Fragment>
            <AutcompleteLocation
              location={ad.location}
              countries={["fr"]}
              placeholder="Entrez le lieu où se situe votre bien"
              required
              error={error[mapTypeToIndex.indexOf("location")]}
              onChange={(location) => {
                handleAdChange(location, "location");
              }}
              onClear={() => {
                handleAdChange({}, "location");
              }}
            />
          </React.Fragment>
        );
      default:
        return <Typography>Etape inconnue</Typography>;
    }
  }

  return (
    <React.Fragment>
      <BackBar title="Nouvelle annonce" />
      <div className={classes.container}>
        <Stepper nonLinear activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton
                onClick={() => goTo(index)}
                completed={completed[index]}
              >
                {label}
                <br />
                {isOptionnalSteps(index) && (
                  <Typography variant="caption">Optionnel</Typography>
                )}
              </StepButton>
              <StepContent
                transitionDuration={{ appear: 300, enter: 300, exit: 100 }}
              >
                {getStepContent(activeStep)}
              </StepContent>
            </Step>
          ))}
        </Stepper>
        <div className={classes.actionsContainer}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className={classes.button}
          >
            Précédent
          </Button>
          {Object.keys(completed).length < steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
            >
              Suivant
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              disabled={!Object.keys(error).every((type) => !error[type])}
              onClick={() => console.log("Annonce soumise")}
              className={classes.button}
            >
              Soumettre l'annonce
            </Button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
