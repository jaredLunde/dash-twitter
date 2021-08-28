import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import ico from "@/public/icons/sparkle.svg";
import { IconButton } from "./index";

export default {
  title: "components/IconButton",
  component: IconButton,
  argTypes: {
    variant: {
      control: "radio",
      options: { Solid: "solid" },
      defaultValue: "solid",
    },
    color: {
      control: "radio",
      options: { Primary: "primary", Secondary: "secondary" },
      defaultValue: "secondary",
    },
    size: {
      control: "radio",
      options: { Small: "sm", Medium: "md", Large: "lg" },
      defaultValue: "sm",
    },
    fetching: {
      control: "boolean",
      defaultValue: false,
    },
    disabled: {
      control: "boolean",
      defaultValue: false,
    },
    src: { control: "text", defaultValue: ico },
  },
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} />
);

export const Preview = Template.bind({});
Preview.args = {};
