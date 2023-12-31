import React, { useRef, useState } from "react";
import {
  Avatar,
  Box,
  ButtonBase,
  List,
  Menu,
  MenuItem,
  Paper,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme/theme";
import {
  CalendarMonthOutlined,
  DirectionsRunOutlined,
  Person,
  QueryStatsOutlined,
  TuneOutlined,
  UploadFileOutlined,
} from "@mui/icons-material";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import DropdownListItem from "../DropdownListItem";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const refPicker = useRef<HTMLDivElement>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null); // Specify the type for anchorEl
  const handleModleOpen = () => {
    setOpenModal(true);
    setAnchorEl(refPicker.current);
  };
  const handleModleClose = () => {
    setOpenModal(false);
    setAnchorEl(null);
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
    setOpenModal(false);
    setAnchorEl(null);
  };
  const userName = localStorage.getItem("name")?.toUpperCase();
  return (
    <Box
      sx={{
        backgroundColor: colors.whiteGradient[100],
        width: "220px",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: colors.whiteGradient[100],
          width: "220px",
          maxHeight: "87vh",
          position: "fixed",
          overflowY: "auto",
        }}
      >
        <Box
          display="flex"
          p="10px"
          mb="20px"
          mt="10px"
          justifyContent="center"
          alignItems="center"
        >
          <Link
            to={"/admin"}
            style={{
              textDecoration: "none",
              color: `${colors.primary[100]}`,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              Athlete Stats
            </Typography>
          </Link>
        </Box>
        <List>
          <DropdownListItem
            text="Advance Search"
            Icon={QueryStatsOutlined}
            link="/"
          />
          <DropdownListItem
            text="Athletes"
            Icon={DirectionsRunOutlined}
            link="athletes"
          />
          <DropdownListItem
            text="Events"
            Icon={CalendarMonthOutlined}
            link="events"
          />
          <DropdownListItem
            text="Managment Center"
            Icon={TuneOutlined}
            options={[
              { text: "Gender", link: "managment/gender" },
              { text: "Time Range", link: "managment/timerange" },
              { text: "Results", link: "managment/results" },
              { text: "Event Tasks", link: "managment/tasks" },
              { text: "Competition", link: "managment/competition" },
            ]}
          />
          <DropdownListItem
            text="Upload CSV"
            Icon={UploadFileOutlined}
            link="upload"
          />
        </List>
      </Box>

      <Box display={"flex"} justifyContent={"center"}>
        <Paper
          id="basic-button"
          ref={refPicker}
          onClick={handleModleOpen}
          sx={{
            position: "fixed",
            bottom: 20,
            width: "180px",
            height: "55px",
            textAlign: "center",
            background: theme.palette.primary.main,
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          <UserBox>
            <Avatar>
              <Person />
            </Avatar>
            <Typography>{userName}</Typography>
            <LogoutTwoToneIcon />
          </UserBox>
        </Paper>
        {anchorEl && (
          <Menu
            id="basic-menu"
            open={openModal}
            anchorEl={anchorEl}
            onClose={handleModleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <MenuItem
              sx={{
                width: "175px",
                display: "flex",
                justifyContent: "center",
              }}
              onClick={logoutHandler}
            >
              Logout
            </MenuItem>
          </Menu>
        )}
      </Box>
    </Box>
  );
};
const UserBox = styled(ButtonBase)({
  display: "flex",
  flexDirection: "row",
  alignItems: "space-between",
  alignContent: "",
  padding: "8px 33px 14px 10px ",
  gap: "20px",
  color: "#FFFFFF",
});

export default Sidebar;
