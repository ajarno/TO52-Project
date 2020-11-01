import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Tab } from "@material-ui/core";
import { TabPanel, TabContext, TabList } from "@material-ui/lab";
import { useEffectOnlyOnce } from "../../api/Utils";
import { fetchCategories } from "../../api/CategoriesAPI";
import Ads from "./Ads";

const useStyles = makeStyles((theme) => ({
  menu: {
    backgroundColor: theme.palette.primary.transparent, //rgba(0, 121, 255, 0.6)
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

  const [activeTab, setActiveTab] = useState("");
  const [categories, setCategories] = useState([]);

  useEffectOnlyOnce(() => {
    const storedCategories = JSON.parse(sessionStorage.getItem("categories"));
    if (storedCategories) {
      setCategories(storedCategories);
    } else {
      fetchCategories().then((_categories) => {
        setCategories(_categories.data);
        sessionStorage.setItem("categories", JSON.stringify(_categories.data));
      });
    }
    initActiveTab();
  });

  function initActiveTab() {
    const storedCategorySelected = sessionStorage.getItem("categorySelected");
    setActiveTab(storedCategorySelected ? storedCategorySelected : false);
  }

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
    sessionStorage.setItem("categorySelected", newValue);
  };

  return (
    <React.Fragment>
      <TabContext value={activeTab}>
        <Paper className={classes.menu} elevation={0} position="static" square>
          <TabList
            selectionFollowsFocus
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="on"
          >
            {categories &&
              categories.map((category) => {
                return (
                  <Tab
                    className={classes.tab}
                    value={category.slug}
                    key={category.slug}
                    label={category.name}
                  />
                );
              })}
          </TabList>
        </Paper>
        {categories &&
          categories.map((category) => {
            return (
              <TabPanel key={category.slug} value={category.slug}>
                <Ads category={category.slug} />
              </TabPanel>
            );
          })}
      </TabContext>
    </React.Fragment>
  );
}
