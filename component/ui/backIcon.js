import { useRouter } from "next/router";
import Link from "next/link";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Stack, Typography, Button } from "@mui/material";

export default function App({ title }) {
  const r = useRouter();
  return (
    <Stack mb={2}>
      <Stack direction={"row"} justifyContent="space-between">
        <Button startIcon={<ArrowBackIcon />} onClick={() => r.back()}>
          back
        </Button>
      </Stack>
      <Typography variant="h2" color="primary" className="f-capitalize">
        {title}
      </Typography>
    </Stack>
  );
}
