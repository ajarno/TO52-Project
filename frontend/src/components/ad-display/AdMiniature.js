import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import noPicture from "../../assets/no-picture.png";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    "& .MuiCard-root": {
      height: "100%",
    },
    "& .MuiCardActionArea-root": {
      height: "100%",
    },
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
  publishedDate: {
    fontSize: "0.7rem",
    position: "absolute",
    right: 8,
    bottom: 5,
  },
}));

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
      <Grid item xs={8} sm={6} md={4} lg={2} className={classes.container}>
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
                <PhotoCameraIcon className={classes.icon} /> {ad.total_pictures}
              </Typography>
            </div>
            <CardContent>
              <Typography
                gutterBottom
                variant="body2"
                style={{ overflowWrap: "anywhere" }}
              >
                {ad.headline.length > 50
                  ? ad.headline.slice(0, 49).concat("...")
                  : ad.headline}
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                style={{ fontWeight: "500" }}
              >
                {`${ad.price}€`}
              </Typography>
              <Typography
                className={classes.publishedDate}
                display="block"
                variant="caption"
                color="textSecondary"
              >
                {`publiée ${new Intl.DateTimeFormat(
                  "fr-FR",
                  dateOptions
                ).format(new Date(ad.published))}`}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
