import { useGlobal, useThemes } from "@dash-ui/react";
import resetGlobalStyles from "@dash-ui/reset";
import { useDebounce } from "@react-hook/debounce";
import { useAtom } from "jotai";
import * as React from "react";
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
        minHeight: "var(--vh)",
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
  const [windowHeight, setWindowHeight] = useDebounce(
    typeof window === "undefined" ? "100vh" : window.innerHeight + "px",
    100
  );

  React.useEffect(() => {
    let didUnsubscribe = false;
    function handleResize() {
      if (didUnsubscribe) return;
      setWindowHeight(window.innerHeight + "px");
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      didUnsubscribe = true;
    };
  }, [setWindowHeight]);

  useThemes({ light: { vh: windowHeight }, dark: { vh: windowHeight } }, [
    windowHeight,
  ]);
}
