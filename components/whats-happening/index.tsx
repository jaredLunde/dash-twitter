import clsx from "clsx";
import * as React from "react";
import { Avatar } from "@/components/avatar";
import { useA11yButton } from "@/components/button";
import { Link } from "@/components/link";
import {
  RelatedContent,
  relatedContentItem,
} from "@/components/related-content";
import { styles } from "@/styles";
import { row } from "@/styles/layout";
import { text } from "@/styles/text";

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
    {
      topic: "Trending in United States",
      label: "Rihanna",
      description:
        "Nicki Minaj shares photos on Twitter alongside Rihanna and their families Face screaming in fear",
      relatedItems: ["Nicki"],
      promoted: false,
      live: false,
      createdAt: new Date(),
    },
    {
      topic: "Trending in United States",
      label:
        "A Super Mario Bros. Mystery Box popped up in Houston. What's inside?",
      account: {
        displayName: "Chron",
        username: "Chron",
        profileImage:
          "https://pbs.twimg.com/profile_images/1311802778705113094/6PDONOJ-_400x400.png",
      },
      image:
        "https://pbs.twimg.com/media/E-23Db1XsAUkPgL?format=jpg&name=240x240",
      promoted: false,
      live: false,
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
          {item.account ? (
            <div className={row({ gap: "sm", align: "center" })}>
              <Avatar size="2xs" src={item.account.profileImage} />
              <span className={text({ color: "text", weight: "700" })}>
                {item.account.displayName}
              </span>
            </div>
          ) : (
            item.topic
          )}{" "}
          {item.live ? <React.Fragment>&middot; LIVE</React.Fragment> : ""}
        </div>
        <h3 aria-level={3} className="label">
          {item.label}
        </h3>
        {item.description && <p className="description">{item.description}</p>}
        {item.relatedItems ? (
          <div className="footer">
            Trending with{" "}
            {item.relatedItems.map((item, i, items) => (
              <Link key={item} href={"/search?vertical=trends&q=" + item}>
                {item}
                {i === items.length - 1 ? "" : ", "}
              </Link>
            ))}
          </div>
        ) : item.tweetCount ? (
          <div className="footer">
            {new Intl.NumberFormat("en-US").format(item.tweetCount)} tweets
          </div>
        ) : null}
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
  contain: "layout",

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
    displayName: string;
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
