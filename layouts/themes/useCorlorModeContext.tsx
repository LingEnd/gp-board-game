import * as React from "react";
import { darkTheme } from "./peach-dark";
import { lightTheme } from "./peach";
import { ThemeProvider } from "@mui/material";

export { ColorModeContext };

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export default function ColorModeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = React.useState<boolean>(true);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === true ? false : true));
      },
    }),
    []
  );

  const theme = React.useMemo(() => (mode ? darkTheme : lightTheme), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}> {children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
