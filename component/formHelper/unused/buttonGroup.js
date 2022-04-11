import { Stack, Typography } from "@mui/material";

export default function App(props) {
  return (
    <Stack
      sx={{
        background:
          props.active &&
          "linear-gradient(90.46deg, #46389B 2.01%, rgba(51, 40, 108, 0) 99.56%)",
        height: "56px",
        "&:hover": {
          background:
            "linear-gradient(90.46deg, #46389B 2.01%, rgba(51, 40, 108, 0) 99.56%)",
        },
      }}
      justifyContent={"center"}
    >
      <Typography variant="p" pl={"40px"}>
        {props.children}
      </Typography>
    </Stack>
  );
}
