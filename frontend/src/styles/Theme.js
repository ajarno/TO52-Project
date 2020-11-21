import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2d3047",
      light: "#535883",
      dark: "#1d1f2e",
      transparent: "rgba(45, 48, 71, 0.5)",
    },
    secondary: {
      main: "#ff8600",
      light: "#ffa43f",
      dark: "#e57800",
      transparent: "rgba(255, 134, 0, 0.5)",
      contrastText: "#fff",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 700,
      im: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
