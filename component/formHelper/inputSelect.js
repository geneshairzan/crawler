import React, { useContext, useEffect, useState } from "react";
import { Stack, TextField, Typography, MenuItem } from "@mui/material";
import Context from "component/provider/context";
import { isEmail, min } from "./helper";
import { dataFind } from "component/helper/objectParsing";

export default function App({ v, refdata, fname = "unknown", options }) {
  const { isLoading } = useContext(Context);
  const [state, setstate] = useState({
    val: refdata && refdata != null ? dataFind(refdata, fname) : "",
    err: false,
    isDiry: false,
  });

  // useEffect(() => {
  //   setstate({ ...state, isDiry: true });
  // }, [isLoading]);

  // useEffect(() => {
  //   isEmail(state.val)
  //     ? setstate({ ...state, err: null })
  //     : setstate({ ...state, err: "required valid email address" });
  // }, [state.val]);

  useEffect(() => {
    if (!state.err) v({ [fname]: state.val });
  }, [state]);

  return (
    <Stack>
      <TextField
        fullWidth
        select
        label={fname}
        value={state.val}
        onChange={(e) => setstate({ ...state, val: e.target.value })}
        error={state.err && state.isDiry}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

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
