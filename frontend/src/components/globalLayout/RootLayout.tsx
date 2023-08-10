import React from "react";
import { Container, styled, Stack } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const CustomContainer = styled(Container)({
    padding: 0,
  });

  return (
    <CustomContainer maxWidth="xl" disableGutters={true}>
      <main className="content">
        <Stack direction="row" alignItems="stretch">
          <div>
            <Sidebar />
          </div>
          <Stack direction="column" flexGrow={1}>
            <div>
              <Topbar />
            </div>
            <div style={{ flexGrow: 1, overflowY: "auto" }}>
              <Outlet />
            </div>
          </Stack>
        </Stack>
      </main>
    </CustomContainer>
  );
};

export default RootLayout;
