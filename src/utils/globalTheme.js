import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Helvetica Neue",
      "-apple-system",
      "Roboto",
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ]
  },
  overrides: {
    MuiInput: {
      underline: {
        fontSize: 25,
        "&:after": {
          borderBottom: "0px solid white"
        },
        "&:before": {
          borderBottom: "0px solid white"
        },
        "&:hover:not($disabled):after": {
          borderBottom: "0px solid white"
        },
        "&:hover:not($disabled):before": {
          borderBottom: "0px solid white"
        }
      }
    }
  },
  palette: {
    primary: {
      main: "#262A43"
    },
    secondary: {
      main: "#FFFFFF"
    }
  }
});

export default theme;
