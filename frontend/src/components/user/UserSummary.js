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

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    boxShadow:
      "0px 1px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    marginBottom: theme.spacing(2),
  },
  heading: {
    display: "flex",
    alignItems: "center",
    paddingBottom: theme.spacing(2),
  },
  actionButtons: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    "& .MuiButton-root": {
      marginTop: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

export default function UserSummary(props) {
  const classes = useStyles();

  const username = props.user.first_name + " " + props.user.surname;

  return (
    <React.Fragment>
      {props.user && (
        <Card className={classes.card}>
          <CardContent>
            <div className={classes.heading}>
              {props.user.avatar ? (
                <Avatar
                  alt={username}
                  src={props.user.avatar}
                  className={classes.large}
                />
              ) : (
                <Avatar className={classes.large}>
                  {props.user.first_name.charAt(0) +
                    props.user.surname.charAt(0)}
                </Avatar>
              )}
              <Typography variant="h6" component="h2">
                {username}
              </Typography>
            </div>
            <Divider />
            <LocationOnIcon />
            <Typography variant="subtitle2" component="span">
              {props.user.adress_postal_code + ", " + props.user.adress_city}
            </Typography>
          </CardContent>
          <CardActions>
            <div className={classes.actionButtons}>
              <Button
                startIcon={<TextsmsIcon />}
                variant="contained"
                color="secondary"
              >
                Envoyer un message
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<MailIcon />}
              >
                Voir l'adresse email
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<PhoneIcon />}
              >
                Voir le numéro
              </Button>
            </div>
          </CardActions>
        </Card>
      )}
    </React.Fragment>
  );
}
