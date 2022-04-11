import { Button, Stack } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Stack className="center" minHeight={"100vh"}>
      <Link href="/crawler">
        <Button variant="outlined">Start Crawling</Button>
      </Link>
    </Stack>
  );
}
