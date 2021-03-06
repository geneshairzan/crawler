import React from "react";
import { Stack, Typography, Button } from "@mui/material";
import useForm, { Input } from "component/formHelper/useForm";
import BackIcon from "component/ui/backIcon";
import { meta } from "./@meta";
import InputCrawlerChild from "component/formHelper/inputCrawlerChild";

export default function App({ refdata }) {
  const form = useForm(meta.model);

  React.useEffect(() => {
    if (refdata) form.setpayload(refdata);
    else {
      form.setpayload({
        name: "detik test",
        root: ".media__title",
        url: "https://www.detik.com/",
        child: [
          {
            dataname: "title",
            element: "a",
            type: "text",
          },
          {
            dataname: "linkpath",
            element: "a",
            type: "href",
          },
        ],
      });
    }
  }, []);

  return (
    <Stack
      component={"form"}
      width="100%"
      noValidate
      autoComplete="off"
      onSubmit={form.handleSubmit}
    >
      <BackIcon
        title={refdata ? `${meta.model} Edit` : `${meta.model} Create`}
      />
      {refdata && (
        <Input.Hidden v={form.handleInput} refdata={refdata} fname="id" />
      )}
      <Input.Text v={form.handleInput} refdata={refdata} fname="name" />
      <Input.Text
        v={form.handleInput}
        refdata={refdata}
        fname="url"
        initValue="https://www.detik.com/"
      />

      <Typography variant="body1" color="primary" mb={2}>
        Root Element
      </Typography>
      <Input.Text
        v={form.handleInput}
        refdata={refdata}
        fname="root"
        initValue=".media__title"
      />

      <Typography variant="body1" color="primary" mb={2}>
        Child Element
      </Typography>
      <InputCrawlerChild
        v={form.handleInput}
        refdata={refdata}
        fname="child"
        refRoot={form.payload.root}
      />

      <Input.Submit />
    </Stack>
  );
}
