import { DarkMode, LightMode } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { ColorModeContext } from "../themes/useCorlorModeContext";
import AppBarButton from "./AppBarButton";

const ThemeSwitcher = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <AppBarButton
      title={
        "Toggle " + (theme.palette.mode === "dark" ? "light" : "dark") + " mode"
      }
      onClick={colorMode.toggleColorMode}
    >
      {theme.palette.mode === "dark" ? (
        <DarkMode fontSize="small" />
      ) : (
        <LightMode fontSize="small" />
      )}
    </AppBarButton>
  );
};

export default ThemeSwitcher;
