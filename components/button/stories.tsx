import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Button } from "./index";

export default {
  title: "components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "radio",
      options: { Solid: "solid", Outline: "outline" },
      defaultValue: "solid",
    },
    color: {
      control: "radio",
      options: { Primary: "primary", Secondary: "secondary" },
      defaultValue: "primary",
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
    children: { control: "text", defaultValue: "Follow" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Preview = Template.bind({});
Preview.args = {};
