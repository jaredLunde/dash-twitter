import clsx from "clsx";
import Link from "next/link";
import type { LinkProps } from "next/link";
import * as React from "react";
import { button } from "@/components/button";
import { Icon } from "@/components/icon";
import { useNavLink } from "@/components/link";
import { mq, styles } from "@/styles";
import { box, column, grid } from "@/styles/layout";
import { text } from "@/styles/text";

export function PrimaryNav(props: PrimaryNavProps) {
  return (
    <div
      className={column({
        width: { min: 72, xl: "100%" },
        align: { min: "center", xl: "start" },
        gap: { vMin: "md", vSm: "lg" },
      })}
    >
      <nav
        aria-label="Primary navigation"
        role="navigation"
        className={clsx(column({ gap: "sm" }))}
      >
        <PrimaryNavLink href="/" icon="/icons/home.svg" aria-label="Home">
          Home
        </PrimaryNavLink>
        <PrimaryNavLink
          href="/explore"
          icon="/icons/hash.svg"
          aria-label="Explore"
        >
          Explore
        </PrimaryNavLink>
        <PrimaryNavLink
          href="/notifications"
          icon="/icons/bell.svg"
          aria-label="Explore"
        >
          Notifications
        </PrimaryNavLink>
        <PrimaryNavLink
          href="/messages"
          icon="/icons/mail.svg"
          aria-label="Messages"
        >
          Messages
        </PrimaryNavLink>
        <PrimaryNavLink
          href="/bookmarks"
          icon="/icons/bookmark.svg"
          aria-label="Explore"
        >
          Bookmarks
        </PrimaryNavLink>
        <PrimaryNavLink href="/lists" icon="/icons/list.svg" aria-label="Lists">
          Lists
        </PrimaryNavLink>
        <PrimaryNavLink
          href="/jaredLunde"
          icon="/icons/user.svg"
          aria-label="Profile"
        >
          Profile
        </PrimaryNavLink>
        <PrimaryNavLink
          href="/#"
          icon="/icons/more-horizontal.svg"
          aria-label="Profile"
        >
          More
        </PrimaryNavLink>
      </nav>

      <div
        className={column({
          width: "100%",
          pad: {
            min: ["none", "sm"],
            xl: ["none", "lg", "none", "md"],
          },
        })}
      >
        <Link href="/compose/tweet">
          <a
            className={button.solid({
              color: "primary",
              size: "md",
            })}
          >
            <span className={box({ display: { min: "none", xl: "block" } })}>
              Tweet
            </span>
            <span className={box({ display: { min: "block", xl: "none" } })}>
              <Icon src="/icons/feather.svg" size={24} />
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
}

function PrimaryNavLink({
  icon,
  href,
  locale,
  prefetch,
  replace,
  scroll,
  shallow,
  className,
  children,
  ...props
}: PrimaryNavLinkProps) {
  const navLink = useNavLink(href);

  return (
    <Link
      href={href}
      locale={locale}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
    >
      <a
        role="link"
        className={clsx(className, primaryNavItem())}
        {...navLink.props}
        {...props}
      >
        <span
          className={clsx(
            text({ variant: "heading" }),
            grid({
              pad: { vMin: ["sm", "md"], vSm: "md" },
              cols: {
                min: [26],
                xl: [26, "auto"],
              },
              gap: "lg",
              alignY: "center",
            })
          )}
        >
          <Icon
            src={
              navLink.active ? icon.replace("/icons/", "/icons/bold/") : icon
            }
            size={26}
          />
          <span className={box({ display: { min: "none", xl: "block" } })}>
            {children}
          </span>
        </span>
      </a>
    </Link>
  );
}

export interface PrimaryNavProps {}

export interface PrimaryNavLinkProps
  extends LinkProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "aria-label"> {
  icon: string;
  "aria-label": string;
}

export const primaryNav = styles.one((t) => ({}));
export const primaryNavItem = styles.one(
  mq({
    default: (t) => ({
      display: "flex",
      justifyContent: "flex-start",
      color: t.color.text,
      textAlign: "left",
      backgroundColor: "transparent",

      "> span": {
        borderRadius: t.radius.primary,
      },

      "&:not([aria-current=page]) > span": {
        fontWeight: 400,
      },
    }),
    hover: (t) => ({
      ":hover > span": {
        backgroundColor: t.color.translucentDark,
      },
    }),
  })
);
