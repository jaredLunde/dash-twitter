import clsx from "clsx";
import Link from "next/link";
import type { LinkProps } from "next/link";
import * as React from "react";
import { button } from "@/components/button";
import { Icon } from "@/components/icon";
import { useModalLink, useNavLink } from "@/components/link";
import { mq, styles } from "@/styles";
import { box, column, grid } from "@/styles/layout";
import { text } from "@/styles/text";

export function PrimaryNav() {
  const composeLink = useModalLink({ href: "/compose/tweet" });

  return (
    <div
      className={column({
        width: { min: 72, xl: "100%" },
        align: { min: "center", xl: "start" },
        gap: { vMin: "md", vMd: "lg" },
      })}
    >
      <nav
        aria-label="Primary navigation"
        role="navigation"
        className={column({
          align: { min: "center", xl: "stretch" },
          width: "100%",
          gap: "sm",
        })}
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
          overflow
        >
          Bookmarks
        </PrimaryNavLink>
        <PrimaryNavLink
          href="/lists"
          icon="/icons/list.svg"
          aria-label="Lists"
          overflow
        >
          Lists
        </PrimaryNavLink>
        <PrimaryNavLink
          href="/jaredLunde"
          icon="/icons/user.svg"
          aria-label="Profile"
        >
          Profile
        </PrimaryNavLink>

        <button className={clsx(button.reset(), primaryNavItem())}>
          <span className={primaryNavItemText()}>
            <Icon src="/icons/more-horizontal.svg" size={26} />
            <span>More</span>
          </span>
        </button>
      </nav>

      <div
        className={column({
          width: "100%",
          pad: {
            min: ["none", "sm"],
            xl: ["none", "lg", "none", "none"],
          },
        })}
      >
        <Link {...composeLink.props}>
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
  overflow,
  ...props
}: PrimaryNavLinkProps) {
  const navLink = useNavLink({ href });

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
        className={clsx(className, primaryNavItem({ overflow }))}
        {...navLink.props}
        {...props}
      >
        <span className={primaryNavItemText()}>
          <Icon
            src={
              navLink.active ? icon.replace("/icons/", "/icons/bold/") : icon
            }
            size={26}
          />
          <span>{children}</span>
        </span>
      </a>
    </Link>
  );
}

export interface PrimaryNavLinkProps
  extends LinkProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "aria-label"> {
  icon: string;
  "aria-label": string;
  overflow?: boolean;
}

const primaryNavItemBase = styles.one(
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

export const primaryNavItem = (styles?: { overflow?: boolean }) =>
  clsx(
    box({ display: { vMin: styles?.overflow ? "none" : "flex", vSm: "flex" } }),
    primaryNavItemBase()
  );

const primaryNavItemTextBase = styles.one(
  mq({
    default: { "span:last-child": { display: "none" } },
    xl: { "span:last-child": { display: "block" } },
  })
);

export const primaryNavItemText = () =>
  clsx(
    text({ variant: "heading" }),
    grid({
      pad: { vMin: ["sm", "md"], vMd: "md" },
      cols: {
        min: [26],
        xl: [26, "auto"],
      },
      gap: "lg",
      alignY: "center",
    }),
    primaryNavItemTextBase()
  );
