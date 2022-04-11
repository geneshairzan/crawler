import React, { useContext, useEffect, useState } from "react";
import {
  Stack,
  TextField,
  Typography,
  MenuItem,
  Button,
  Divider,
  Modal,
  Paper,
  IconButton,
} from "@mui/material";
import { dataFind } from "component/helper/objectParsing";
import { fetcher } from "component/formHelper/useForm";
import { fcurr } from "component/helper/formating";
import { Input } from "component/formHelper/useForm";
import { responseFilter } from "component/helper/objectRemove";
import InputAddon from "./partial/inputAddon";

const wRatio = ["45%", "5%", "10%", "20%", "20%"];

export default function App({ v, refdata, fname = "unknown" }) {
  const [options, setoptions] = useState();

  const [productstack, setproductstack] = useState([]);

  const [state, setstate] = useState({
    val: refdata && refdata != null ? dataFind(refdata, fname) : [],
    err: false,
    isDiry: false,
  });

  function addStack() {
    let temp = options.find((d) => d.id == state.val);
    temp.productId = temp.id;
    setproductstack([...productstack, temp]);
  }

  function stackChange(index, data) {
    let temp = productstack;
    temp[index] = data;
    setproductstack([...temp]);
  }

  useEffect(async () => {
    let res = await fetcher({
      url: `/api/product`,
      method: "get",
    });
    setoptions(res);
  }, []);

  useEffect(() => {
    if (!state.err) v({ detail: productstack });
  }, [productstack]);

  return (
    <Stack>
      <Stack spacing={2}>
        <RenderHeader />
        <Divider />
        {productstack.map((d, ix) => (
          <ProductRender
            data={d}
            key={ix}
            index={ix}
            handleChange={stackChange}
          />
        ))}

        <Divider />
      </Stack>
      <Stack direction={"row"} spacing={2} my={2}>
        {options && (
          <TextField
            fullWidth
            select
            label={"product"}
            value={state.val}
            onChange={(e) => setstate({ ...state, val: e.target.value })}
            error={state.err && state.isDiry}
          >
            {options.map((d) => (
              <MenuItem key={d.id} value={d.id}>
                {d.id} {d.name}
              </MenuItem>
            ))}
          </TextField>
        )}
        <Button variant="contained" onClick={addStack} sx={{ minWidth: 200 }}>
          Add New
        </Button>
      </Stack>
    </Stack>
  );
}

function ProductRender({ index, data, handleChange }) {
  const [inputPrice, setinputPrice] = useState(data.unitprice);
  const [qty, setqty] = useState(data.qty || 1);
  const [dim, setdim] = useState({
    panjang: data.panjang,
    lebar: data.lebar,
    tinggi: data.tinggi,
  });
  const [vol, setvol] = useState(
    ((data.panjang * data.tinggi) / 10000).toFixed(1)
  );
  const [open, setopen] = useState(false);
  const [addon, setaddon] = useState([]);

  useEffect(() => {
    handleChange(index, {
      ...data,
      unitprice: parseInt(inputPrice),
      qty: parseInt(qty),
      ...dim,
      addon: addon,
    });
  }, [qty, vol, addon, inputPrice]);

  function modalSave() {
    setvol(((dim.panjang * dim.tinggi) / 10000).toFixed(1));
    setopen(false);
  }

  function getTotal() {
    let totalAO = addon.reduce((a, b) => a + parseInt(b.unitprice), 0);
    return fcurr.format(vol * qty * inputPrice + totalAO);
  }

  return (
    <Stack>
      <Stack direction={"row"} spacing={2}>
        <Stack width={wRatio[0]}>
          <RenderProductDetail data={data} changeDim={() => setopen(true)} />
        </Stack>
        <Typography width={wRatio[1]}>{vol}</Typography>
        <Typography width={wRatio[2]}>{data.unit}</Typography>
        <Stack width={wRatio[1]}>
          <TextField
            value={qty}
            type="number"
            onChange={(e) => setqty(e.target.value)}
            sx={{
              "& input": {
                padding: "2px 8px",
              },
            }}
          />
        </Stack>
        <Stack textAlign="right" width={wRatio[3]}>
          <Input.Currency
            intiValue={inputPrice}
            fname="up"
            label="unit price"
            v={(e) => setinputPrice(e.up)}
            compact
          />
          {/* {fcurr.format2(data.unitprice)} */}
        </Stack>
        <Typography textAlign="right" width={wRatio[4]}>
          {getTotal()}
        </Typography>
        <Modal open={open} onClose={() => setopen(false)}>
          <Stack className="center" height={"100vh"}>
            <Stack p={2} component={Paper}>
              <Stack
                direction={"row"}
                spacing={2}
                justifyContent="space-between"
                alignItems={"center"}
              >
                <Typography my={2}>Ubah Dimensi</Typography>
                <Button onClick={() => setopen(false)}>x</Button>
              </Stack>

              <Stack direction={"row"} spacing={2} width="100%">
                <Input.Number
                  initValue={dim.panjang}
                  v={(v) => setdim({ ...dim, ...v })}
                  fname="panjang"
                />
                <Input.Number
                  initValue={dim.lebar}
                  v={(v) => setdim({ ...dim, ...v })}
                  fname="lebar"
                />
                <Input.Number
                  initValue={dim.tinggi}
                  v={(v) => setdim({ ...dim, ...v })}
                  fname="tinggi"
                />
              </Stack>
              <Button onClick={modalSave} variant="contained" fullWidth>
                Save
              </Button>
            </Stack>
          </Stack>
        </Modal>
      </Stack>
      <InputAddon ratio={wRatio} value={(v) => setaddon(v)} />
      <Stack my={2}>
        <Divider />
      </Stack>
    </Stack>
  );
}

function RenderProductDetail({ data, changeDim }) {
  return (
    <Stack>
      <Typography variant="body1" color="initial" fontWeight={"bold"}>
        {data.name}
      </Typography>

      <Stack
        direction={"row"}
        spacing={2}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Typography variant="body2" color="initial">
          Spesifikasi
        </Typography>
        <Button
          onClick={() => changeDim(true)}
          variant="outlined"
          sx={{
            padding: 0,
            fontSize: "10px",
            "&input": {},
          }}
        >
          Edit
        </Button>
      </Stack>

      <Typography variant="caption" color="initial" pl={2}>
        [PLT] {`${data.panjang} x ${data.lebar} x ${data.tinggi} cm`}
      </Typography>

      <Typography variant="caption" color="initial" pl={2}>
        Material {data.material}
      </Typography>

      <Typography variant="caption" color="initial" pl={2}>
        Finishing {data.fisning}
      </Typography>
    </Stack>
  );
}

function RenderHeader() {
  return (
    <Stack direction={"row"} spacing={2}>
      <Typography fontWeight={"bold"} width={wRatio[0]}>
        Name
      </Typography>
      <Typography fontWeight={"bold"} width={wRatio[1]}>
        Volume
      </Typography>

      <Typography fontWeight={"bold"} width={wRatio[2]}>
        Unit
      </Typography>

      <Typography fontWeight={"bold"} width={wRatio[1]}>
        Qty
      </Typography>
      <Typography fontWeight={"bold"} textAlign="right" width={wRatio[3]}>
        Unit Price
      </Typography>
      <Typography fontWeight={"bold"} textAlign="right" width={wRatio[4]}>
        Total
      </Typography>
    </Stack>
  );
}
