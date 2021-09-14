import * as React from "react";
import { render as rtlRender } from "@testing-library/react";
import { DashProvider } from "@dash-ui/react";
import { styles } from "@/styles";

export function render(
  ui: Parameters<typeof rtlRender>[0],
  options: Parameters<typeof rtlRender>[1] = {}
) {
  return rtlRender(ui, {
    ...options,
    wrapper: ({ children }) => (
      <DashProvider styles={styles}>{children}</DashProvider>
    ),
  });
}

// TODO: https://github.com/toomuchdesign/next-page-tester#setting-up-your-dev-environment
