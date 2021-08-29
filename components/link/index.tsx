/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from "clsx";
import NextLink from "next/link";
import type { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { compoundStyles, mq, styles } from "@/styles";

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(
    {
      href,
      locale,
      prefetch,
      replace,
      scroll,
      shallow,
      color = "primary",
      className,
      ...props
    },
    ref
  ) {
    return (
      <NextLink
        href={href}
        locale={locale}
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
      >
        <a ref={ref} className={clsx(className, link({ color }))} {...props} />
      </NextLink>
    );
  }
);

export const NavLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function NavLink(
    {
      href,
      locale,
      prefetch,
      replace,
      scroll,
      shallow,
      color = "primary",
      className,
      ...props
    },
    ref
  ) {
    const navLink = useNavLink(href);

    return (
      <NextLink
        href={href}
        locale={locale}
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
      >
        <a
          ref={ref}
          className={clsx(className, link({ color }))}
          {...navLink.props}
          {...props}
        />
      </NextLink>
    );
  }
);

export function useNavLink(href: LinkProps["href"]) {
  const router = useRouter();
  const active = router.asPath === href;
  return React.useMemo(
    () =>
      ({
        active,
        props: { "aria-current": active ? "page" : undefined },
      } as const),
    [active]
  );
}

const link = compoundStyles({
  default: styles.one({
    ":hover": {
      cursor: "pointer",
    },
  }),
  color: styles({
    primary: mq({
      default: ({ color }) => ({
        color: color.primary,

        ":focus-visible": {
          textDecoration: "underline",
        },
      }),
      hover: {
        ":hover": {
          textDecoration: "underline",
        },
      },
    }),
    secondary: mq({
      default: ({ color }) => ({
        color: color.secondary,

        ":focus-visible": {
          textDecoration: "underline",
        },
      }),
      hover: {
        ":hover": {
          textDecoration: "underline",
        },
      },
    }),
  }),
});

export interface LinkProps
  extends Omit<NextLinkProps, "passHref" | "as">,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  color?: "primary" | "secondary";
}
