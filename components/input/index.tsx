import clsx from "clsx";
import * as React from "react";
import { mq, styles } from "@/styles";
import { noop } from "@/utils/noop";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      className,
      placeholder,
      required,
      left,
      right,
      onChange = noop,
      onFocus = noop,
      onBlur = noop,
      ...props
    },
    ref
  ) {
    const [focused, setFocused] = React.useState(false);
    const [entered, setEntered] = React.useState(
      !!(props.value ?? props.defaultValue)
    );
    const typing = (!props.readOnly && focused) || entered;
    const groupVariant =
      left && right ? "both" : left ? "left" : right ? "right" : undefined;
    return (
      <label
        className={clsx(
          className,
          input(
            {
              focused: focused && !props.readOnly,
              disabled: props.disabled,
              readOnly: props.readOnly,
            },
            groupVariant
          )
        )}
      >
        {left && <div className={input.left()}>{left}</div>}
        <div>
          <span
            className={input.visualStyles({
              focused: focused && !props.readOnly,
              typing,
              readOnly: props.readOnly,
              hasLeft: !!left,
              hasRight: !!right,
            })}
          >
            <span />
            {placeholder && (
              <span>
                <span className={input.placeholder({ typing })}>
                  {placeholder}
                </span>
              </span>
            )}
            <span />
          </span>

          <input
            ref={ref}
            {...props}
            required={required}
            aria-required={required}
            onChange={(e) => {
              setEntered(!!e.target.value);
              onChange(e);
            }}
            onFocus={(e) => {
              setFocused(true);
              onFocus(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur(e);
            }}
          />
        </div>

        {right && <div className={input.right()}>{right}</div>}
      </label>
    );
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export const resetVendorInputStyles = {
  display: "inline-block",
  verticalAlign: "middle",
  margin: 0,
  padding: 0,
  lineHeight: 1,
  border: "none",
  backgroundImage: "none",
  backgroundColor: "transparent",
  boxShadow: "none",
  appearance: "none",
  outline: "none",
  color: "currentColor",
  fontFamily: "inherit",
  fontSize: "inherit",
  fontWeight: "inherit",
  letterSpacing: "inherit",

  ":focus, .using-keyboard &:focus": {
    outline: "none",
    boxShadow: "none",
  },
} as const;

export const input = Object.assign(
  styles({
    default: mq({
      default: ({ pad, color, transition, font }) => ({
        display: "inline-grid",
        color: color.textAccent,
        gridTemplateColumns: "1fr",

        input: {
          ...resetVendorInputStyles,
          color: color.text,
          lineHeight: font.leading.relaxed,
          padding: `${pad.sm} ${pad.sm}`,
          width: "100%",
          transitionProperty: "color",
          transitionDuration: transition.duration.fast,
          transitionTimingFunction: transition.timing.inOut,
        },
      }),
      hover: ({ color }) => ({
        ":hover": {
          backgroundColor: color.translucentLight,
        },
      }),
    }),

    focused: ({ color }) => ({
      input: {
        caretColor: color.text,
        color: color.text,
      },
    }),

    disabled: mq({
      default: {
        opacity: 0.5,
        input: {
          cursor: "not-allowed",
        },
      },
      hover: {
        ":hover": {
          backgroundColor: "transparent",
        },
      },
    }),

    readOnly: mq({
      default: {
        input: {
          cursor: "default",
        },
      },
      hover: {
        ":hover": {
          backgroundColor: "transparent",
        },
      },
    }),

    both: {
      gridTemplateColumns: "min-content 1fr min-content",
    },

    left: {
      gridTemplateColumns: "min-content 1fr",
    },

    right: {
      gridTemplateColumns: "1fr min-content",
    },
  }),
  {
    left: styles.one((t) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: t.color.textAccent,
      borderColor: t.color.accent,
      borderWidth: `${t.borderWidth.hairline} 0 ${t.borderWidth.hairline} ${t.borderWidth.hairline}`,
      borderStyle: "solid",
      borderRadius: `${t.radius.primary} 0 0 ${t.radius.primary}`,
    })),
    right: styles.one((t) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: t.color.textAccent,
      backgroundColor: t.color.accent,
      borderRadius: `0 ${t.radius.primary} ${t.radius.primary} 0`,
    })),
    visualStyles: styles({
      default: ({ color, radius, transition, borderWidth }) => ({
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        height: "100%",
        width: "100%",
        color: "currentColor",
        borderRadius: radius.primary,

        "> span": {
          flexShrink: 0,
          height: "100%",
          border: `${borderWidth.hairline} solid ${color.accent}`,
          transitionProperty: "border-color",
          transitionDuration: transition.duration.fast,
          transitionTimingFunction: transition.timing.inOut,

          ":first-child": {
            width: 6,
            borderRightWidth: 0,
            borderRadius: `${radius.primary} 0 0 ${radius.primary}`,
          },

          ":nth-child(2):not(:last-child)": {
            display: "flex",
            width: "max-content",
            alignItems: "center",
            borderRightWidth: 0,
            borderLeftWidth: 0,
            padding: `0 3px`,
          },

          ":last-child": {
            flexGrow: 1,
            borderLeftWidth: 0,
            borderRadius: `0 ${radius.primary} ${radius.primary} 0`,
          },
        },
      }),

      hasLeft: {
        "> span:first-child": {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
      },

      hasRight: {
        "> span:last-child": {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
      },

      readOnly: () => ({
        // backgroundColor: color.translucent,
      }),

      focused: ({ color }) => ({
        "> span": {
          borderColor: color.primary,
        },
      }),

      typing: {
        span: {
          ":nth-child(2):not(:last-child)": {
            borderTopColor: "transparent",
          },
        },
      },
    }),

    placeholder: styles({
      default: ({ transition }) => ({
        display: "inline-block",
        color: "currentColor",
        transformOrigin: "top left",
        transitionProperty: "font-size, color, transform, font-weight",
        transitionDuration: transition.duration.fast,
        transitionTimingFunction: transition.timing.inOut,
      }),

      typing: ({ font }) => ({
        fontWeight: 600,
        fontSize: font.size.xs,
        transform: `translateY(-1.618em)`,
      }),
    }),
  } as const
);
