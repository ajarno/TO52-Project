import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AlgoliaPlaces from "algolia-places-react";

// Algolia Documentation
// https://community.algolia.com/places/documentation.html
const API_KEY = process.env.ALGOLIA_API_KEY;
const APP_ID = process.env.ALGOLIA_APP_ID;

const useStyles = makeStyles((theme) => ({
  error: {
    "& .ap-input": {
      borderColor: "#DC143C",
    },
  },
}));

export default function AdDisplayer(props) {
  const classes = useStyles();

  return (
    <div className={props.error === true ? classes.error : classes.ok}>
      <AlgoliaPlaces
        defaultValue={props.location ? props.location.value : ""}
        placeholder={props.placeholder}
        options={{
          appId: APP_ID,
          apiKey: API_KEY,
          countries: ["fr"],
          type: "city",
        }}
        onChange={props.onChange}
        onSuggestions={props.onSuggestions}
        onCursorChanged={props.onCursorChanged}
        onClear={props.onClear}
        onLimit={props.onLimit}
        onError={props.onError}
      />
    </div>
  );
}
