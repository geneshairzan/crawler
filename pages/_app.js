import "styles/app.css";
import ContextProvider from "component/provider/contextProvider";
import UiProvider from "component/provider/uiProvider";

//https://nextjs.org/docs/api-reference/next.config.js/introduction

function MyApp({ Component, pageProps, router }) {
  return (
    <ContextProvider>
      <UiProvider router={router}>
        <Component {...pageProps} />
      </UiProvider>
    </ContextProvider>
  );
}

export default MyApp;
