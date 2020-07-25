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
    },
    MuiListItem: {
      gutters: {
        paddingLeft: 5
      }
    },
    MuiSelect: {
      outlined: {
        color: "white"
      },
      iconOutlined: {
        color: "#EDEDED"
      }
    },
    MuiOutlinedInput: {
      root: {
        position: "relative",
        "& $notchedOutline": {
          borderColor: "#EDEDED"
        },
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          borderColor: "#EDEDED",
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            borderColor: "#EDEDED"
          }
        },
        "&$focused $notchedOutline": {
          borderColor: "#EDEDED",
          borderWidth: 1
        }
      },
      notchedOutline: {
        borderColor: "#EDEDED"
      }
    },
    MuiInputLabel: {
      shrink: {
        color: "#EDEDED"
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
