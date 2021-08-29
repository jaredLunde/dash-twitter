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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
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
