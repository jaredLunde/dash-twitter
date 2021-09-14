import * as Tabs from "@radix-ui/react-tabs";
import React from "react";
import { text } from "@/styles/text";
import { tabs } from "./index";

export default {
  title: "styles/Tabs",
  component: Tabs.Root,
  argTypes: {},
};

const Template = () => (
  <Tabs.Root defaultValue="1" className={text({ size: "sm" })}>
    <Tabs.List className={tabs.tabList({ withBorder: true })}>
      <Tabs.Trigger className={tabs.tab()} value="1">
        <span className={tabs.tabText()}>Tweets</span>
      </Tabs.Trigger>
      <Tabs.Trigger className={tabs.tab()} value="2">
        <span className={tabs.tabText()}>Tweets &amp; replies</span>
      </Tabs.Trigger>
      <Tabs.Trigger className={tabs.tab()} value="3">
        <span className={tabs.tabText()}>Media</span>
      </Tabs.Trigger>
      <Tabs.Trigger className={tabs.tab()} value="4">
        <span className={tabs.tabText()}>Likes</span>
      </Tabs.Trigger>
    </Tabs.List>
  </Tabs.Root>
);

export const Preview = Template.bind({});
