import React from "react";
import Context from "component/provider/context";
import axios from "axios";

export default function useUser() {
  const { auth, setAuth, setisLoading } = React.useContext(Context);

  function signIn(payload) {
    setisLoading(true);
    axios
      .post("api/auth/signin", payload)
      .then((res) => {
        setisLoading(false);
        if (res.status === 200) {
          setAuth(res.data);
          localStorage.setItem("auth", JSON.stringify(res.data));
          localStorage.setItem("authToken", res.data.token.token);
        }
      })
      .catch((error) => {
        setisLoading(false);
      });
  }

  function signOut(payload) {
    localStorage.clear();
    setAuth();
    Router.push("/login");
  }

  return {
    auth,
    setAuth,
    signIn,
  };
}
