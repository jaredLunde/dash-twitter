import clsx from "clsx";
import * as React from "react";
import { Icon } from "@/components/icon";
import { resetVendorInputStyles } from "@/components/input";
import { mq, styles } from "@/styles";
import { noop } from "@/utils/noop";

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      className,
      placeholder = "Search Twitter",
      required,
      onChange = noop,
      onFocus = noop,
      onBlur = noop,
      ...props
    },
    ref
  ) {
    const [focused, setFocused] = React.useState(false);

    return (
      <label
        aria-label="Search Twitter"
        className={clsx(
          className,
          input({
            focused: focused && !props.readOnly,
            disabled: props.disabled,
            readOnly: props.readOnly,
          })
        )}
      >
        <div className={input.left()}>
          <Icon src="/icons/search.svg" />
        </div>

        <div>
          <input
            ref={ref}
            {...props}
            placeholder={placeholder}
            required={required}
            aria-required={required}
            onChange={(e) => {
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
      </label>
    );
  }
);

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const input = Object.assign(
  styles({
    default: (t) => ({
      display: "inline-grid",
      color: t.color.textAccent,
      gridTemplateColumns: "max-content auto",
      backgroundColor: t.color.accent,
      borderRadius: t.radius.primary,
      borderWidth: t.borderWidth.hairline,
      borderStyle: "solid",
      borderColor: "transparent",
      fontSize: t.font.size.base,
      width: "100%",

      input: {
        ...resetVendorInputStyles,
        color: t.color.text,
        lineHeight: t.font.leading.relaxed,
        padding: `${t.pad.sm} ${t.pad.md}`,
        width: "100%",
        transitionProperty: "color",
        transitionDuration: t.transition.duration.fast,
        transitionTimingFunction: t.transition.timing.inOut,
      },
    }),

    focused: (t) => ({
      color: t.color.primary,
      borderColor: "currentColor",
      backgroundColor: t.color.bodyBg,

      input: {
        caretColor: t.color.text,
        color: t.color.text,
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

    gridTemplateColumns: "min-content 1fr",
  }),
  {
    left: styles.one((t) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingLeft: t.pad.md,
    })),
  } as const
);
