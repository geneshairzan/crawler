import React, { useContext, useEffect, useState } from "react";
import { Stack, TextField, Typography, InputAdornment } from "@mui/material";
import Context from "component/provider/context";
import { min } from "./helper";

export default function App({ v, refdata, fname = "unknown", initValue = 0 }) {
  const { isLoading } = useContext(Context);
  const [state, setstate] = useState({
    val: refdata ? refdata[fname] : initValue,
    err: false,
    isDiry: false,
  });

  useEffect(() => {
    setstate({ ...state, isDiry: true });
  }, [isLoading]);

  useEffect(() => {
    if (!state.err) v({ [fname]: parseInt(state.val) });
  }, [state]);

  return (
    <Stack>
      <TextField
        fullWidth
        label={fname}
        value={state.val}
        type="number"
        onChange={(e) => setstate({ ...state, val: e.target.value })}
        error={state.err && state.isDiry}
        InputProps={{
          endAdornment: <InputAdornment position="end">cm</InputAdornment>,
        }}
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
