import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Slider, TextField, Typography } from "@material-ui/core";
// import SearchIcon from "@material-ui/icons/Search";
import AutocompleteLocation from "../../shared/components/AutocompleteLocation";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    margin: "1.5vw 2.5vw",
  },
}));

export default function Filters(props) {
  const classes = useStyles();

  function getDomTextAndPriceValues() {
    // For some unknown reason (because of the Algolia search?)
    // props.text and props.price here are at their default value
    // so we need to get them by another means
    const text = document.getElementById("input-search").value;
    const priceStringFormat = document
      .getElementById("price-range")
      .getElementsByTagName("input")[0]
      .value.split(",");
    const price = [
      parseInt(priceStringFormat[0]),
      parseInt(priceStringFormat[1]),
    ];
    return { text, price };
  }
  
  return (
    <React.Fragment>
      <div className={classes.container}>
        <Grid container alignItems="flex-end" spacing={3}>
          <Grid item xs={12} sm={5}>
            <TextField
              id="input-search"
              label="🔍 Que recherchez-vous ?"
              value={props.text}
              onChange={(evt) => props.onTextChange(evt.target.value)}
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  props.onFilter();
                  ev.preventDefault();
                }
              }}
              // variant="outlined"
              style={{ width: "-webkit-fill-available" }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <AutocompleteLocation
              placeholder="Où, dans quelle ville ?"
              type="city"
              countries={["fr"]}
              onChange={(location) => {
                props.onLocationChange(location);
                const { text, price } = getDomTextAndPriceValues();
                props.onFilter({
                  text: text,
                  location: location,
                  price: price,
                });
              }}
              onClear={() => {
                const { text, price } = getDomTextAndPriceValues();
                props.onLocationChange();
                props.onFilter({
                  text: text,
                  price: price,
                });
              }}
            />
          </Grid>
          {props.price && (
            <Grid item xs={12} sm={3} style={{ paddingBottom: 0 }}>
              <Grid
                container
                alignItems="baseline"
                style={{ marginBottom: -5 }}
              >
                <Grid item xs={12} sm={3}>
                  <Typography
                    id="discrete-slider"
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Prix
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={9} style={{ textAlign: "right" }}>
                  <Typography
                    id="discrete-slider"
                    variant="caption"
                    color="textSecondary"
                    gutterBottom
                  >
                    min : {props.price[0]}€ - max : {props.price[1] + "€"}
                    {props.price[1] >= 1500 ? "+" : ""}
                  </Typography>
                </Grid>
              </Grid>
              <Slider
                color="secondary"
                id="price-range"
                min={0}
                max={1500}
                step={props.price[1] > 1000 ? 100 : 50}
                value={props.price}
                onChange={(evt, value) => {
                  props.onPriceChange(value);
                }}
                onChangeCommitted={() => props.onFilter()}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                marks
              />
            </Grid>
          )}
        </Grid>
      </div>
    </React.Fragment>
  );
}
