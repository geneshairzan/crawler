import React from "react";

import Context from "component/provider/context";
// import useAxios from "axios-hooks";
import useSWR from "swr";
import { fetcher } from "app/lib/fetcher";

export default function App(filter) {
  const { setisLoading } = React.useContext(Context);
  const { data, error, mutate } = useSWR("/api/user", fetcher);

  // const [{ data, loading, error }, refetch] = useAxios(
  //   {
  //     url: process.env.REACT_APP_API_BASE_URL + "users",
  //     method: "post",
  //     data: filter,
  //   },
  //   { useCache: false }
  // );

  React.useEffect(() => {
    data && setisLoading(true);
    !data && setisLoading(false);
  }, [data]);

  return {
    user: !data ? [] : data,
    mutate,
  };
}
