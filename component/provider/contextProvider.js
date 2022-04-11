import "./axios.js";
import React, { useState } from "react";
import Context from "./context";

export default function App({ children }) {
  const [pageloaded, setpageloaded] = useState(false);

  const [snack, setSnack] = useState({
    isOpen: false,
    isError: false,
    msg: "",
  });
  const [auth, setAuth] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [theme, settheme] = useState("light");

  React.useEffect(() => {
    setAuth(
      JSON.parse(localStorage.getItem("auth")) || null,
      setpageloaded(true)
    );
  }, []);

  if (!pageloaded) return "loading";

  return (
    <Context.Provider
      value={{
        auth,
        setAuth,
        isLoading,
        setisLoading,
        snack,
        setSnack,
        theme,
        settheme,
      }}
    >
      {children}
    </Context.Provider>
  );
}
