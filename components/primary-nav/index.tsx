import clsx from "clsx";
import Link from "next/link";
import type { LinkProps } from "next/link";
import * as React from "react";
import { button } from "@/components/button";
import { DropdownMenu } from "@/components/dropdown-menu";
import { Icon } from "@/components/icon";
import { useModalLink, useNavLink } from "@/components/link";
import { mq, styles } from "@/styles";
import type { ResponsiveProp } from "@/styles";
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
          icon={{
            min: "/icons/search.svg",
            xl: "/icons/hash.svg",
          }}
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

        <DropdownMenu.Root modal={false}>
          <DropdownMenu.Content side="top" align="start">
            <DropdownMenu.IconItemLink
              href="/jaredLunde/topics"
              src="/icons/message-circle.svg"
              textValue="Topics"
            >
              Topics
            </DropdownMenu.IconItemLink>
            <DropdownMenu.IconItemLink
              href="/i/moment_maker"
              src="/icons/zap.svg"
              textValue="Moments"
            >
              Moments
            </DropdownMenu.IconItemLink>
            <DropdownMenu.IconItemLink
              href="/i/newsletters"
              src="/icons/align-justify.svg"
              textValue="Newsletters"
            >
              Newsletters
            </DropdownMenu.IconItemLink>
            <DropdownMenu.IconItemExternalLink
              href="https://ads.twitter.com"
              src="/icons/external-link.svg"
              textValue="Twitter Ads"
              onSelect={(e) => e.preventDefault()}
            >
              Twitter Ads
            </DropdownMenu.IconItemExternalLink>
            <DropdownMenu.IconItemExternalLink
              href="https://analytics.twitter.com"
              src="/icons/bar-chart-2.svg"
              textValue="Analytics"
              onSelect={(e) => e.preventDefault()}
            >
              Analytics
            </DropdownMenu.IconItemExternalLink>
            <DropdownMenu.Separator />
            <DropdownMenu.IconItemLink
              href="/settings/account"
              src="/icons/settings.svg"
              textValue="Settings and privacy"
            >
              Settings &amp; privacy
            </DropdownMenu.IconItemLink>
            <DropdownMenu.IconItemExternalLink
              href="https://help.twitter.com"
              textValue="Help Center"
              src="/icons/help-circle.svg"
              onSelect={(e) => e.preventDefault()}
            >
              Help Center
            </DropdownMenu.IconItemExternalLink>
            <DropdownMenu.IconItemLink
              href="/i/display"
              src="/icons/edit.svg"
              textValue="Display"
            >
              Display
            </DropdownMenu.IconItemLink>
            <DropdownMenu.IconItemLink
              href="/i/keyboard_shorcuts"
              src="/icons/command.svg"
              textValue="Keyboard shortcuts"
            >
              Keyboard shortcuts
            </DropdownMenu.IconItemLink>
          </DropdownMenu.Content>

          <DropdownMenu.Trigger
            className={clsx(button.reset(), primaryNavItem())}
          >
            <span className={primaryNavItemText()}>
              <Icon src="/icons/more-horizontal.svg" size={26} />
              <span>More</span>
            </span>
          </DropdownMenu.Trigger>
        </DropdownMenu.Root>
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
  let src = icon;

  if (navLink.active && typeof icon === "string") {
    src = icon.replace("/icons/", "/icons/bold/");
  } else if (navLink.active) {
    src = Object.keys(icon).reduce<any>((acc, key) => {
      acc[key] = (icon as any)[key].replace("/icons/", "/icons/bold/");
      return acc;
    }, {});
  }

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
          <Icon src={src} size={26} />
          <span>{children}</span>
        </span>
      </a>
    </Link>
  );
}

export interface PrimaryNavLinkProps
  extends LinkProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "aria-label"> {
  icon: ResponsiveProp<string>;
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
      contain: "layout",

      "> span": {
        borderRadius: t.radius.primary,
      },

      "&:not([aria-current=page]) > span": {
        fontWeight: 400,
      },

      ":focus-visible > span": {
        backgroundColor: t.color.translucentDark,
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
