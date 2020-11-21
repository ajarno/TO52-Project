import React, { useCallback } from "react";
import useAlgoliaPlaces from "../functions/AlgoliaPlacesHook";
import { makeStyles } from "@material-ui/core/styles";

// Algolia Documentation
// https://community.algolia.com/places/documentation.html
const API_KEY = process.env.ALGOLIA_API_KEY;
const APP_ID = process.env.ALGOLIA_APP_ID;

const useStyles = makeStyles((theme) => ({
  error: {
    "& .ap-input": {
      borderColor: "rgb(255, 0, 0, 0.87)",
    },
  },
}));

export default function AutcompleteLocation(props) {
  const classes = useStyles();

  const options = {
    appId: APP_ID,
    apiKey: API_KEY,
    language: "fr",
  };
  if (props.countries) options["countries"] = props.countries;
  if (props.type) options["type"] = props.type;

  const setContainer = useAlgoliaPlaces({
    options: options,
    events: {
      onClear() {
        if (props.onClear) {
          props.onClear();
        }
      },
      onChange({ suggestion }) {
        if (props.onChange) {
          props.onChange(suggestion);
        }
      },
    },
  });

  const algoliaPlacesRef = useCallback((node) => {
    if (node !== null) {
      setContainer(node);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={props.error === true ? classes.error : classes.ok}>
      <input
        defaultValue={props.location ? props.location.value : ""}
        placeholder={props.placeholder}
        ref={algoliaPlacesRef}
      />
    </div>
  );
}
