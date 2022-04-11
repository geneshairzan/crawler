import React, { useState } from "react";

import Context from "component/provider/context";
import useAxios from "axios-hooks";

export default function App(filter) {
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: "/api/user",
      method: "post",
      data: filter,
    },
    { useCache: false }
  );

  React.useEffect(() => {
    // data ? setisLoading(false) : setisLoading(true);
  }, [data]);

  return {
    data,
  };
}
