import React from "react";
import { Button, Stack, Modal, Paper, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import { Input } from "component/formHelper/useForm";
import { fcurr } from "component/helper/formating";

export default function App({ ratio, value }) {
  const [open, setopen] = useState(false);
  const [buffer, setbuffer] = useState({});
  const [addonstack, setaddonstack] = useState([]);

  function modalSave() {
    setaddonstack([...addonstack, buffer]);
    setbuffer({});
    setopen(false);
  }

  function handleDelete(ix) {
    let temp = addonstack;
    temp.splice(ix, 1);
    setaddonstack([...temp]);
    console.log(ix);
  }

  React.useEffect(() => {
    console.log(addonstack);
    value(addonstack);
  }, [addonstack]);

  return (
    <Stack>
      {addonstack.map((d, ix) => (
        <AddonRender
          data={d}
          key={ix}
          wRatio={ratio}
          index={ix}
          onDelete={(ix) => handleDelete(ix)}
        />
      ))}
      <Button
        startIcon={<AddCircleOutlineIcon style={{ fontSize: 14 }} />}
        onClick={() => setopen(true)}
        variant="outlined"
        sx={{
          p: 0,
          fontSize: 10,
        }}
      >
        Tambah Addon
      </Button>

      <Modal open={open} onClose={() => setopen(false)}>
        <Stack className="center" height={"100vh"}>
          <Stack p={2} component={Paper} minWidth="300px">
            <Stack
              direction={"row"}
              spacing={2}
              justifyContent="space-between"
              alignItems={"center"}
            >
              <Typography my={2}>Tambah Addon </Typography>
              <Button onClick={() => setopen(false)}>x</Button>
            </Stack>
            <Input.Text
              v={(v) => setbuffer({ ...buffer, ...v })}
              fname="name"
            />
            <Input.Text
              v={(v) => setbuffer({ ...buffer, ...v })}
              fname="desc"
            />
            <Input.Number
              v={(v) => setbuffer({ ...buffer, ...v })}
              fname="unitprice"
            />
            <Input.Text
              v={(v) => setbuffer({ ...buffer, ...v })}
              fname="unit"
            />
            <Button onClick={modalSave} variant="contained" fullWidth>
              Save
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  );
}

function AddonRender({ wRatio, data, index, onDelete }) {
  return (
    <Stack direction={"row"} spacing={2}>
      <Stack width={wRatio[0]}>
        <Stack
          direction={"row"}
          spacing={2}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Typography variant="body2" color="initial">
            {data.name}
          </Typography>
          <Button
            onClick={() => onDelete(index)}
            variant="outlined"
            sx={{
              padding: 0,
              fontSize: "10px",
              "&input": {},
            }}
          >
            Delete
          </Button>
        </Stack>

        <Typography variant="caption" color="initial" pl={2}>
          {data.desc}
        </Typography>
      </Stack>
      <Typography width={wRatio[1]}></Typography>
      <Typography width={wRatio[2]}>{data.unit}</Typography>
      <Stack width={wRatio[1]}></Stack>
      <Typography textAlign="right" width={wRatio[3]}>
        {fcurr.format2(data.unitprice)}
      </Typography>
      <Typography textAlign="right" width={wRatio[4]}>
        {fcurr.format(data.unitprice)}
      </Typography>
    </Stack>
  );
}
