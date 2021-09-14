import type { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Avatar } from "./index";

export default {
  title: "components/Avatar",
  component: Avatar,
  argTypes: {
    src: {
      control: "text",
      defaultValue:
        "https://pbs.twimg.com/profile_images/1318335215627083781/aJz0jr-d_400x400.jpg",
    },
    defaultSrc: {
      control: "text",
      defaultValue: "/default-avatar.png",
    },
    size: {
      control: "radio",
      options: {
        XSmall: "xs",
        Small: "sm",
        Medium: "md",
        Large: "lg",
        XLarge: "xl",
        "2XLarge": "2xl",
      },
      defaultValue: "sm",
    },
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Preview = Template.bind({});
Preview.args = {};
