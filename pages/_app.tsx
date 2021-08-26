import { DashProvider, useGlobal } from "@dash-ui/react";
import resetGlobalStyles from "@dash-ui/reset";
import { IdProvider } from "@radix-ui/react-id";
import { useAtom } from "jotai";
import type { AppProps } from "next/app";
import Head from "next/head";
import * as React from "react";
import { styles, themeAtom } from "@/styles";
import { typography } from "@/styles/text";

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

/**
 * Injects global styles for the app
 */
function GlobalStyles() {
  useGlobal(resetGlobalStyles, []);

  useGlobal(
    ({ color, font, transition }) => ({
      "*, ::before, ::after, body": {
        position: "relative",
        margin: 0,
        overflowWrap: "break-word",
      },
      "*:focus": {
        outline: "none",
      },
      "::selection, ::-moz-selection": {
        backgroundColor: color.indigo200,
      },
      html: {
        fontSize: "100%",
        overflowX: "hidden",

        ":focus-within": {
          scrollBehavior: "smooth",
        },
      },
      body: {
        minWidth: "100%",
        minHeight: "100%",
        backgroundColor: color.bodyBg,
        fontFamily: font.family.sans,
      },
      ".loud": {
        transitionProperty: "opacity,visibility",
        transitionDuration: transition.duration.slower,
        transitionTimingFunction: transition.timing.inOut,
      },
      ".writing-mode-enabled .loud": {
        opacity: "0!important",
        visibility: "hidden",
      },
      ".writing-mode-disabled .loud": {
        opacity: 1,
        visibility: "visible",
      },
    }),
    []
  );

  useGlobal(`body {${typography.css("sm")}}`, []);

  return null;
}
