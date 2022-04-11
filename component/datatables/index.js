import React, { useState } from "react";
import { Stack, Button } from "@mui/material";
import { CircularProgress, Typography } from "@mui/material";
import Search from "./search";
import Action from "./action";
import Link from "next/link";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function App({ data, col, model, isRefetch }) {
  const [sf, setsf] = React.useState("");
  const [order, setorder] = useState({
    col: col[0].name,
    isAsc: true,
  });

  function handleOrderChange(v) {
    if (v == order.col) {
      setorder((p) => ({
        col: v,
        isAsc: !p.isAsc,
      }));
    } else
      setorder({
        col: v,
        isAsc: true,
      });
  }

  if (!data || !col)
    return (
      <Stack width={"100%"} className="center">
        <CircularProgress />
      </Stack>
    );

  return (
    <Stack width={"100%"}>
      <Stack direction={"row"} justifyContent="space-between">
        <Link href={`${model}/create`}>
          <Button startIcon={<AddCircleOutlineIcon />}>Add New {model}</Button>
        </Link>
        <Search value={(v) => setsf(v)} />
      </Stack>
      <Typography variant="h2" color="primary" className="f-capitalize">
        {model} List
      </Typography>
      <RenderCol col={col} order={order} onOrderChange={handleOrderChange} />
      <RenderData
        data={data}
        col={col}
        sf={sf}
        order={order}
        model={model}
        isRefetch={isRefetch}
      />
    </Stack>
  );
}

function RenderData({ data, col, sf, order, model, isRefetch }) {
  function dataFind(d, dt) {
    if (dt.includes(".")) {
      dt.split(".").forEach((e) => {
        d[e] ? (d = d[e]) : (d = "");
      });
      return d;
    } else return d[dt];
  }

  function resFilter(e) {
    return Object.keys(e).some(
      (k) => typeof e[k] === "string" && e[k].includes(sf)
    );
  }

  function forder(a, b) {
    if (dataFind(a, order.col) < dataFind(b, order.col)) {
      return order.isAsc ? -1 : 1;
    }
    if (dataFind(a, order.col) > dataFind(b, order.col)) {
      return order.isAsc ? 1 : -1;
    }
    return 0;
  }

  if (!data.length) return "";

  return data
    .filter(resFilter)
    .sort(forder)
    .map((d, i) => (
      <Stack key={i} py={0.2}>
        <Stack direction={"row"} spacing={2}>
          {col.map((dt, ii) => (
            <Stack width={dt.w ? dt.w : "10%"} key={ii} px={1}>
              <Typography variant="body1" textAlign={"left"}>
                {dataFind(d, dt.name)}
              </Typography>
            </Stack>
          ))}
          <Stack width="5%">
            <Action id={d.id} model={model} isRefetch={isRefetch} />
          </Stack>
        </Stack>
      </Stack>
    ));
}

function RenderCol({ col, order, onOrderChange }) {
  function renderIcon(d) {
    if (d.name == order.col) {
      return order.isAsc ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />;
    }
    return "";
  }
  return (
    <Stack
      direction={"row"}
      spacing={2}
      borderBottom={`1px solid `}
      borderTop={`1px solid `}
      borderColor="accgrey.c"
      my={2}
    >
      {col.map((d, i) => (
        <Stack width={d.w ? d.w : "10%"} key={i} py={1}>
          <Button
            sx={{
              justifyContent: "flex-start",
            }}
            endIcon={renderIcon(d)}
            onClick={() => onOrderChange(d.name)}
            color="primary"
          >
            <Typography
              variant="body1"
              fontWeight={"bold"}
              className="f-capitalize"
              // color="initial"
            >
              {d.label ? d.label : d.name}
            </Typography>
          </Button>
        </Stack>
      ))}

      <Stack py={1} width="5%">
        <Button
          sx={{
            justifyContent: "flex-start",
          }}
          color="primary"
        >
          <Typography
            variant="body1"
            fontWeight={"bold"}
            className="f-capitalize"
          >
            Action
          </Typography>
        </Button>
      </Stack>
    </Stack>
  );
}
