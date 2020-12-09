import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffectOnlyOnce } from "../../api/Utils";
import { fetchAdById } from "../../api/AdsAPI";
import BackBar from "../../shared/components/BackBar";
import PictureSlider from "../../shared/components/PictureSlider";
import Map from "../../shared/components/Map";
import { Typography, Divider, Grid } from "@material-ui/core";
import UserSummary from "../user/UserSummary";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    margin: "1.5vw 2.5vw",
  },
  spaced: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  headingTitle: {
    fontSize: "1.05rem",
  },
}));

export default function AdDisplayer(props) {
  const classes = useStyles();
  const [ad, setAd] = useState();

  useEffectOnlyOnce(() => {
    fetchAdById(props.match.params.id)
      .then((result) => {
        let _ad = result.data;
        _ad.pictures = _ad.pictures.map((picture) => picture.pic);
        // console.log(_ad);
        setAd(_ad);
      })
      .catch((err) => {
        console.error(err.message);
        window.location.href = "/not-found";
      });
  });

  return (
    <React.Fragment>
      <BackBar title="Détails de l'annonce" />
      {ad && (
        <div className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={7}>
              <PictureSlider pictures={ad.pictures} />
              <div className={classes.spaced}>
                <Typography
                  variant="h5"
                  style={{ fontWeight: "500" }}
                  gutterBottom
                >
                  {ad.headline}
                </Typography>
                <Typography variant="h6" color="secondary" gutterBottom>
                  {ad.price}€
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  style={{ float: "right", marginRight: 16 }}
                  gutterBottom
                >
                  {`publiée ${new Intl.DateTimeFormat("fr-FR", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(new Date(ad.published))}`}
                </Typography>
              </div>
              <Divider variant="middle" />
              <div className={classes.spaced}>
                <Typography
                  variant="h6"
                  className={classes.headingTitle}
                  gutterBottom
                >
                  Description
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {ad.description}
                </Typography>
              </div>
              <Divider />
              <div className={classes.spaced}>
                <Typography
                  variant="h6"
                  className={classes.headingTitle}
                  gutterBottom
                >
                  Localisation
                </Typography>
                {ad.location &&
                  ad.location.city &&
                  ad.location.lat &&
                  ad.location.lng && (
                    <Map location={ad.location} variant="rounded" />
                  )}
              </div>
            </Grid>
            <Grid item xs={12} sm={5}>
              {ad.author && ad.author.profile && (
                <UserSummary user={ad.author.profile} sticky />
              )}
            </Grid>
          </Grid>
        </div>
      )}
    </React.Fragment>
  );
}
