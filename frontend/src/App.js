// import React, { useEffect, useState } from 'react';
import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import DenseAppBar from "./components/layout/AppBar";
import Footer from "./components/layout/Footer"
import theme from "./styles/Theme";

function App() {
  // const [appState, setAppState] = useState({
  //   loading: false,
  //   repos: null,
  // });

  // useEffect(() => {
  //   setAppState({ loading: true });
  //   const apiUrl = `https://api.github.com/users/hacktivist123/repos`;
  //   fetch(apiUrl)
  //     .then((res) => res.json())
  //     .then((repos) => {
  //       setAppState({ loading: false, repos: repos });
  //     });
  // }, [setAppState]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <DenseAppBar />
        </header>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
