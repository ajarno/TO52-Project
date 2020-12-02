import React, { useState } from "react";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import AvatarChooser from "./AvatarChooser";
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  Box,
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(4),
    },
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: "0 auto",
  },
}));

export default function Profile() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [userProfilePic, setUserProfilePic] = useState("");

  const handleClickOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleChange = (profile) => {
    setUserProfilePic(profile);
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Box alignItems="center" display="flex" flexDirection="column">
            <Badge
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  onClick={handleClickOpen}
                >
                  <PhotoCamera />
                </IconButton>
              }
            >
              <Avatar
                alt="Travis Howard"
                src={
                  userProfilePic === " "
                    ? "/static/images/avatar/2.jpg" //changer l'image par défaut
                    : userProfilePic
                }
                className={classes.large}
              />
            </Badge>
            <AvatarChooser
              open={isOpen}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
              onChange={handleChange}
            />
          </Box>
        </CardContent>
      </Card>
      <Box p={2}>
        <Typography variant="body2" align="center">
          Avec une photo, vous avez de quoi personnaliser votre profil et
          rassurer les autres membres !
        </Typography>
      </Box>
    </div>
  );
}
