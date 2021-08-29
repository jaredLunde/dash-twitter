const path = require("path");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  stories: [
    "../components/**/stories.mdx",
    "../components/**/stories.@(js|jsx|ts|tsx)",
    "../styles/**/stories.mdx",
    "../styles/**/stories.@(js|jsx|ts|tsx)",
  ],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "storybook-addon-next-router",
    "storybook-addon-themes",
  ],

  // core: {
  //   builder: "webpack5",
  // },

  reactOptions: {
    fastRefresh: true,
  },

  async webpackFinal(config) {
    config.resolve.plugins = [
      new TsconfigPathsPlugin({ extensions: config.resolve.extensions }),
    ];

    return config;
  },
};
