import type { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Link, NavLink } from "./index";

export default {
  title: "components/Link",
  component: Link,
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
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />;

export const Preview = Template.bind({});
Preview.args = {};

export const Nav: ComponentStory<typeof NavLink> = (args) => (
  <NavLink {...args} />
);
