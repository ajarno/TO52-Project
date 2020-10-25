import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import API from "../../api/API";
import { Paper } from "@material-ui/core";
import compareValues from "../../shared/functions/CompareSort";

const useStyles = makeStyles((theme) => ({
  menu: {
    backgroundColor: theme.palette.primary.transparent,
    height: "fit-content",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  },
  tab: {
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

export default function CategoryMenu() {
  const classes = useStyles();

  const [searchState, setSearchState] = useState({
    isLoading: true,
    categories: [],
    error: null,
  });

  const [value, setValue] = React.useState(0);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categories = await API.get("/categories/");
        categories.data.sort(compareValues("name"));
        console.log(categories.data);
        setSearchState({
          isLoading: false,
          categories: categories.data,
        });
        return categories.data;
      } catch (err) {
        setSearchState({
          isLoading: false,
          error: err.message,
        });
        return null;
      }
    }
    loadCategories().then((categories) => {
      let index = -1;
      if (categories) {
        index = categories.findIndex(
          (category) => category.slug === window.location.pathname.substring(1)
        );
      }
      index < 0 ? setValue(false) : setValue(index);
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Paper className={classes.menu} elevation={0} position="static" square>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {searchState.categories && searchState.categories.map((category) => {
            return (
              <Tab
                className={classes.tab}
                key={category.slug}
                label={category.name}
                href={"/" + category.slug}
              />
            );
          })}
        </Tabs>
      </Paper>
    </React.Fragment>
  );
}
