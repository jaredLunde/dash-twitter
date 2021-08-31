import clsx from "clsx";
import type { NextPage } from "next";
import Head from "next/head";
import * as React from "react";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/button";
import { Dashboard } from "@/components/dashboard";
import { IconButton } from "@/components/icon-button";
import { SearchInput } from "@/components/search-input";
import { box, grid, row } from "@/styles/layout";
import { separator } from "@/styles/separator";
import { text } from "@/styles/text";

const Home: NextPage = () => {
  return (
    <Dashboard.Root>
      <Head>
        <title>Home / Twitter</title>
      </Head>

      <Dashboard.Feed
        header={
          <Dashboard.FeedHeader>
            <Dashboard.Heading>Home</Dashboard.Heading>

            <div className={box({ pad: ["none", "sm"] })}>
              <IconButton
                src="/icons/sparkle.svg"
                size="lg"
                color="secondary"
              />
            </div>
          </Dashboard.FeedHeader>
        }
        main={
          <div>
            <div
              className={grid({
                cols: ["max-content", "auto"],
                pad: ["sm", "md", "md"],
                border: [["none", "none", "hairline"], "accent"],
              })}
            >
              <a>
                <Avatar size="md" />
              </a>
              <div>
                <div
                  className={clsx(
                    box({ pad: ["sm", "none", "md", "md"] }),
                    text({
                      size: "xl",
                      color: "textAccentLight",
                      align: "left",
                    })
                  )}
                >
                  What&lsquo;s happening?
                </div>

                <div
                  className={row({ distribute: "between", align: "center" })}
                >
                  <div
                    className={clsx(
                      row({ gap: "sm", pad: "sm" }),
                      text({ color: "primary" })
                    )}
                  >
                    <IconButton
                      src="/icons/image.svg"
                      color="primary"
                      size="lg"
                    />
                    <IconButton
                      src="/icons/bar-chart-2.svg"
                      color="primary"
                      size="lg"
                    />
                    <IconButton
                      src="/icons/smile.svg"
                      color="primary"
                      size="lg"
                    />
                    <IconButton
                      src="/icons/calendar.svg"
                      color="primary"
                      size="lg"
                    />
                  </div>
                  <Button disabled>Tweet</Button>
                </div>
              </div>
            </div>
          </div>
        }
        sidebar={
          <React.Fragment>
            <div
              className={row({
                align: "center",
                width: "100%",
                pad: {
                  min: ["none", "md", "none", "md"],
                  xl: ["none", "md", "none", "lg"],
                },
                height: 53,
                position: "sticky",
                inset: [0, "auto", "auto"],
              })}
            >
              <SearchInput />
            </div>
          </React.Fragment>
        }
      />
    </Dashboard.Root>
  );
};

export default Home;
