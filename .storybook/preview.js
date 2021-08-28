import * as React from "react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { DashProvider, useGlobal } from "@dash-ui/react";
import { addDecorator } from "@storybook/react";
import { configureActions } from "@storybook/addon-actions";
import { styles } from "../styles";
import { GlobalStyles } from "../styles/global";

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
    list: [
      {
        name: "Light",
        class: styles.theme("light"),
        color: "#fff",
        default: true,
      },
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
  <DashProvider styles={styles}>
    <GlobalStyles />
    {storyFn()}
  </DashProvider>
));

configureActions({
  depth: 3,
  limit: 20,
});
