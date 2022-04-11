import React, { useState } from "react";
import Datatable from "component/datatables";
import { fetcher } from "component/formHelper/useForm";
import { meta } from "./@meta";

export default function AdminPage(params) {
  const [data, setfirst] = useState();

  React.useEffect(() => {
    fetching();
  }, []);

  async function fetching() {
    setfirst(
      await fetcher({
        method: "get",
        url: `/api/${meta.model}`,
      })
    );
  }
  console.log(data);
  return (
    <Datatable
      data={data}
      col={meta.col}
      model={meta.model}
      isRefetch={fetching}
    />
  );
}
