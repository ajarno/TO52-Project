import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import logo from "../../assets/logo.svg";
import useWindowDimensions from "../../shared/functions/DimensionsHook";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: "white",
    height: "9vh",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
  appLogo: {
    height: "3rem",
    verticalAlign: "middle",
    marginRight: "10px",
  },
}));

export default function DenseAppBar() {
  const classes = useStyles();

  const returnHome = (event) => {
    sessionStorage.removeItem("categorySelected");
    window.location.href = "/";
    return false;
  };

  const { width } = useWindowDimensions();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar variant="dense" className={classes.toolbar}>
          <div>
            <Link onClick={returnHome} to="/">
              <img src={logo} className={classes.appLogo} alt="logo" />
            </Link>
            {width > 700 ? 
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddBoxIcon />}
              component={Link}
              to="/ads/new-ad"
              disableElevation={true}
            >
              Déposer une annonce
            </Button> : <Tooltip
              title="Déposer une annonce"
              aria-label="new-ad-button"
              enterDelay={500}
            >
              <IconButton
                aria-label="new-ad"
                color="secondary"
                component={Link}
                to="/ads/new-ad"
              >
                <AddBoxIcon />
              </IconButton>
            </Tooltip>
            }
          </div>
          <div>
            <Tooltip
              title="Se connecter"
              aria-label="sign-in button"
              enterDelay={500}
            >
              <IconButton
                aria-label="sign-in"
                color="primary"
                component={Link}
                to="/auth/sign-in"
              >
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
