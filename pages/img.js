import { Box } from "@mui/material";
import test from "test.png";
import Image from "next/image";

export default function App(props) {
  return (
    <Box width={"200px"} minHeight="200px" bgcolor={"red"}>
      dasdsad
      <Image src={test} alt="Picture of the author" />
    </Box>
  );
}
