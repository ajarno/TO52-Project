import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import AdEditableMiniature from "./AdEditableMiniature";
import { fetchAdsByUser } from "../../api/AdsAPI";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  displayer: {
    padding: "0.6em 0.9em",
    borderRadius: 4,
    backgroundColor: theme.palette.secondary.veryTransparent,
  },
}));

export default function AdListManagment(props) {
  const classes = useStyles();

  const [ads, setAds] = useState([]);

  React.useEffect(() => {
    fetchAdsByUser(1)
      .then((_ads) => {
        setAds(_ads.data);
        // console.log(_ads.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  return (
    <React.Fragment>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
        <div style={{ marginTop: "1.7em", alignSelf: "center" }}>
          <Typography
            variant="button"
            color="secondary"
            className={classes.displayer}
            gutterBottom
          >
            {ads.length} annonce(s) en ligne
          </Typography>
        </div>
        {ads.length > 0 &&
          ads.map((ad) => {
            return (
              <Grid item key={ad.id}>
                <AdEditableMiniature ad={ad} />
              </Grid>
            );
          })}
      </Grid>
    </React.Fragment>
  );
}
