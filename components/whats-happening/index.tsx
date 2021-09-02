import clsx from "clsx";
import * as React from "react";
import { useA11yButton } from "@/components/button";
import {
  RelatedContent,
  relatedContentItem,
} from "@/components/related-content";
import { styles } from "@/styles";

export function WhatsHappening({
  items = [
    {
      label:
        "Another tropical storm is named, as Ida brings rain to the northeast",
      image:
        "https://pbs.twimg.com/semantic_core_img/1398063655523020800/iVJz8jHo?format=png&name=240x240",
      topic: "Weather",
      promoted: false,
      live: true,
      createdAt: new Date(),
    },
    {
      label: "Zoloft",
      topic: "Trending in United States",
      promoted: false,
      live: false,
      tweetCount: 1734,
      createdAt: new Date(),
    },
  ],
}: WhatsHappeningProps) {
  return (
    <RelatedContent heading="What's happening?" showMoreHref="/explore">
      {items.map((item) => (
        <WhatsHappeningItem key={item.label} item={item} />
      ))}
    </RelatedContent>
  );
}

function WhatsHappeningItem({ item }: WhatsHappeningItemProps) {
  const buttonProps = useA11yButton({ onClick: () => {} });
  return (
    <div className={whatsHappeningItem()} {...buttonProps}>
      <div>
        <div className="header">
          {item.topic}{" "}
          {item.live ? <React.Fragment>&middot; LIVE</React.Fragment> : ""}
        </div>
        <h3 aria-level={3} className="label">
          {item.label}
        </h3>
        {item.tweetCount && (
          <div className="footer">
            {new Intl.NumberFormat("en-US").format(item.tweetCount)} tweets
          </div>
        )}
      </div>

      {item.image && (
        <img src={item.image} alt={item.label} height={72} width={72} />
      )}
    </div>
  );
}

const whatsHappeningItemBase = styles.one((t) => ({
  display: "grid",
  gridTemplateColumns: "auto max-content",
  gridGap: t.gap.md,
  gap: t.gap.md,

  ".header": {
    fontSize: t.font.size.xs,
    color: t.color.textAccentLight,
  },

  "h3.label": {
    fontWeight: 700,
    lineHeight: t.font.leading.normal,
  },

  ".description": {
    color: t.color.textAccentLight,
  },

  ".footer": {
    fontSize: t.font.size.xs,
    color: t.color.textAccentLight,
  },

  img: {
    borderRadius: t.radius.secondary,
  },
}));

const whatsHappeningItem = () =>
  clsx(relatedContentItem(), whatsHappeningItemBase());

export interface WhatsHappeningProps {
  items?: WhatsHappeningItem[];
}

export interface WhatsHappeningItemProps {
  item: WhatsHappeningItem;
}

export type WhatsHappeningItem = {
  label: string;
  description?: string;
  hashtag?: string;
  account?: {
    username: string;
    profileImage: string;
  };
  image?: string;
  topic?: string;
  tweetCount?: number;
  relatedItems?: string[];
  promoted: boolean;
  live: boolean;
  createdAt: Date;
};
