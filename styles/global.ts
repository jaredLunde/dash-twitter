import { useGlobal } from "@dash-ui/react";
import resetGlobalStyles from "@dash-ui/reset";
import { useAtom } from "jotai";
import { fontAtom, fontSizeAtom, fontSizes, typography } from "@/styles/text";

/**
 * Injects global styles for the app
 */
export function GlobalStyles() {
  const [fontSize] = useAtom(fontSizeAtom);
  const [font] = useAtom(fontAtom);

  useGlobal(resetGlobalStyles, []);

  useGlobal(
    (t) => ({
      "*, ::before, ::after, body": {
        position: "relative",
        margin: 0,
        overflowWrap: "break-word",
      },
      "*:focus": {
        outline: "none",
      },
      "::selection, ::-moz-selection": {
        backgroundColor: t.color.indigo200,
      },
      html: {
        fontSize: fontSizes[fontSize],
        overflowX: "hidden",

        ":focus-within": {
          scrollBehavior: "smooth",
        },
      },
      body: {
        minWidth: "100%",
        minHeight: "100%",
        backgroundColor: t.color.bodyBg,
        fontFamily: t.font.family[font],
      },
      ".loud": {
        transitionProperty: "opacity,visibility",
        transitionDuration: t.transition.duration.slower,
        transitionTimingFunction: t.transition.timing.inOut,
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
