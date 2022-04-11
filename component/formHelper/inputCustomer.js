import React, { useContext, useEffect, useState } from "react";
import { Stack, TextField, Typography, MenuItem } from "@mui/material";
import { dataFind } from "component/helper/objectParsing";
import { fetcher } from "component/formHelper/useForm";

export default function App({ v, refdata, fname = "unknown" }) {
  const [options, setoptions] = useState();

  const [state, setstate] = useState({
    val: refdata && refdata != null ? dataFind(refdata, fname) : "",
    err: false,
    isDiry: false,
  });

  useEffect(async () => {
    let res = await fetcher({
      url: `/api/customer`,
      method: "get",
    });
    setoptions(res);
  }, []);

  useEffect(() => {
    if (!state.err) v({ [fname]: state.val });
  }, [state]);

  return (
    <Stack>
      {options && (
        <TextField
          fullWidth
          select
          label={"Customer"}
          value={state.val}
          onChange={(e) => setstate({ ...state, val: e.target.value })}
          error={state.err && state.isDiry}
        >
          {options.map((d) => (
            <MenuItem key={d.id} value={d.id}>
              {d.name}
            </MenuItem>
          ))}
        </TextField>
      )}

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
