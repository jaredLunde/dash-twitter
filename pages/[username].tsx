import type { NextPage } from "next";
import Head from "next/head";
import * as React from "react";
import { Dashboard } from "@/components/dashboard";
import { IconButton } from "@/components/icon-button";
import { SearchInput } from "@/components/search-input";
import { box, row } from "@/styles/layout";

const Profile: NextPage = () => {
  return (
    <Dashboard.Root>
      <Head>
        <title>Profile / Twitter</title>
      </Head>

      <Dashboard.Feed
        header={
          <Dashboard.FeedHeader>
            <Dashboard.Heading>Profile</Dashboard.Heading>

            <div className={box({ pad: ["none", "sm"] })}>
              <IconButton
                src="/icons/sparkle.svg"
                size="lg"
                color="secondary"
              />
            </div>
          </Dashboard.FeedHeader>
        }
        main="hello"
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

export default Profile;
