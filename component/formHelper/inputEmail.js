import React, { useContext, useEffect, useState } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import Context from "component/provider/context";
import { isEmail, min } from "./helper";

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
    isEmail(state.val)
      ? setstate({ ...state, err: null })
      : setstate({ ...state, err: "required valid email address" });
  }, [state.val]);

  useEffect(() => {
    if (!state.err) v({ email: state.val });
  }, [state]);

  return (
    <Stack>
      <TextField
        fullWidth
        label="email"
        name="em"
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
