import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import noPicture from "../../assets/no-picture.png";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles({
  container: {
    minWidth: "fit-content",
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  image: {
    position: "relative",
  },
  picnumber: {
    display: "flex",
    position: "absolute",
    bottom: "3px",
    right: "10px",
  },
  icon: {
    marginRight: "5px",
  },
});

export default function AdMiniature(props) {
  const classes = useStyles();

  const ad = props.ad;
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <React.Fragment>
      <Grid item xs={6} sm={3} className={classes.container}>
        <Box width={220} marginRight={0.5} my={5}>
          <Card className={classes.root} variant="outlined">
            <CardActionArea href={`/ads/${ad.id}`}>
              <div className={classes.image}>
                {ad.total_pictures > 0 ? (
                  <CardMedia
                    className={classes.media}
                    image={ad.first_picture.pic}
                    alt={"Image de l'annonce " + ad.headline}
                  />
                ) : (
                  <CardMedia
                    className={classes.media}
                    image={noPicture}
                    title={"Pas d'image disponible"}
                  />
                )}
                <Typography className={classes.picnumber} gutterBottom>
                  <PhotoCameraIcon className={classes.icon} />{" "}
                  {ad.total_pictures}
                </Typography>
              </div>
              <CardContent>
                <Typography gutterBottom variant="body2">
                  {ad.headline}
                </Typography>
                <Typography
                  display="block"
                  variant="caption"
                  color="textSecondary"
                >
                  {`publiée ${new Intl.DateTimeFormat(
                    "fr-FR",
                    dateOptions
                  ).format(new Date(ad.published))}`}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {`${ad.price}€`}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Grid>
    </React.Fragment>
  );
}
