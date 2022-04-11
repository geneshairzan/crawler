import React from "react";
import { Box, Modal, CircularProgress } from "@mui/material";
import Context from "component/provider/context";

export default function OverlayScreen() {
  const { isLoading } = React.useContext(Context);

  return (
    <Modal open={isLoading}>
      <Box
        width="100vw"
        height="100vh"
        display={"flex"}
        zIndex="tooltip"
        alignItems={"center"}
        justifyContent={"center"}
      >
        <CircularProgress color="inherit" />
      </Box>
    </Modal>
  );
}

export function Loader() {
  return (
    <Box
      width="100%"
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <CircularProgress color="inherit" />
    </Box>
  );
}
