import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Tabs, Tab } from "@material-ui/core";
import { TabPanel } from "../../shared/components/TabPanel";
import { useEffectOnlyOnce } from "../../api/Utils";
import { useCategories } from "../../api/CategoriesAPI";
import AdList from "./AdList";
import LandingPage from "../home/LandingPage";

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

  // =========================================================
  // =================== DECLARE CONSTANTS ===================
  // =========================================================
  const categories = useCategories();

  // =========================================================
  // ============ DECLARE VARIABLES AND FUNCTIONS  ===========
  // ============== RELATED TO THE TABS CHANGES ==============
  // =========================================================
  const [activeTab, setActiveTab] = useState("");

  useEffectOnlyOnce(() => {
    function initActiveTab() {
      const storedCategorySelected = sessionStorage.getItem("categorySelected");
      setActiveTab(storedCategorySelected ? storedCategorySelected : false);
    }
    initActiveTab();
  });

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
    sessionStorage.setItem("categorySelected", newValue);
  };

  // ========================================================
  // ======================= RENDERING ======================
  // ========================================================
  return (
    <React.Fragment>
      <Paper className={classes.menu} elevation={0} position="static" square>
        <Tabs
          value={activeTab}
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
        </Tabs>
      </Paper>
      {activeTab === false ? (
        <React.Fragment>
          <LandingPage />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {categories &&
            categories.map((category) => {
              return (
                <TabPanel
                  key={category.slug}
                  value={activeTab}
                  index={category.slug}
                >
                  <AdList category={category.slug} />
                </TabPanel>
              );
            })}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
