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
        <Head />
        <body className={styles.theme("light")}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
