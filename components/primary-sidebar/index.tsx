import clsx from "clsx";
import NextLink from "next/link";
import * as React from "react";
import { AccountToggle } from "@/components/account-toggle";
import { Icon } from "@/components/icon";
import { iconButton } from "@/components/icon-button";
import { PrimaryNav } from "@/components/primary-nav";
import { styles } from "@/styles";
import { column } from "@/styles/layout";
import { text } from "@/styles/text";

export const PrimarySidebar = React.memo(PrimarySidebarBase, () => true);

function PrimarySidebarBase() {
  return (
    <header
      className={column({
        width: "100%",
        height: "var(--vh)",
        minHeight: "var(--vh)",
        border: [["none", "hairline", "none", "none"], "accent"],
        position: "sticky",
        inset: [0, "auto", "auto"],
        distribute: "between",
      })}
      style={{ overflow: "auto", contain: "strict" }}
    >
      <div
        className={column({
          align: { min: "center", xl: "start" },
          width: "100%",
          gap: "md",
        })}
      >
        <HomeButton />
        <PrimaryNav />
      </div>

      <div
        className={clsx(
          column({
            width: "100%",
            align: "center",
            pad: { min: "sm", sm: "md", xl: ["md", "md", "md", "none"] },
          }),
          text({ color: "text" })
        )}
      >
        <AccountToggle />
      </div>
    </header>
  );
}

function HomeButton() {
  return (
    <div>
      <NextLink href="/">
        <a
          className={styles.join(
            text.css({ color: "text" }),
            iconButton.solid.css({ color: "primary" }),
            styles
              .one({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 30,
                width: 30,
                padding: "1em",
                boxSizing: "content-box",
                marginTop: 2,
              })
              .css()
          )}
        >
          <Icon src="/icons/logo.svg" size={[30, 24]} />
        </a>
      </NextLink>
    </div>
  );
}
