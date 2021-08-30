import clsx from "clsx";
import * as React from "react";
import { AccountToggle } from "@/components/account-toggle";
import { Icon } from "@/components/icon";
import { PrimaryNav } from "@/components/primary-nav";
import { column } from "@/styles/layout";
import { text } from "@/styles/text";

export const PrimarySidebar = React.memo(PrimarySidebarBase, () => true);

function PrimarySidebarBase() {
  return (
    <header
      className={column({
        width: "100%",
        height: "var(--vh)",
        border: [["none", "hairline", "none", "none"], "accent"],
        position: "sticky",
        inset: [0, "auto", "auto"],
        distribute: "between",
      })}
      style={{ overflow: "auto" }}
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
      <a className={clsx(column({ pad: "md" }), text({ color: "text" }))}>
        <Icon src="/icons/logo.svg" size={[30, 24]} />
      </a>
    </div>
  );
}
