import ThemeButton from "./components/ThemeButton";
import { ColorModeContext, useMode } from "./theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
function App() {
  const { theme, colorMode } = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ThemeButton />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
