import { TextField, Stack } from "@mui/material";

export default function App({ value }) {
  return (
    <TextField
      placeholder="Search"
      onChange={(e) => value(e.target.value)}
      mb={2}
      sx={{
        "& input": {
          transition: "all 0.5s",
          "&:focus": {
            minWidth: "300px",
          },
        },
      }}
    />
  );
}
