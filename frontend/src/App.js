import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import DenseAppBar from "./components/layout/AppBar";
import Footer from "./components/layout/Footer";
import theme from "./styles/Theme";
import CategoryMenu from "./components/search/CategoryMenu";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "calc(100vh - 4rem)",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <DenseAppBar />
        </header>
        <div className={classes.root}>
          <CategoryMenu />
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
