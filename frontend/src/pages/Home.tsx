import React from "react";
import { Box, Grid, Paper, Typography, styled, useTheme } from "@mui/material";
import { tokens } from "../theme/theme";
import {
  CalendarMonthOutlined,
  DirectionsRunOutlined,
  ScoreboardOutlined,
  SportsScoreOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { json, redirect, useLoaderData } from "react-router-dom";
import config from "../services/config.json";
import { getAuthToken } from "../services/auth";
import CountData from "../components/CountData";

type StatsData = {
  athleteCount: number;
  eventCount: number;
  resultCount: number;
  competitionCount: number;
};

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { athleteCount, eventCount, resultCount, competitionCount } =
    useLoaderData() as StatsData;
  const StyledPaper = styled(Paper)({
    backgroundColor: `${colors.whiteGradient[100]}`,
    padding: "25px",
    borderRadius: "10px",
    height: "95%",
    marginLeft: "10px",
    marginRight: "10px",
    marginBottom: "10px",
  });
  const TitleBox = styled(Box)({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  });
  return (
    <>
      <Box sx={{ width: "97%", margin: "15px" }}>
        <Paper elevation={3} sx={{ padding: "15px" }}>
          <Box p={2} display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h5" color={colors.primary[100]}>
              Statistics
            </Typography>
          </Box>
          <Grid container>
            <Grid item xs={6} md={4} lg={3}>
              <StyledPaper elevation={3}>
                <TitleBox>
                  <Typography variant="h6">Toatal Athelets</Typography>
                  <DirectionsRunOutlined />
                </TitleBox>
                <CountData link={"athletes"} count={athleteCount} />
              </StyledPaper>
            </Grid>
            <Grid item xs={6} md={4} lg={3}>
              <StyledPaper elevation={3}>
                <TitleBox>
                  <Typography variant="h6">Total Events</Typography>
                  <CalendarMonthOutlined />
                </TitleBox>
                <CountData link={"events"} count={eventCount} />
              </StyledPaper>
            </Grid>
            <Grid item xs={6} md={4} lg={3}>
              <StyledPaper elevation={3}>
                <TitleBox>
                  <Typography variant="h6">Result Data</Typography>
                  <ScoreboardOutlined />
                </TitleBox>
                <CountData link={"managment/results"} count={resultCount} />
              </StyledPaper>
            </Grid>
            <Grid item xs={6} md={4} lg={3}>
              <StyledPaper elevation={3}>
                <TitleBox>
                  <Typography variant="h6">Competition Data</Typography>
                  <SportsScoreOutlined />
                </TitleBox>
                <CountData
                  link={"managment/competition"}
                  count={competitionCount}
                />
              </StyledPaper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default Home;

export const loader = async () => {
  try {
    const response = await axios.get(config.apiUrl + "/dashboardData", {
      headers: {
        Authorization: "Bearer " + getAuthToken(),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = response.data.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403 || error.response?.status === 401) {
        localStorage.clear();
        return redirect("/login");
      }
      if (error.response?.status === 500) {
        throw json({ message: "Could not Login User." }, { status: 500 });
      }
    }
  }
};
