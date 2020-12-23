import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, ButtonBase, Grid } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { useEffectOnlyOnce } from "../../api/Utils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%",
  },
  image: {
    marginRight: "2em",
    boxShadow: theme.shadows[1],
    borderRadius: 4,
    position: "relative",
    width: "6em",
    height: "6em",
    "&:hover": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.5,
      },
    },
  },
  imageBackdrop: {
    position: "absolute",
    borderRadius: 4,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black,
    opacity: 0,
    transition: theme.transitions.create("opacity"),
  },
  imageSrc: {
    borderRadius: 4,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  input: {
    display: "none",
  },
}));

function PictureMiniature(props) {
  const classes = useStyles();

  return (
    <ButtonBase
      focusRipple
      className={classes.image}
      focusVisibleClassName={classes.focusVisible}
      onClick={() => props.onRemove(props.file)}
    >
      <span
        className={classes.imageSrc}
        style={{
          backgroundImage: `url(${props.src})`,
        }}
      />
      <span className={classes.imageBackdrop}>
        <CancelIcon />
      </span>
    </ButtonBase>
  );
}

export default function PicturesManager(props) {
  const classes = useStyles();

  useEffectOnlyOnce(() => {
    const inputElement = document.getElementById("upload-file");
    inputElement.addEventListener("change", handleFiles, false);
  });

  function handleFiles() {
    const file = this.files[0];
    props.onAdd(props.newFiles, file);
  }

  return (
    <Grid container>
      {props.files &&
        props.files.map((file, index) => {
          return (
            <PictureMiniature
              key={index}
              src={file.pic}
              file={file}
              onRemove={(file) => props.onRemove(props.files, file)}
            />
          );
        })}
      {props.newFiles &&
        props.newFiles.map((file, index) => {
          return (
            <PictureMiniature
              key={props.files.length + index}
              src={file}
              file={file}
              onRemove={(file) => props.onRemove(props.newFiles, file)}
            />
          );
        })}
      {props.files.length + props.newFiles.length < 5 ? (
        <React.Fragment>
          <input
            accept="image/*"
            className={classes.input}
            id="upload-file"
            type="file"
          />
          <label htmlFor="upload-file">
            <Button
              startIcon={<PhotoCamera />}
              variant="outlined"
              color="primary"
              component="span"
            >
              Ajouter une image
            </Button>
          </label>
        </React.Fragment>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </Grid>
  );
}
