import * as React from "react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { useRouter } from "next-router-mock";
import { DashProvider, useGlobal } from "@dash-ui/react";
import { addDecorator } from "@storybook/react";
import { configureActions } from "@storybook/addon-actions";
import * as NextImage from "next/image";
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
};

// Improve action performance by setting max depth
configureActions({
  depth: 3,
  limit: 20,
});

// Add Dash and global styles to all stories
addDecorator((storyFn) => (
  <DashProvider styles={styles}>
    <GlobalStyles />
    {storyFn()}
  </DashProvider>
));

/**
 * Next.js mocks
 */
function MemoryRouter({ children }) {
  return (
    <RouterContext.Provider value={useRouter()}>
      {children}
    </RouterContext.Provider>
  );
}

addDecorator((Story) => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
));

const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});
