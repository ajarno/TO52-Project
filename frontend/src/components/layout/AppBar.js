import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";
import logo from "../../assets/logo.svg";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";

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

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar variant="dense" className={classes.toolbar}>
          <div>
            <Link to="/">
              <img src={logo} className={classes.appLogo} alt="logo" />
            </Link>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddBoxIcon />}
              component={Link}
              to="/ads/new-add"
              disableElevation={true}
            >
              Déposer une annonce
            </Button>
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
