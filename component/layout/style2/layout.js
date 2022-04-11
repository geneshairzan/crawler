import React from "react";
import MainNav from "./navigation";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import useMediaQuery from "@mui/material/useMediaQuery";

import { IconButton, Stack, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";

import { styled } from "@mui/material/styles";

const drawerWidth = 280;
const drawerWidthClosed = "60px";
const appBarHeigt = 64;

export default function Dashboard({ isFull = true, children }) {
  return (
    <Stack className="center">
      <Stack width={"100%"} maxWidth={1080} px={2}>
        <Typography
          variant="h4"
          color="primary"
          pt={5}
          align="right"
          className="f-uppercase"
        >
          MyCrawler
        </Typography>
        {children}
      </Stack>
    </Stack>
  );
}
