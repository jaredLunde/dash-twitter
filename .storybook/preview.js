import * as React from "react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { DashProvider, useGlobal } from "@dash-ui/react";
import resetGlobalStyles from "@dash-ui/reset";
import { addDecorator } from "@storybook/react";
import { configureActions } from "@storybook/addon-actions";
import { styles } from "../styles";
import { typography } from "../styles/text";

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

function GlobalStyles() {
  useGlobal(resetGlobalStyles, []);

  useGlobal(
    ({ color, font, transition }) => ({
      "*, ::before, ::after, body": {
        position: "relative",
        margin: 0,
        overflowWrap: "break-word",
      },
      "*:focus": {
        outline: "none",
      },
      "::selection, ::-moz-selection": {
        backgroundColor: color.indigo200,
      },
      html: {
        fontSize: "100%",
        overflowX: "hidden",

        ":focus-within": {
          scrollBehavior: "smooth",
        },
      },
      body: {
        minWidth: "100%",
        minHeight: "100%",
        backgroundColor: color.bodyBg,
        fontFamily: font.family.sans,
      },
      ".loud": {
        transitionProperty: "opacity,visibility",
        transitionDuration: transition.duration.slower,
        transitionTimingFunction: transition.timing.inOut,
      },
      ".writing-mode-enabled .loud": {
        opacity: "0!important",
        visibility: "hidden",
      },
      ".writing-mode-disabled .loud": {
        opacity: 1,
        visibility: "visible",
      },
    }),
    []
  );

  useGlobal(`body {${typography.css("sm")}}`, []);

  return null;
}
