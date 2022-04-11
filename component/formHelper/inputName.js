import React, { useContext, useEffect, useState } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import Context from "component/provider/context";
import { min } from "./helper";

export default function App({ v, refdata, fname = "unknown" }) {
  const { isLoading } = useContext(Context);
  const [state, setstate] = useState({
    val: refdata && refdata != null ? refdata[fname] : "",

    err: true,
    isDiry: false,
  });

  useEffect(() => {
    setstate({ ...state, isDiry: true });
  }, [isLoading]);

  useEffect(() => {
    min(state.val, 6)
      ? setstate({ ...state, err: "min 6 char" })
      : setstate({ ...state, err: false });
  }, [state.val]);

  useEffect(() => {
    if (!state.err) v({ name: state.val });
  }, [state]);

  return (
    <Stack>
      <TextField
        fullWidth
        label="name"
        value={state.val}
        onChange={(e) => setstate({ ...state, val: e.target.value })}
        error={state.err && state.isDiry}
      />
      <Typography
        variant="caption"
        color="error"
        pt={0.2}
        pl={2}
        minHeight={20}
      >
        {state.isDiry ? state.err : ""}
      </Typography>
    </Stack>
  );
}
