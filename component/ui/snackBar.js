import React from "react";

import Context from "component/provider/context";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function OverlayScreen() {
  const { snack } = React.useContext(Context);

  return (
    <Snackbar
      open={snack.isOpen}
      autoHideDuration={6000}
      onClose={() => setSnack({ ...snack, isOpen: false })}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MuiAlert
        elevation={6}
        severity="info"
        sx={{
          minWidth: "300px",
        }}
      >
        {snack.msg}
      </MuiAlert>
    </Snackbar>
  );
}
