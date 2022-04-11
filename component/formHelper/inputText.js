import React, { useContext, useEffect, useState } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import Context from "component/provider/context";
import { min } from "./helper";

export default function App({ v, refdata, fname = "unknown", initValue = "" }) {
  const { isLoading } = useContext(Context);
  const [state, setstate] = useState({
    val: refdata && refdata != null ? refdata[fname] : initValue,
    err: true,
    isDiry: false,
  });

  useEffect(() => {
    setstate({ ...state, isDiry: true });
  }, [isLoading]);

  useEffect(() => {
    min(state.val, 1)
      ? setstate({ ...state, err: "min 6 char" })
      : setstate({ ...state, err: false });
  }, [state.val]);

  useEffect(() => {
    if (!state.err) v({ [fname]: state.val });
  }, [state]);

  return (
    <Stack>
      <TextField
        fullWidth
        label={fname}
        value={state.val}
        onChange={(e) => setstate({ ...state, val: e.target.value })}
        error={state.err && state.isDiry}
        className="f-capitalize"
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
