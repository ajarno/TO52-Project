import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Tabs, Tab } from "@material-ui/core";

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

export default function CategoryMenu(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper className={classes.menu} elevation={0} position="static" square>
        <Tabs
          value={props.activeTab}
          selectionFollowsFocus
          onChange={props.handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="on"
        >
          {props.categories &&
            props.categories.map((category) => {
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
    </React.Fragment>
  );
}
