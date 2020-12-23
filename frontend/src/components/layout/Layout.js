import React from "react";
import { Route } from "react-router-dom";
import DenseAppBar from "./AppBar";
import Footer from "./Footer";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../styles/Theme";
import "../../styles/Theme.css";
import "../../App.css";

const Layout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <div>
          <ThemeProvider theme={theme}>
            <div className="App">
              <header className="AppHeader">
                <DenseAppBar />
              </header>
              <div className="root">
                <Component {...matchProps} />
                <Footer />
              </div>
            </div>
          </ThemeProvider>
        </div>
      )}
    />
  );
};
export default Layout;
