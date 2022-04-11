import React from "react";

import Layout from "component/layout/style2/layout";
import useAuth from "component/model/useAuth";
import Router from "next/router";
import Loader from "component/ui/loaderFs";
import SnakBar from "component/ui/snackBar";
import ThemeProvider from "./themeProvider";

export default function App({ children, router }) {
  const isLogin = router.route.includes("/login");
  const { auth } = useAuth();

  // React.useEffect(() => {
  //   if (!isLogin && !auth) Router.push("/login");
  // });

  if (!isLogin && !auth) return "";
  return (
    <ThemeProvider>
      <Layout>
        {children}
        <Loader />
        <SnakBar />
      </Layout>
    </ThemeProvider>
  );
}
