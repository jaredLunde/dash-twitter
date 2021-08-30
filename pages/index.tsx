import type { NextPage } from "next";
import Head from "next/head";
import { IconButton } from "@/components/icon-button";
import { PrimarySidebar } from "@/components/primary-sidebar";
import { column, grid, row } from "@/styles/layout";
import { text } from "@/styles/text";

const Home: NextPage = () => {
  return (
    <div
      className={grid({
        inline: true,
        alignY: "start",
        cols: {
          min: [72, "minmax(240px, 600px)", 0],
          sm: [88, "minmax(240px, 600px)", 1],
          md: [88, "minmax(240px, 600px)", 1],
          lg: [88, "minmax(240px, 600px)", 320],
          xl: [258, "minmax(240px, 600px)", 372],
        },
      })}
      style={{ margin: "0 auto" }}
    >
      <Head>
        <title>Home / Twitter</title>
      </Head>

      <PrimarySidebar />

      <main role="main" className={column({ width: "100%" })}>
        <div
          className={row({
            position: "sticky",
            border: [["none", "none", "hairline"], "accent"],
            width: "100%",
            height: 53,
            align: "center",
            distribute: "between",
            inset: [0, "auto", "auto"],
          })}
        >
          <div className={row({ pad: ["none", "md"] })}>
            <h2 className={text({ variant: "heading" })}>Home</h2>
          </div>
          <div className={row({ pad: ["none", "sm"] })}>
            <IconButton src="/icons/sparkle.svg" size="lg" color="secondary" />
          </div>
        </div>
        <div style={{ height: 4000 }} />
      </main>

      <aside
        className={column({
          width: "100%",
          height: "100%",
          border: [["none", "none", "none", "hairline"], "accent"],
        })}
        style={{ minHeight: "var(--vh)" }}
      >
        <div
          className={column({
            display: { min: "none", md: "flex" },
          })}
        ></div>
      </aside>
    </div>
  );
};

export default Home;
