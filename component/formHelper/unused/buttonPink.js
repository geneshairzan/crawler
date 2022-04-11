import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
const ColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "red",
  background: "linear-gradient(217.09deg, #E949A8 0%, #ED3838 96.97%)",

  "&:hover": {
    background: "linear-gradient(217.09deg, #E949A8 0%, #ED3838 96.97%)",
  },

  "&.Mui-disabled": {
    background: "grey",
  },
}));

export default ColorButton;
