import React, { useContext } from "react";
import { IconButton, useTheme } from "@mui/material";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { ColorModeContext } from "../theme/theme";

const ThemeButton = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <IconButton onClick={colorMode.toggleColorMode}>
      {theme.palette.mode === "dark" ? (
        <DarkModeOutlined />
      ) : (
        <LightModeOutlined />
      )}
    </IconButton>
  );
};

export default ThemeButton;
