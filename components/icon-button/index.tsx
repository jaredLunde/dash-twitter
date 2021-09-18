import type { DashTokens } from "@dash-ui/styles";
import clsx from "clsx";
import * as React from "react";
import { Icon } from "@/components/icon";
import { compoundStyles, mq, responsiveStyles, styles } from "@/styles";
import type { ResponsiveProp } from "@/styles";

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      variant = "solid",
      color = "primary",
      size = "sm",
      src,
      className,
      ...props
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        className={clsx(className, iconButton[variant]({ color, size }))}
        {...props}
      >
        <Icon src={src} />
      </button>
    );
  }
);

export interface IconButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "color" | "children"
  > {
  /**
   * The path to the icon
   */
  src: string;
  /**
   * Select a button variant
   *
   * @default "solid"
   */
  variant?: keyof typeof iconButton;
  /**
   * Select a button color
   *
   * @default "primary"
   */
  color?: ResponsiveProp<"primary" | "secondary">;
  /**
   * Select a button size
   *
   * @default "sm"
   */
  size?: ResponsiveProp<"sm" | "md" | "lg">;
}

export function useA11yIconButton<P>(
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
export const resetVendorIconButtonStyles = {
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
  "-moz-focus-inner": {
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
  sm: {
    fontSize: `${12 / 16}rem`,
    padding: `${6 / 16}rem ${6 / 16}rem`,
    contain: "strict",
  },

  md: {
    fontSize: `${16 / 16}rem`,
    padding: `${6 / 16}rem ${6 / 16}rem`,
    contain: "strict",
  },

  lg: {
    fontSize: `${20 / 16}rem`,
    padding: `${6 / 16}rem ${6 / 16}rem`,
    contain: "strict",
  },
});

const defaultStyles = (t: DashTokens) => ({
  ...resetVendorIconButtonStyles,
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

export const iconButton = {
  solid: compoundStyles(
    {
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
          default: {
            backgroundColor: "transparent",
          },
          hover: ({ color }) => ({
            "&:hover:not([disabled]):not(.fetching)": {
              textDecoration: "none",
              backgroundColor: color.translucentPrimary,
            },
            "&:active:not([disabled]):not(.fetching)": {
              textDecoration: "none",
              backgroundColor: color.translucentPrimaryActive,
            },
          }),
        }),

        secondary: mq({
          default: {
            backgroundColor: "transparent",
          },
          hover: ({ color }) => ({
            "&:hover:not([disabled]):not(.fetching)": {
              textDecoration: "none",
              backgroundColor: color.translucentLight,
            },
            "&:active:not([disabled]):not(.fetching)": {
              textDecoration: "none",
              backgroundColor: color.translucentLightActive,
            },
          }),
        }),
      }),
    },
    { atomic: true }
  ),
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
