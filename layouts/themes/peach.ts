import { ThemeOptions, createTheme } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#F47983",
      contrastText: "#424c50",
    },
    secondary: {
      main: "#7bcfa6",
      contrastText: "#50616d",
    },
    error: {
      main: "#BE002F",
    },
    warning: {
      main: "#ffa631",
    },
    background: {
      default: "#e0eee8",
      paper: "#e0eee8",
    },
    info: {
      main: "#177cb0",
    },
    text: {
      primary: "rgba(80,97,109,0.87)",
      secondary: "rgba(80,97,109,0.6)",
      disabled: "rgba(80,97,109,0.38)",
    },
    success: {
      main: "#bddd22",
    },
  },
};
export const lightTheme = createTheme(themeOptions);
