import React, { useContext, useEffect, useState } from "react";
import { Stack, TextField, Typography, Button, MenuItem } from "@mui/material";
import Context from "component/provider/context";
import { min } from "./helper";
import InputSelect from "./inputSelect";
import InputText from "./inputText";

export default function App({ v, refdata, fname = "unknown", refRoot }) {
  const { isLoading } = useContext(Context);
  const [state, setstate] = useState({});
  const [stack, setstack] = useState([]);

  const options = ["html", "href", "src"];

  function handleInput(e) {
    setstate({ ...state, [e.target.name]: e.target.value });
  }

  function pushChild() {
    let temp = stack;
    temp.push(state);
    setstack([...temp]);
    setstate({});
  }

  function handleDelete(index) {
    console.log(state);
    let temp = stack;
    temp.splice(index, 1);
    setstack(temp);
  }

  useEffect(() => {
    v({ child: stack });
  }, [stack, state]);

  return (
    <Stack spacing={1}>
      <TextField
        value={state.dataname}
        label="dataname"
        name="dataname"
        onChange={handleInput}
      />
      <TextField
        value={state.element}
        label="element"
        name="element"
        onChange={handleInput}
      />

      <TextField
        fullWidth
        select
        name="type"
        label={"type"}
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

      {/* 
      <InputSelect
        v={handleInput}
        fname="type"
        options={["html", "href", "src"]}
      /> */}
      <Button onClick={pushChild} variant="outlined">
        Add Child
      </Button>

      <Stack my={2}>
        <Stack my={2}>
          <Typography variant="body1" color="primary" mb={2}>
            Expected Tree
          </Typography>
          <Typography variant="body1" color="initial">
            {refRoot} :
          </Typography>
        </Stack>
        {stack.map((d, ix) => (
          <Stack direction={"row"} key={ix}>
            <Button onClick={() => handleDelete(ix)}>x</Button>
            <Typography variant="body1" color="initial" pl={3} width={120}>
              {d.dataname}
            </Typography>
            <Typography variant="body1" color="initial" pl={3} width={120}>
              {d.element}
            </Typography>
            <Typography variant="body1" color="initial" pl={3}>
              {d.type}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

function App({ v, refdata, fname = "unknown" }) {
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
    console.log(stack);
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
