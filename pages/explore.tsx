import * as Tabs from "@radix-ui/react-tabs";
import type { NextPage } from "next";
import Head from "next/head";
import * as React from "react";
import { Dashboard } from "@/components/dashboard";
import { IconButton } from "@/components/icon-button";
import { SearchInput } from "@/components/search-input";
import { WhatsHappening } from "@/components/whats-happening";
import { column, grid } from "@/styles/layout";
import { tabs } from "@/styles/tabs";
import { text } from "@/styles/text";

const Explore: NextPage = () => {
  return (
    <Dashboard.Root>
      <Head>
        <title>Explore / Twitter</title>
      </Head>

      <Dashboard.Feed
        header={
          <Dashboard.FeedHeader height={108}>
            <div
              className={column({
                distribute: "between",
                height: "100%",
                width: "100%",
              })}
            >
              <div
                className={grid({
                  cols: ["1fr", "max-content"],
                  gap: "xl",
                  pad: ["xs", "md", "none"],
                  alignY: "center",
                })}
              >
                <SearchInput />
                <IconButton src="/icons/settings.svg" size="lg" />
              </div>

              <Tabs.Root defaultValue="1" className={text({ size: "sm" })}>
                <Tabs.List className={tabs.tabList()}>
                  <Tabs.Trigger className={tabs.tab()} value="1">
                    <span className={tabs.tabText()}>For you</span>
                  </Tabs.Trigger>
                  <Tabs.Trigger className={tabs.tab()} value="2">
                    <span className={tabs.tabText()}>Trending</span>
                  </Tabs.Trigger>
                  <Tabs.Trigger className={tabs.tab()} value="3">
                    <span className={tabs.tabText()}>COVID-19</span>
                  </Tabs.Trigger>
                  <Tabs.Trigger className={tabs.tab()} value="4">
                    <span className={tabs.tabText()}>News</span>
                  </Tabs.Trigger>
                  <Tabs.Trigger className={tabs.tab()} value="5">
                    <span className={tabs.tabText()}>Sports</span>
                  </Tabs.Trigger>
                  <Tabs.Trigger className={tabs.tab()} value="6">
                    <span className={tabs.tabText()}>Entertainment</span>
                  </Tabs.Trigger>
                </Tabs.List>
              </Tabs.Root>
            </div>
          </Dashboard.FeedHeader>
        }
        main={<div />}
        sidebar={<Sidebar />}
      />
    </Dashboard.Root>
  );
};

function Sidebar() {
  return (
    <Dashboard.FeedSidebar>
      <div
        className={column({
          width: "100%",
          gap: "lg",
          pad: {
            min: "md",
            xl: ["md", "md", "md", "lg"],
          },
        })}
      >
        <WhatsHappening />
        <WhatsHappening />
        <WhatsHappening />
      </div>
    </Dashboard.FeedSidebar>
  );
}

export default Explore;
