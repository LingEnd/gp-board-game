import { DarkMode, LightMode } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { ColorModeContext } from "../themes/useCorlorModeContext";
import AppBarButton from "./AppBarButton";
import { useTranslation } from "react-i18next";

const ThemeSwitcher = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <AppBarButton
      title={
        theme.palette.mode === "dark"
          ? t("lightMode-button")
          : t("darkMode-button")
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
