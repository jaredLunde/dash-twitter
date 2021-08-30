import clsx from "clsx";
import * as React from "react";
import { Avatar } from "@/components/avatar";
import { resetVendorButtonStyles } from "@/components/button";
import { Icon } from "@/components/icon";
import { mq, styles } from "@/styles";
import { box, column, grid } from "@/styles/layout";
import { text } from "@/styles/text";

export function AccountToggle() {
  return (
    <button className={accountToggleButton()}>
      <Avatar src="https://pbs.twimg.com/profile_images/1318335215627083781/aJz0jr-d_400x400.jpg" />
      <div
        className={clsx(
          column({
            display: { min: "none", xl: "flex" },
          }),
          text({ align: "left", leading: "snug" })
        )}
      >
        <b>Jared Lunde</b>
        <span className={text({ color: "textAccentLight" })}>@jaredLunde</span>
      </div>
      <div
        className={box({
          display: { min: "none", xl: "block" },
        })}
      >
        <Icon src="/icons/more-horizontal.svg" size={20} />
      </div>
    </button>
  );
}

const accountToggleButton = styles.one(
  mq({
    default: (t) => ({
      ...resetVendorButtonStyles,
      display: "grid",
      gridTemplateColumns: "max-content auto max-content",
      alignItems: "center",
      width: "100%",
      padding: t.pad.sm,
      gap: t.gap.md,
      borderRadius: t.radius.primary,
    }),
    hover: (t) => ({
      ":hover": {
        backgroundColor: t.color.translucentDark,
      },
    }),
  })
);
