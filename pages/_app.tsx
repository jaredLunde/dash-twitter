import { DashProvider } from "@dash-ui/react";
import { IdProvider } from "@radix-ui/react-id";
import { useAtom } from "jotai";
import type { AppProps } from "next/app";
import Head from "next/head";
import * as React from "react";
import { styles, themeAtom } from "@/styles";
import { GlobalStyles } from "@/styles/global";

export default App;

function App({ Component, pageProps }: AppProps) {
  const [theme] = useAtom(themeAtom);

  React.useEffect(() => {
    const cls = styles.theme(theme);
    document.body.classList.add(cls);

    return () => {
      document.body.classList.remove(cls);
    };
  }, [theme]);

  return (
    <DashProvider styles={styles}>
      <GlobalStyles />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat"
          rel="stylesheet"
        />
        <body className={styles.theme(theme)} />
      </Head>

      <IdProvider>
        <Component {...pageProps} />
      </IdProvider>
    </DashProvider>
  );
}
