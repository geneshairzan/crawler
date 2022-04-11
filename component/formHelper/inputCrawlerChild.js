import React, { useContext, useEffect, useState } from "react";
import { Stack, TextField, Typography, Button } from "@mui/material";
import Context from "component/provider/context";
import { min } from "./helper";
import InputSelect from "./inputSelect";
import InputText from "./inputText";

export default function App({ v, refdata, fname = "unknown" }) {
  const { isLoading } = useContext(Context);
  const [stack, setstack] = useState([]);
  const [state, setstate] = useState({});

  function handleInput(e) {
    setstate({ ...state, ...e });
  }

  function pushChild() {
    let temp = stack;
    temp.push(state);
    setstack([...temp]);
    setstate({});
  }

  useEffect(() => {
    v({ child: stack });
  }, [stack, state]);

  return (
    <Stack spacing={1}>
      <InputText v={handleInput} fname="dataname" />
      <InputText v={handleInput} fname="element" />
      <InputSelect
        v={handleInput}
        fname="type"
        options={["html", "href", "src"]}
      />
      <Button onClick={pushChild} variant="outlined">
        Add Child
      </Button>
    </Stack>
  );
}
