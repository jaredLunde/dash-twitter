/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from "clsx";
import NextLink from "next/link";
import type { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { useModalRoute } from "@/hooks/use-modal-route";
import { compoundStyles, mq, styles } from "@/styles";

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(
    {
      as,
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
        as={as}
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

export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  function NavLink(
    {
      as,
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
    const navLink = useNavLink({ as, href });

    return (
      <NextLink
        as={as}
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

export function useNavLink({ href, as }: Partial<LinkProps>) {
  const router = useRouter();
  const active = router.asPath === href || router.asPath === as;
  return React.useMemo(
    () =>
      ({
        active,
        props: { "aria-current": active ? "page" : undefined },
      } as const),
    [active]
  );
}

export const ModalLink = React.forwardRef<HTMLAnchorElement, ModalLinkProps>(
  function ModalLink(
    {
      href,
      locale,
      prefetch,
      replace,
      scroll,
      color = "primary",
      className,
      ...props
    },
    ref
  ) {
    const modalLink = useModalLink({ href });

    return (
      <NextLink
        locale={locale}
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        shallow
        {...modalLink.props}
      >
        <a ref={ref} className={clsx(className, link({ color }))} {...props} />
      </NextLink>
    );
  }
);

export function useModalLink({ href }: Partial<ModalLinkProps>) {
  const { createHref } = useModalRoute();

  return React.useMemo(
    () =>
      ({
        props: { href: createHref({ url: href }), as: href },
      } as const),
    [href, createHref]
  );
}

const link = compoundStyles(
  {
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
  },
  { atomic: true }
);

export interface LinkProps
  extends Omit<NextLinkProps, "passHref">,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  color?: "primary" | "secondary";
}

export interface NavLinkProps extends LinkProps {}
export interface ModalLinkProps extends Omit<LinkProps, "as" | "shallow"> {
  href: string;
}
