import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { PrimaryNav } from "./index";

export default {
  title: "components/PrimaryNav",
  component: PrimaryNav,
  argTypes: {
    color: {
      control: "radio",
      options: { Primary: "primary", Secondary: "secondary" },
      defaultValue: "primary",
    },
    href: {
      control: "text",
      defaultValue: "/",
    },
    children: { control: "text", defaultValue: "@jaredLunde" },
  },
} as ComponentMeta<typeof PrimaryNav>;

const Template: ComponentStory<typeof PrimaryNav> = () => <PrimaryNav />;

export const Preview = Template.bind({});
Preview.args = {};
