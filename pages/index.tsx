import clsx from "clsx";
import type { NextPage } from "next";
import Head from "next/head";
import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { iconButton, IconButton } from "@/components/icon-button";
import { PrimaryNav } from "@/components/primary-nav";
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
          lg: [88, "minmax(240px, 600px)", 272],
          xl: [264, "minmax(240px, 600px)", 376],
        },
      })}
      style={{ margin: "0 auto" }}
    >
      <Head>
        <title>Home / Twitter</title>
      </Head>
      <div
        className={column({
          width: "100%",
          height: "var(--vh)",
          border: [["none", "hairline", "none", "none"], "accent"],
          position: "sticky",
          inset: [0, "auto", "auto"],
          gap: "md",
          align: { min: "center", xl: "start" },
        })}
      >
        <div>
          <a className={clsx(column({ pad: "md" }), text({ color: "text" }))}>
            <Icon src="/icons/logo.svg" size={[30, 24]} />
          </a>
        </div>
        <PrimaryNav />
      </div>
      <div className={column({ width: "100%" })}>
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
            <span className={text({ variant: "heading" })}>Home</span>
          </div>
          <div className={row({ pad: ["none", "sm"] })}>
            <IconButton src="/icons/sparkle.svg" size="lg" color="secondary" />
          </div>
        </div>
        <div style={{ height: 4000 }} />
      </div>
      <div
        className={column({
          width: "100%",
          height: "var(--vh)",
          border: [["none", "none", "none", "hairline"], "accent"],
          position: "sticky",
          inset: [0, "auto", "auto"],
        })}
      >
        <div
          className={column({
            display: { min: "none", md: "flex" },
          })}
        ></div>
      </div>
    </div>
  );
};

export default Home;
