import { Stack } from "@mui/material";

export default function App({ children }) {
  return (
    <Stack className="center" width={"100vw"} height="100vh">
      {children}
    </Stack>
  );
}
