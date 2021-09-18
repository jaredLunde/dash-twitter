import { useGlobal, useThemes } from "@dash-ui/react";
import resetGlobalStyles from "@dash-ui/reset";
import { useWindowHeight } from "@react-hook/window-size";
import { useAtom } from "jotai";
import { fontAtom, fontSizeAtom, fontSizes, typography } from "@/styles/text";

/**
 * Injects global styles for the app
 */
export function GlobalStyles() {
  const [fontSize] = useAtom(fontSizeAtom);
  const [font] = useAtom(fontAtom);
  useFillAvailable();
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
        textAlign: "center",
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
    [fontSize, font]
  );

  useGlobal(`body {${typography.css("sm")}}`, []);

  return null;
}

function useFillAvailable() {
  let windowHeight: number | string = useWindowHeight();
  windowHeight =
    typeof window === "undefined" || typeof CSS === "undefined"
      ? windowHeight + "px"
      : CSS.supports("height", "fill-available")
      ? "fill-available"
      : CSS.supports("height", "-webkit-fill-available")
      ? "-webkit-fill-available"
      : CSS.supports("height", "-moz-available")
      ? "-moz-available"
      : windowHeight + "px";

  useThemes({ light: { vh: windowHeight }, dark: { vh: windowHeight } }, [
    windowHeight,
  ]);
}
