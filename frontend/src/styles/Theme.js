import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2d3047",
      transparent: "rgba(45, 48, 71, 0.5)",
    },
    secondary: {
      main: "#ff8600",
      transparent: "rgba(255, 134, 0, 0.5)",
    },
  },
});

export default theme;
