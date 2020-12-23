import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  image: {
    margin: theme.spacing(2),
    position: "relative",
    height: 200,
    minWidth: 200,
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    WebkitBorderRadius: "4px",
    MozBorderRadius: "4px",
    borderRadius: "4px",
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    WebkitBorderRadius: "4px",
    MozBorderRadius: "4px",
    borderRadius: "4px",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

export default function CategoryDisplayer(props) {
  const classes = useStyles();

  const handleSelection = (slug) => {
    sessionStorage.setItem("categorySelected", slug);
    window.location.reload();
  } 

  return (
    <ButtonBase
      focusRipple
      className={classes.image}
      focusVisibleClassName={classes.focusVisible}
      onClick={() => handleSelection(props.category.slug)}
    >
      <span
        className={classes.imageSrc}
        style={{
          backgroundImage: `url(${props.category.picture})`,
        }}
      />
      <span className={classes.imageBackdrop} />
      <span className={classes.imageButton}>
        <Typography
          component="span"
          variant="subtitle1"
          color="inherit"
          className={classes.imageTitle}
        >
          {props.category.name}
          <span className={classes.imageMarked} />
          <br />
          <Typography variant="caption" color="inherit">
            {props.category.total_ads}{" "}
            {props.category.total_ads > 1 ? "annonces" : "annonce"}
          </Typography>
        </Typography>
      </span>
    </ButtonBase>
  );
}
