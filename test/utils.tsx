import { render } from "@testing-library/react";
import { DashProvider } from "@dash-ui/react";
import { styles } from "@/styles";

export function renderStyled(
  ui: Parameters<typeof render>[0],
  options?: Parameters<typeof render>[1]
) {
  return render(ui, {
    ...options,
    wrapper: ({ children }) => (
      <DashProvider styles={styles}>{children}</DashProvider>
    ),
  });
}
