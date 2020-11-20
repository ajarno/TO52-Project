import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Slider, TextField, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import LocationInput from "../../shared/components/LocationInput";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    margin: "1.5vw 2.5vw",
  },
}));

export default function Filters(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.container}>
        <Grid container spacing={3}>
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
          <Grid item xs={7} sm={4}>
            <LocationInput
              location={props.location}
              placeholder="Où, dans quelle ville ?"
              onChange={({ suggestion }) => {
                props.onLocationChange({ ...suggestion });
                props.onFilter({
                  location: { ...suggestion },
                  text: props.text,
                  price: props.price,
                });
              }}
              onClear={() => {
                props.onLocationChange({});
                props.onFilter();
              }}
              cityOnly
            />
          </Grid>
          {props.price && (
            <Grid item xs={5} sm={3}>
              <Typography id="discrete-slider" gutterBottom>
                Prix
              </Typography>
              <Slider
                min={0}
                max={1500}
                step={props.price[1] > 1000 ? 500 : 50}
                value={props.price}
                onChange={(evt, value) => {
                  props.onPriceChange(value);
                }}
                onChangeCommitted={props.onFilter}
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
