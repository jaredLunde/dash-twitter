import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import * as React from "react";
import { Avatar } from "@/components/avatar";
import { resetVendorButtonStyles } from "@/components/button";
import { Icon } from "@/components/icon";
import { mq, styles } from "@/styles";
import { box, column, grid } from "@/styles/layout";
import { separator } from "@/styles/separator";
import { text } from "@/styles/text";

export function AccountToggle() {
  /**
   * DropdownMenu is sort of busted until this is resolved
   * @see https://github.com/radix-ui/primitives/issues/781
   */
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Content
        className={accountToggleContent()}
        side="top"
        sideOffset={16}
      >
        <DropdownMenu.Arrow
          className={accountToggleArrow()}
          width={16}
          height={8}
          offset={24}
        />
        <DropdownMenu.RadioGroup
          value="jaredLunde"
          className={column({ width: "100%" })}
        >
          <DropdownMenu.RadioItem
            value="jaredLunde"
            className={grid({
              cols: ["max-content", "auto", "max-content"],
              gap: "md",
              pad: "md",
              alignY: "center",
            })}
          >
            <Avatar
              src="https://pbs.twimg.com/profile_images/1318335215627083781/aJz0jr-d_400x400.jpg"
              size="md"
            />
            <div
              className={clsx(
                column({}),
                text({ align: "left", leading: "snug" })
              )}
            >
              <b>Jared Lunde</b>
              <span className={text({ color: "textAccentLight" })}>
                @jaredLunde
              </span>
            </div>

            <DropdownMenu.ItemIndicator>
              <Icon src="/icons/check.svg" color="primary" size={18} />
            </DropdownMenu.ItemIndicator>
          </DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>

        <DropdownMenu.Separator className={separator()} />

        <DropdownMenu.Group>
          <DropdownMenu.Item
            className={accountToggleMenuItem()}
            textValue="Add an existing account"
          >
            Add an existing account
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={accountToggleMenuItem()}
            textValue="Log out"
          >
            Log out @jaredLunde
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>

      <DropdownMenu.Trigger className={accountToggleButton()}>
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
          <span className={text({ color: "textAccentLight" })}>
            @jaredLunde
          </span>
        </div>

        <div
          className={box({
            display: { min: "none", xl: "block" },
          })}
        >
          <Icon src="/icons/more-horizontal.svg" size={20} />
        </div>
      </DropdownMenu.Trigger>
    </DropdownMenu.Root>
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

      ":focus-visible": {
        backgroundColor: t.color.translucentDark,
        boxShadow: t.shadow.outline,
      },
    }),
    hover: (t) => ({
      ":hover": {
        backgroundColor: t.color.translucentDark,
      },
    }),
  })
);

const accountToggleContent = styles.one((t) => ({
  padding: `${t.pad.sm} 0 ${t.pad.md}`,
  borderRadius: t.radius.secondary,
  boxShadow: t.shadow.lg,
  width: 300,
  backgroundColor: t.color.bodyBg,
  border: `${t.borderWidth.hairline} solid ${t.color.accent}`,
}));

const accountToggleArrow = styles.one((t) => ({
  polygon: {
    boxShadow: t.shadow.lg,
    fill: t.color.bodyBg,
  },
}));

const accountToggleMenuItem = styles.one(
  mq({
    default: (t) => ({
      textAlign: "left",
      padding: t.pad.md,

      ":focus-visible": {
        backgroundColor: t.color.translucentDark,
      },
    }),
    hover: (t) => ({
      ":hover": {
        backgroundColor: t.color.translucentDark,
        cursor: "pointer",
      },
    }),
  })
);
