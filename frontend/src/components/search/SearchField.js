import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import {
  InputAdornment,
  OutlinedInput,
  IconButton,
  FormControl,
  InputLabel,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  searchField: {
    width: "-webkit-fill-available",

    "& .MuiOutlinedInput-input": {
      padding: "10px 14px",
      height: 20,
    },
    "& .MuiInputLabel-outlined:not(.Mui-focused)": {
      lineHeight: 0,
    },
  },
}));

export default function SearchField(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <FormControl
        className={[
          classes.margin,
          classes.textField,
          classes.searchField,
        ].join(" ")}
        variant="outlined"
      >
        <InputLabel htmlFor={props.id}>Que recherchez-vous ?</InputLabel>
        <OutlinedInput
          id={props.id}
          value={props.value}
          onChange={(evt) => props.onChange(evt.target.value)}
          onKeyPress={(ev) => {
            if (ev.key === "Enter") {
              if (props.value !== "") props.onValidation();
              ev.preventDefault();
            }
          }}
          endAdornment={
            <InputAdornment position="end">
              {props.value && (
                <IconButton
                  aria-label="clear the search field"
                  onClick={() => {
                    props.onChange("");
                    props.onValidation({ text: "" });
                  }}
                  edge="end"
                >
                  <ClearIcon />
                </IconButton>
              )}
              <IconButton
                aria-label="validate"
                onClick={() => {
                  props.onValidation();
                }}
                edge="end"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          labelWidth={165}
        />
      </FormControl>
    </React.Fragment>
  );
}
