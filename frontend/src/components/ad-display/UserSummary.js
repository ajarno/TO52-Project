import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Button,
  Avatar,
  CardContent,
  Typography,
  CardActions,
  Divider,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import TextsmsIcon from "@material-ui/icons/Textsms";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import RevealButton from "../../shared/components/RevealButton";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    boxShadow:
      "0px 1px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    marginBottom: theme.spacing(2),
  },
  sticky: {
    top: "12vh",
    position: "sticky",
    WebkitPosition: "-webkit-sticky",
  },
  rowAligned: {
    display: "flex",
    alignItems: "center",
  },
  largeAvatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  spaced: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  actionButtons: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    "& .MuiButton-root": {
      "&:not(.MuiButton-containedSecondary)": {
        marginTop: theme.spacing(1),
      },
    },
  },
}));

export default function UserSummary(props) {
  const classes = useStyles();

  const username = props.user.first_name + " " + props.user.surname;

  return (
    <React.Fragment>
      {props.user && (
        <div className={props.sticky ? classes.sticky : ""}>
          <Card className={classes.card}>
            <CardContent>
              <div className={classes.rowAligned}>
                {props.user.avatar ? (
                  <Avatar
                    alt={username}
                    src={props.user.avatar}
                    className={classes.largeAvatar}
                  />
                ) : (
                  <Avatar className={classes.largeAvatar}>
                    {props.user.first_name.charAt(0) +
                      props.user.surname.charAt(0)}
                  </Avatar>
                )}
                <Typography
                  variant="h6"
                  component="h2"
                  style={{ marginLeft: "1em" }}
                >
                  {username}
                </Typography>
              </div>
              {props.user.address_postal_code && props.user.address_city && (
                <React.Fragment>
                  <Divider variant="middle" light className={classes.spaced} />
                  <div className={classes.rowAligned}>
                    <LocationOnIcon />
                    <Typography
                      variant="subtitle2"
                      component="span"
                      style={{ marginLeft: "0.3em" }}
                    >
                      {props.user.address_postal_code +
                        ", " +
                        props.user.address_city}
                    </Typography>
                  </div>
                </React.Fragment>
              )}
            </CardContent>
            <CardActions>
              <div className={classes.actionButtons}>
                <Button
                  startIcon={<TextsmsIcon />}
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/chats"
                >
                  Envoyer un message
                </Button>
                <RevealButton
                  text="Voir l'adresse email"
                  revealedText={props.user.email}
                  startIcon={<MailIcon />}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `mailto:${props.user.email}`;
                  }}
                  spaced="topSpaced"
                  fullWidth
                />
                {props.user.tel && (
                  <RevealButton
                    text="Voir le numéro"
                    revealedText={"Appeler le " + props.user.tel}
                    startIcon={<PhoneIcon />}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `tel:${props.user.tel}`;
                    }}
                    spaced="topSpaced"
                    fullWidth
                  />
                )}
              </div>
            </CardActions>
          </Card>
        </div>
      )}
    </React.Fragment>
  );
}
