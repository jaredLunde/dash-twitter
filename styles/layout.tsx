import layout from "@dash-ui/layout";
import { mediaQueries, styles } from "./index";

export const {
  autoGrid,
  box,
  cluster,
  column,
  flexItem,
  grid,
  gridItem,
  layer,
  row,

  alignContent,
  alignItems,
  alignSelf,
  justifyContent,
  justifyItems,
  justifySelf,
} = layout(styles, mediaQueries);
