import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const ColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "red",
  background:
    "linear-gradient(to right top, #06172b, #004a6c, #008489, #00bd6d, #a8eb12)",

  "&:hover": {
    filter: "brightness(110%)",
  },

  "&.Mui-disabled": {
    background: "grey",
  },
}));

export default ColorButton;
