import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function AlertDialog(props) {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(props.default || false);

  React.useEffect(() => {
    if (isSmall) setOpen(true);
  }, [isSmall]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  function handleOk() {
    setOpen(false, props.onYes(true));
  }

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.msgTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.msg}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOk} autoFocus>
          Saya Mengerti
        </Button>
      </DialogActions>
    </Dialog>
  );
}
