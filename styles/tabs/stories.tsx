import * as Tabs from "@radix-ui/react-tabs";
import React from "react";
import { text } from "@/styles/text";
import { tabs } from "./index";

export default {
  title: "styles/Tabs",
  component: Tabs.Root,
  argTypes: {},
};

const Template = (args: any) => (
  <Tabs.Root defaultValue="1" className={text({ size: "base" })}>
    <Tabs.List className={tabs.tabList({ withBorder: true })}>
      <Tabs.Trigger className={tabs.tab()} value="1">
        <span className={tabs.tabText()}>All</span>
      </Tabs.Trigger>
      <Tabs.Trigger className={tabs.tab()} value="2">
        <span className={tabs.tabText()}>Mentions</span>
      </Tabs.Trigger>
    </Tabs.List>
  </Tabs.Root>
);

export const Preview = Template.bind({});
