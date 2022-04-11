import React from "react";
import { Stack, Typography } from "@mui/material";
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
      <InputCrawlerChild v={form.handleInput} refdata={refdata} fname="child" />

      <Stack my={2}>
        <Typography variant="body1" color="primary" mb={2}>
          Expected Tree
        </Typography>
        <Typography variant="body1" color="initial">
          {form.payload.root} :
        </Typography>
        {form.payload.child &&
          form.payload.child.map((d, ix) => (
            <Stack direction={"row"} key={ix}>
              <Typography variant="body1" color="initial" pl={3} width={120}>
                {d.dataname}
              </Typography>
              <Typography variant="body1" color="initial" pl={3} width={20}>
                {d.element}
              </Typography>
              <Typography variant="body1" color="initial" pl={3}>
                {d.type}
              </Typography>
            </Stack>
          ))}
      </Stack>
      <Input.Submit />
    </Stack>
  );
}

const rootele = {
  element: ".media__title",
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
};
