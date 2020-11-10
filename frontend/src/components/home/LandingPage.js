import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useCategories } from "../../api/CategoriesAPI";
import CategoryDisplayer from "./CategoryDisplayer";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  background: {
    position: "absolute",
    height: "40vh",
    width: "100vw",
    zIndex: -1,
    backgroundColor: theme.palette.grey[200], //theme.palette.primary.main,
  },
  title: {
    textAlign: "center",
    padding: "3em 2em",
  },
  root: {
    width: "100%",
  },
}));

export default function LandingPage() {
  const classes = useStyles();

  const categories = useCategories();

  // ========================================================
  // ======================= RENDERING ======================
  // ========================================================
  return (
    <React.Fragment>
      <div className={classes.titleContainer}>
        <div className={classes.background}></div>
        <div className={classes.title}>
        <Typography component="h1" variant="h4">
          Les petites annonces UT'Bohémiennes
        </Typography>
        <Typography component="h3" variant="subtitle2">
          Vous partez en stage, cherchez un repreneur pour votre appart, vos
          meubles ? Nous vous mettons en relations avec les autres étudiants et
          ceux qui sont intéressés pourront vous contacter !
        </Typography>
        </div>
      </div>
      <Grid className={classes.root} container justify="center" spacing={4}>
        {categories.map((category) => {
          return (
            <Grid item key={category.slug} xs={12} sm={4} md={3}>
              <CategoryDisplayer category={category} />
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
}
