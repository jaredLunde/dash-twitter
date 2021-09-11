import clsx from "clsx";
import * as React from "react";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import {
  RelatedContent,
  relatedContentItem,
} from "@/components/related-content";
import { styles } from "@/styles";
import { column, grid, row } from "@/styles/layout";
import { text } from "@/styles/text";

export function WhoToFollow({
  items = [
    {
      account: {
        displayName: "Chron",
        username: "Chron",
        profileImage:
          "https://pbs.twimg.com/profile_images/1311802778705113094/6PDONOJ-_400x400.png",
      },
      promoted: true,
      createdAt: new Date(),
    },
    {
      account: {
        displayName: "To The Stars Academy",
        username: "TTSAcademy",
        profileImage:
          "https://pbs.twimg.com/profile_images/938468407434911744/sErAwTT6_400x400.jpg",
      },
      promoted: false,
      createdAt: new Date(),
    },
    {
      account: {
        displayName: "Robin Hanson",
        username: "robinhanson",
        profileImage:
          "https://pbs.twimg.com/profile_images/1433888841342062609/aWQKgDF4_400x400.jpg",
      },
      promoted: false,
      createdAt: new Date(),
    },
  ],
}: WhoToFollowProps) {
  return (
    <RelatedContent heading="Who to follow" showMoreHref="/i/connect_people">
      {items.map((item) => (
        <WhoToFollowItem key={item.account.username} item={item} />
      ))}
    </RelatedContent>
  );
}

function WhoToFollowItem({ item }: WhoToFollowItemProps) {
  return (
    <div className={whoToFollowItem()}>
      <div
        className={grid({
          gap: "md",
          cols: ["max-content", "1fr"],
          alignY: "center",
        })}
      >
        <Avatar size="md" src={item.account.profileImage} />
        <div className={column()}>
          <span
            className={text({
              color: "text",
              weight: "700",
              leading: "snug",
            })}
          >
            {item.account.displayName}
          </span>
          <span className={text({ color: "textAccentLight", leading: "snug" })}>
            @{item.account.username}
          </span>
        </div>
      </div>
      <Button variant="solid" color="secondary">
        Follow
      </Button>
      {item.promoted && (
        <div
          className={grid({
            gap: "md",
            cols: ["max-content", "1fr"],
            alignY: "center",
          })}
        >
          <div style={{ width: 48 }} />
          <div
            className={clsx(
              text({ color: "textAccentLight", size: "xs" }),
              row({ gap: "sm", align: "center" })
            )}
          >
            <Icon src="/icons/bold/external-link.svg" />
            <span>Promoted</span>
          </div>
        </div>
      )}
    </div>
  );
}

const whoToFollowItemBase = styles.one((t) => ({
  display: "grid",
  gridTemplateColumns: "auto max-content",
  columnGap: t.gap.md,
  alignItems: "center",
  contain: "layout",
}));

const whoToFollowItem = () => clsx(relatedContentItem(), whoToFollowItemBase());

export interface WhoToFollowProps {
  items?: WhoToFollowItem[];
}

export interface WhoToFollowItemProps {
  item: WhoToFollowItem;
}

export type WhoToFollowItem = {
  account: {
    displayName: string;
    username: string;
    profileImage: string;
  };
  promoted: boolean;
  createdAt: Date;
};
