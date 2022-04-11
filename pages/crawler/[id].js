import React, { useState } from "react";
import { useRouter } from "next/router";
import Form from "./form";
import { fetcher } from "component/formHelper/useForm";
import { meta } from "./@meta";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import BackIcon from "component/ui/backIcon";

export default function App(props) {
  const id = useRouter().query.id;
  const [data, setdata] = useState();

  React.useEffect(() => {
    if (id) loader();
  }, [id]);

  async function loader() {
    setdata(
      await fetcher({
        method: "get",
        url: `/api/${meta.model}?id=` + id,
      })
    );
  }
  if (!data) return "";
  console.log(data);
  const header = data.result.length
    ? Object.entries(JSON.parse(data.result[0].result)).map(
        ([key, value]) => key
      )
    : null;

  return (
    <Stack>
      <BackIcon title={"Details"} />

      {!header && "data error"}
      {header && <Header header={header} data={data} />}
      <Stack>
        {data.result &&
          data.result.map((d) => (
            <Stack key={d.id} direction="row">
              {header.map((h, ix) => (
                <Stack key={ix} width="20%">
                  {JSON.parse(d.result)[h]}
                </Stack>
              ))}
            </Stack>
          ))}
      </Stack>
    </Stack>
  );
}

function Header({ data, header }) {
  return (
    <Stack>
      <Stack my={2}>
        <Typography variant="caption" color="primary">
          Name
        </Typography>
        <Typography variant="body1" color="" mb={2}>
          {data.root}
        </Typography>
        <Typography variant="caption" color="primary">
          URL
        </Typography>
        <Typography variant="body1" color="" mb={2}>
          {data.url}
        </Typography>

        <Typography variant="caption" color="primary">
          Expected Tree
        </Typography>
        <Typography variant="body1" color="">
          {data.root}
        </Typography>

        {JSON.parse(data.child).create.map((d, ix) => (
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
      <Stack direction={"row"} mt={2}>
        {header.map((d, ix) => (
          <Stack key={ix} width="20%">
            <Typography
              variant="subtitle1"
              color="primary"
              className="f-uppercase"
              fontWeight={"bold"}
            >
              {d}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
