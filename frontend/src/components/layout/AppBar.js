import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useEffectOnlyOnce } from "../../api/Utils";
import useWindowDimensions from "../../shared/functions/DimensionsHook";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Tooltip,
  MenuItem,
  ClickAwayListener,
  Grow,
  Avatar,
  Badge,
  Paper,
  Popper,
  MenuList,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import logo from "../../assets/logo.svg";
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
  smallAvatar: {
    height: 27,
    width: 27,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
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
        fetchUserProfile().then((result) => {
          if (result.status === 200) {
            setAvatar(
              "http://127.0.0.1:8000/media/" + result.data.profile.avatar
            );
            sessionStorage.setItem(
              "avatar-get",
              "http://127.0.0.1:8000/media/" + result.data.profile.avatar
            );
            sessionStorage.setItem("avatar-post", "");
          } else if (result.status === 204) {
            return;
          }
        });
      })
      .catch((error) => setIsAuth(false));
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

  const { width } = useWindowDimensions();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar variant="dense" className={classes.toolbar}>
          <div>
            <Link onClick={returnHome} to="/">
              <img src={logo} className={classes.appLogo} alt="logo" />
            </Link>
            {width > 700 ? (
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddBoxIcon />}
                component={Link}
                to="/ads/new-ad"
                disableElevation={true}
              >
                Déposer une annonce
              </Button>
            ) : (
              <Tooltip
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
            )}
          </div>
          <div>
            {isAuth ? (
              <React.Fragment>
                <Tooltip
                  title="Gérer mes annonces"
                  aria-label="ads-management button"
                  enterDelay={500}
                >
                  <IconButton
                    aria-label="ads-management"
                    color="primary"
                    component={Link}
                    to="/ads/my-ads"
                  >
                    <LocalOfferIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip
                  title="Gérer mon compte"
                  aria-label="account button"
                  enterDelay={500}
                >
                  <IconButton
                    ref={anchorRef}
                    onClick={handleToggle}
                    aria-label="account"
                    color="primary"
                  >
                    <StyledBadge
                      overlap="circle"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      variant="dot"
                    >
                      <Avatar
                        alt="Avatar"
                        src={avatar}
                        className={classes.smallAvatar}
                      />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </React.Fragment>
            ) : (
              <Tooltip
                title="Se connecter"
                aria-label="sign-in button"
                enterDelay={500}
              >
                <IconButton
                  aria-label="sign-in"
                  color="primary"
                  component={Link}
                  to={"/auth/sign-in"}
                >
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>
            )}

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
                          Mon profil
                        </MenuItem>
                        <MenuItem onClick={logout}>Me déconnecter</MenuItem>
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
