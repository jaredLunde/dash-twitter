import { DashTokens } from "@dash-ui/styles";
import clsx from "clsx";
import * as React from "react";
import { compoundStyles, mq, responsiveStyles, styles } from "@/styles";
import type { ResponsiveProp } from "@/styles";
import { row } from "@/styles/layout";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "solid",
      color = "primary",
      size = "sm",
      className,
      children,
      fetching,
      ...props
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        className={clsx(
          className,
          { fetching },
          button[variant]({ color, size })
        )}
        {...props}
      >
        {fetching ? loaderElement : children}
      </button>
    );
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  /**
   * Select a button variant
   * @default "solid"
   */
  variant?: "solid" | "outline";
  /**
   * Select a button color
   * @default "primary"
   */
  color?: ResponsiveProp<"primary" | "secondary">;
  /**
   * Select a button size
   * @default "sm"
   */
  size?: ResponsiveProp<"sm" | "md" | "lg">;
  /**
   * Renders a loading icon as the child of this button when true
   * @default false
   */
  fetching?: boolean;
}

export function useA11yButton<P>(
  props: P
): React.HTMLAttributes<HTMLElement> & P {
  const clickedMouse = React.useRef(false);

  return {
    ...props,
    role: "button",
    tabIndex: 0,
    onTouchStart(e) {
      clickedMouse.current = true;
      (props as any).onTouchStart?.(e);
    },
    onMouseDown(e) {
      clickedMouse.current = true;
      (props as any).onMouseDown?.(e);
    },
    onClick(e) {
      // Only fire onClick if the keyboard was not used to initiate the click
      clickedMouse.current && (props as any).onClick?.(e);
      clickedMouse.current = false;
    },
    onKeyDown(e) {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        (props as any).onClick?.(e);
      }
    },
  };
}

/**
 * Resets all vendor `<button>` styles
 */
export const resetVendorButtonStyles = {
  padding: 0,
  border: "none",
  font: "inherit",
  color: "inherit",
  backgroundColor: "transparent",
  textDecoration: "none",
  appearance: "none",
  userSelect: "none",
  cursor: "pointer",
  verticalAlign: "middle",
  MozFocusInner: {
    border: 0,
    padding: 0,
    margin: 0,
  },
} as const;

/**
 * These are variants for solid button styles you want to use most often
 * in your application.
 */
const size = responsiveStyles({
  sm: (t) => ({
    fontSize: t.font.size.base,
    padding: `${8 / 16}rem ${14 / 16}rem`,
  }),

  md: (t) => ({
    fontSize: t.font.size.lg,
    padding: `${14 / 16}rem ${20 / 16}rem`,
  }),

  lg: (t) => ({
    fontSize: t.font.size.xl,
    padding: `${20 / 16}rem ${26 / 16}rem`,
  }),
});

const defaultStyles = (t: DashTokens) => ({
  ...resetVendorButtonStyles,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  letterSpacing: t.font.tracking.tight,
  lineHeight: t.font.leading.none,
  userSelect: "none",
  fontWeight: 600,
  borderRadius: t.radius.primary,
  borderStyle: "solid",
  borderColor: "transparent",
  borderWidth: t.borderWidth.hairline,
  transitionProperty: "background-color, box-shadow",
  transitionDuration: t.transition.duration.fast,
  transitionTimingFunction: t.transition.timing.inOut,

  "&.fetching": {
    cursor: "default",
  },

  ":focus-visible": {
    boxShadow: t.shadow.outline,
  },
});

export const button = {
  solid: compoundStyles({
    default: styles.one((t) => ({
      ...defaultStyles(t),
      "&[disabled]": {
        cursor: "not-allowed",
        opacity: 0.5,
      },
    })),
    size,
    color: responsiveStyles({
      primary: mq({
        default: ({ color }) => ({
          backgroundColor: color.primary,
          color: color.white,
        }),
        hover: ({ color }) => ({
          "&:hover:not([disabled]):not(.fetching)": {
            color: color.white,
            textDecoration: "none",
            backgroundColor: color.primaryHover,
          },
          "&:active:not([disabled]):not(.fetching)": {
            color: color.white,
            textDecoration: "none",
            backgroundColor: color.primaryActive,
          },
        }),
      }),

      secondary: mq({
        default: (t) => ({
          backgroundColor: t.color.secondary,
          color: t.color.white,

          [`.${styles.theme("dark")} &`]: {
            backgroundColor: t.color.secondary,
            color: t.color.black,
          },
        }),
        hover: (t) => ({
          "&:hover:not([disabled]):not(.fetching)": {
            color: t.color.white,
            textDecoration: "none",
            backgroundColor: t.color.secondaryHover,

            [`.${styles.theme("dark")} &`]: {
              color: t.color.black,
            },
          },
          "&:active:not([disabled]):not(.fetching)": {
            color: t.color.white,
            textDecoration: "none",
            backgroundColor: t.color.secondaryActive,

            [`.${styles.theme("dark")} &`]: {
              color: t.color.black,
            },
          },
        }),
      }),
    }),
  }),
  outline: compoundStyles({
    /**
     * The default variant adds shared styles to the button
     */
    default: styles.one((t) => ({
      ...resetVendorButtonStyles,
      ...defaultStyles(t),

      "&[disabled]": {
        cursor: "not-allowed",
        backgroundColor: "transparent",
        opacity: 0.5,
      },
    })),

    color: responsiveStyles({
      primary: mq({
        default: (t) => ({
          borderColor: t.color.primary,
          color: t.color.black,

          [`.${styles.theme("dark")} &`]: {
            color: t.color.white,
          },
        }),
        hover: (t) => ({
          "&:hover:not([disabled]):not(.fetching)": {
            color: t.color.black,
            textDecoration: "none",
            borderColor: t.color.primaryHover,
            backgroundColor: t.color.translucentDark,

            [`.${styles.theme("dark")} &`]: {
              color: t.color.white,
            },
          },
          "&:active:not([disabled]):not(.fetching)": {
            color: t.color.black,
            textDecoration: "none",

            [`.${styles.theme("dark")} &`]: {
              color: t.color.white,
            },
          },
        }),
      }),

      secondary: mq({
        default: (t) => ({
          borderColor: t.color.textAccent,
          color: t.color.secondary,
        }),
        hover: (t) => ({
          "&:hover:not([disabled]):not(.fetching)": {
            color: t.color.secondaryHover,
            textDecoration: "none",
            backgroundColor: t.color.translucentDark,
          },
          "&:active:not([disabled]):not(.fetching)": {
            color: t.color.secondaryActive,
            textDecoration: "none",

            [`.${styles.theme("dark")} &`]: {
              color: t.color.secondaryActive,
              backgroundColor: t.color.translucentDark,
            },
          },
        }),
      }),
    }),

    size,
  }),
} as const;

const loaderKeyframes = styles.keyframes({
  "0%,80%,100%": {
    transform: "scale(1) translateZ(0) translateY(-0.25em)",
  },
  "40%": {
    transform: "scale(0) translateZ(0) translateY(-0.25em)",
  },
});

export const loader = styles({
  default: (t) => ({
    display: "inline-block",
    transform: "translateZ(0) translateY(-0.167em)",
    transformOrigin: "center",
    backgroundColor: "currentColor",
    borderRadius: t.radius.full,
    width: "0.25em",
    height: "0.25em",
    animationFillMode: "both",
    animation: `${loaderKeyframes} 1s infinite ${t.transition.timing.inOut}`,
  }),
  first: {
    animationDelay: "0s",
  },
  second: {
    animationDelay: "0.25s",
    marginLeft: "0.25em",
  },
  third: {
    animationDelay: "0.125s",
    marginLeft: "0.25em",
  },
});

export const loaderElement = (
  <span
    className={row({ align: "start", height: "1em", display: "inlineBlock" })}
  >
    <span className={loader("first")} />
    <span className={loader("second")} />
    <span className={loader("third")} />
  </span>
);
