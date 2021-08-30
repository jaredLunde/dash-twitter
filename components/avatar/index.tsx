import clsx from "clsx";
import * as React from "react";
import { compoundStyles, responsiveStyles, styles } from "@/styles";
import type { ResponsiveProp } from "@/styles";

export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  function Avatar(
    {
      src,
      defaultSrc = "/default-avatar.png",
      size = "sm",
      className,
      alt,
      ...props
    },
    ref
  ) {
    return (
      <img
        ref={ref}
        src={src || defaultSrc}
        className={clsx(className, avatar({ size }))}
        aria-hidden={!props["aria-label"]}
        alt={alt}
        {...props}
      />
    );
  }
);

const avatar = compoundStyles({
  default: styles.one((t) => ({
    display: "flex",
    objectFit: "cover",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "nowrap",
    borderRadius: t.radius.primary,
  })),
  size: responsiveStyles.lazy((value: number | string) => {
    if (["xs", "sm", "md", "lg", "xl", "2xl"].includes(String(value))) {
      return {
        xs: {
          width: 24,
          height: 24,
        },
        sm: {
          width: 40,
          height: 40,
        },
        md: {
          width: 48,
          height: 48,
        },
        lg: {
          width: 56,
          height: 56,
        },
        xl: {
          width: 124,
          height: 124,
        },
        "2xl": {
          width: 368,
          height: 368,
        },
      }[value] as { width: number; height: number };
    }

    return { width: value, height: value };
  }),
});

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  defaultSrc?: string;
  size?: ResponsiveProp<
    number | (("xs" | "sm" | "md" | "lg" | "xl" | "2xl") & string)
  >;
}
