import useMergeRefs from "@react-hook/merged-ref";
import clsx from "clsx";
import * as React from "react";
import { compoundStyles, responsiveStyles, styles } from "@/styles";
import type { ResponsiveProp } from "@/styles";

export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  function Avatar(
    {
      src: preferredSrc,
      defaultSrc = "/default-avatar.png",
      size = "sm",
      className,
      alt,
      ...props
    },
    outerRef
  ) {
    const [src, setSrc] = React.useState(preferredSrc ?? defaultSrc);
    const innerRef = React.useRef<HTMLImageElement>(null);
    const ref = useMergeRefs(innerRef, outerRef);

    React.useEffect(() => {
      const img = innerRef.current;
      if (!img) return;
      let didUnsubscribe = false;
      img.onerror = function (this: HTMLImageElement) {
        if (!didUnsubscribe) {
          setSrc(defaultSrc);
          img.onerror = null;
        }
      };
      return () => {
        didUnsubscribe = true;
      };
    }, [defaultSrc]);

    return (
      <img
        ref={ref}
        src={src}
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
    if (Object.keys(sizes).includes(String(value))) {
      return sizes[value as keyof typeof sizes];
    }

    return { width: value, height: value };
  }),
});

const sizes = {
  "2xs": {
    width: 16,
    height: 16,
  },
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
} as const;
export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  defaultSrc?: string;
  size?: ResponsiveProp<
    number | (("2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl") & string)
  >;
}
