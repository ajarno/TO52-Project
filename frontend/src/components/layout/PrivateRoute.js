import React from "react";
import { useAuthenticated } from "../../api/AuthAPI";
import { Route } from "react-router-dom";
import Unauthorized from "../error/Unauthorized";
import DenseAppBar from "./AppBar";
import Footer from "./Footer";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../styles/Theme";
import "../../styles/Theme.css";
import "../../App.css";

export default function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = useAuthenticated();

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <div>
            <ThemeProvider theme={theme}>
              <div className="App">
                <header className="AppHeader">
                  <DenseAppBar />
                </header>
                <div className="root">
                  <Component {...props} />
                  <Footer />
                </div>
              </div>
            </ThemeProvider>
          </div>
        ) : (
          <ThemeProvider theme={theme}>
            <div className="App">
              <header className="AppHeader">
                <DenseAppBar />
              </header>
              <div className="root">
                <Unauthorized />
                <Footer />
              </div>
            </div>
          </ThemeProvider>
        )
      }
    />
  );
}
