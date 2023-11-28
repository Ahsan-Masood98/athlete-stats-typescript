import React from "react";
import { Box, Button, Typography, styled, useTheme } from "@mui/material";
import { tokens } from "../theme/theme";
import { Link } from "react-router-dom";

const CountData: React.FC<{ link: string; count: number }> = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const StyledButton = styled(Button)(() => ({
    textTransform: "none",
    height: "46px",
    marginTop: "20px",
    border: `1px solid ${colors.whiteGradient[400]}`,
    boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.25)",
    borderRadius: "8px",
    color: colors.primary[100],
  }));

  return (
    <Box textAlign="center">
      <Typography
        variant={"h1"}
        m={3}
        color={colors.primary[100]}
        fontSize={"50px"}
      >
        {props.count}
      </Typography>
      <Link to={props.link}>
        <StyledButton fullWidth>
          <Typography>Details</Typography>
        </StyledButton>
      </Link>
    </Box>
  );
};

export default CountData;
