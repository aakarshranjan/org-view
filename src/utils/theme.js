import {
  createTheme,
  responsiveFontSizes,
  experimental_sx as sx,
} from "@mui/material";

import { darken, lighten } from "@mui/material/styles";

export const getHoverBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.1) : lighten(color, 0.1);

export const theme = createTheme({
  // typography: {
  //   fontFamily: `"Century Gothic", CenturyGothic, AppleGothic, sans-serif`,
  //   fontSize: 14,
  // },
  status: {
    danger: "#e53e3e",
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: sx({
          minHeight: "10",
        }),
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: sx({
          p: 0,
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: sx({
          background: "blue",
          color: "white",
          borderColor: "blue",
          borderStyle: "solid",
          borderWidth: "0.3vh",
          textTransform: "none",
          padding: "0.2vw 0.8vw",
          "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: getHoverBackgroundColor("blue", "light"),
            color: "white",
            boxShadow: "rgb(252 117 0 / 30%) 0vh 0.5vh 1vh 0vh",
          },
        }),
      },
    },
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
    labelColor: {
      main: "#00000099", //rgba(0, 0, 0, 0.6),
    },
    orange: {
      main: "blue",
    },
    green: {
      main: "#8FD163",
      dark: "#229843",
    },
  },
});
