import { Style } from "@dash-ui/react/server";
import Document, { Head, Html, Main, NextScript } from "next/document";
import type { DocumentContext } from "next/document";
import * as React from "react";
import { styles } from "@/styles";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return Object.assign(initialProps, {
      styles: <Style html={initialProps.html} styles={styles} />,
    });
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@100;200;300;400;500;600;700;800;900&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body className={styles.theme("light")}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
