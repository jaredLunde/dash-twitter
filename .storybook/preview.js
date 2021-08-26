import * as React from "react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { DashProvider } from "@dash-ui/react";
import { addDecorator } from "@storybook/react";
import { configureActions } from "@storybook/addon-actions";
import { styles } from "../styles";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  /**
   * @see https://storybook.js.org/addons/storybook-addon-themes
   */
  themes: {
    default: "Light",
    list: [
      { name: "Light", class: styles.theme("light"), color: "#fff" },
      { name: "Dark", class: styles.theme("dark"), color: "#000" },
    ],
  },
  /**
   * @see https://storybook.js.org/addons/storybook-addon-next-router
   */
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

addDecorator((storyFn) => (
  <DashProvider styles={styles}>{storyFn()}</DashProvider>
));

configureActions({
  depth: 3,
  limit: 20,
});
