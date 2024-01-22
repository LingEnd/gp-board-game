import { ThemeOptions, createTheme } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#F47983",
      contrastText: "rgba(214,236,240,0.87)",
    },
    secondary: {
      main: "#7bcfa6",
      contrastText: "rgba(80,97,109,0.87)",
    },
    error: {
      main: "#BE002F",
    },
    warning: {
      main: "#ffa631",
    },
    info: {
      main: "#177cb0",
    },
    success: {
      main: "#bddd22",
    },
    background: {
      default: "#1c1c1c",
      paper: "#6e4a4e",
    },
    text: {
      primary: "rgba(214,236,240,0.87)",
      secondary: "rgba(214,236,240,0.7)",
      disabled: "rgba(214,236,240,0.5)",
    },
  },
};

export const darkTheme = createTheme(themeOptions);
