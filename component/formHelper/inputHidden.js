import React, { useContext, useEffect, useState } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import Context from "component/provider/context";
import { min } from "./helper";

export default function App({ v, refdata, fname = "unknown" }) {
  const { isLoading } = useContext(Context);
  const [state, setstate] = useState({
    val: refdata && refdata != null ? refdata[fname] : "xxx",
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
    <TextField
      label={fname}
      type="hidden"
      value={state.val}
      onChange={(e) => setstate({ ...state, val: e.target.value })}
      sx={{ display: "none" }}
    />
  );
}
