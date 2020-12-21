import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useEffectOnlyOnce } from "../../api/Utils";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Tooltip,
  MenuItem,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Avatar,
  Badge,
  Paper,
  Popper,
  MenuList,
} from "@material-ui/core";

import AddBoxIcon from "@material-ui/icons/AddBox";
import logo from "../../assets/logo.svg";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { logout, isAuthentificated } from "../../api/AuthAPI";
import { fetchUserProfile } from "../../api/UserProfileAPI";
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
  menu: {
    float: theme.left,
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

export default function DenseAppBar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const anchorRef = React.useRef(null);
  const [firstName, setFirstName] = useState("");
  const [avatar, setAvatar] = useState("");

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffectOnlyOnce(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
    isAuthentificated()
      .then((result) => {
        setIsAuth(true);
      })
      .catch((error) => setIsAuth(false));
    fetchUserProfile().then((result) => {
      if (result.status === 200) {
        setAvatar("http://127.0.0.1:8000/media/" + result.data.profile.avatar);
        setFirstName(result.data.profile.first_name);
        console.log("firstName", isAuth);
      } else if (result.status === 204) {
        return {};
      }
    });
  }, [open]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const returnHome = (event) => {
    sessionStorage.removeItem("categorySelected");
    window.location.href = "/";
    return false;
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar variant="dense" className={classes.toolbar}>
          <div>
            <Link onClick={returnHome} to="/">
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
            <ButtonGroup
              variant="text"
              color="primary"
              aria-label="menu button"
            >
              <Tooltip
                title="Se connecter"
                aria-label="sign-in button"
                enterDelay={500}
              >
                <IconButton
                  aria-label="sign-in"
                  color="primary"
                  component={Link}
                  to={isAuth ? "#" : "/auth/sign-in"}
                >
                  {isAuth && (
                    <StyledBadge
                      overlap="circle"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      variant="dot"
                    >
                      <Avatar alt="Remy Sharp" src={avatar} />
                    </StyledBadge>
                  )}
                  {!isAuth && (
                    <Avatar
                      alt="Remy Sharp"
                      src={"/static/images/avatar/1.jpg"}
                    />
                  )}
                </IconButton>
              </Tooltip>
              {isAuth && (
                <IconButton
                  ref={anchorRef}
                  color="primary"
                  size="small"
                  onClick={handleToggle}
                >
                  <ArrowDropDownIcon />
                </IconButton>
              )}
            </ButtonGroup>

            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem
                          onClick={handleClose}
                          component={Link}
                          to="/account"
                        >
                          Bonjour {firstName}
                        </MenuItem>
                        <MenuItem
                          onClick={handleClose}
                          component={Link}
                          to="/account"
                        >
                          Profil
                        </MenuItem>
                        <MenuItem onClick={logout}>Déconnexion</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
