import { styles } from "@/styles";

export const separator = styles.one((t) => ({
  backgroundColor: t.color.accent,
  height: t.borderWidth.hairline,
  width: "100%",
}));
