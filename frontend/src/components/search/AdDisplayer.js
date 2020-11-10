import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffectOnlyOnce } from "../../api/Utils";
import { fetchAdById } from "../../api/AdsAPI";
import BackBar from "../../shared/components/BackBar";
import PictureSlider from "../../shared/components/PictureSlider";
import Map from "../../shared/components/Map";
import { Typography, Divider, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    margin: "1.5vw 2.5vw",
  },
});

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
        // window.location.href = "/not-found";
      });
  });

  return (
    <React.Fragment>
      <BackBar />
      {ad && (
        <div className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <PictureSlider pictures={ad.pictures} />
              <Typography variant="h6" gutterBottom>
                {ad.headline}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {ad.price}€
              </Typography>
              <Typography variant="caption" color="textSecondary" gutterBottom>
                {`publiée ${new Intl.DateTimeFormat("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(new Date(ad.published))}`}
              </Typography>
              <Divider />
              <Typography variant="subtitle2" gutterBottom>
                Description
              </Typography>
              <Typography variant="body2" gutterBottom>
                {ad.description}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.mapContainer}>
              {ad.location &&
                ad.location.city &&
                ad.location.lat &&
                ad.location.lg && (
                  <Map location={ad.location} />
                )}
            </Grid>
          </Grid>
        </div>
      )}
    </React.Fragment>
  );
}
