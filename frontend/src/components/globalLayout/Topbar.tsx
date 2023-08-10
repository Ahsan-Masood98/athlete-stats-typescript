import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme/theme";
import ThemeButton from "../ThemeButton";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        position: "static",
        top: 0,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        backgroundColor: `${theme.palette.background.default}`,
        justifyContent: "space-between",
      }}
    >
      <Box p={2}>
        <Typography variant="h4" color={colors.primary[100]}>
          Home
        </Typography>
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "block" },
        }}
      >
        <Box display="flex" justifyContent={"flex-end"} mr={2}>
          <ThemeButton />
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
