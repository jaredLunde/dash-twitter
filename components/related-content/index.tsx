import NextLink from "next/link";
import * as React from "react";
import { mq, styles } from "@/styles";

export function RelatedContent({
  heading,
  showMoreHref,
  children,
  ...props
}: RelatedContentProps) {
  return (
    <aside
      className={relatedContent()}
      aria-label={
        props["aria-label"] ??
        (typeof heading === "string" ? heading : undefined)
      }
    >
      <h2 aria-level={2}>{heading}</h2>
      <div>{children}</div>
      {showMoreHref && (
        <NextLink href={showMoreHref}>
          <a className={relatedContentShowMore()}>Show more</a>
        </NextLink>
      )}
    </aside>
  );
}

export interface RelatedContentProps {
  "aria-label"?: string;
  heading: string;
  showMoreHref?: string;
  children: React.ReactNode;
}

export const relatedContent = styles.one((t) => ({
  backgroundColor: t.color.accent,
  borderRadius: t.radius.secondary,
  textAlign: "left",
  contain: "layout",

  "> :first-child": {
    borderRadius: `${t.radius.secondary} ${t.radius.secondary} 0  0`,
  },

  "> :last-child": {
    borderRadius: `0  0 ${t.radius.secondary} ${t.radius.secondary}`,
  },

  "> h2": {
    padding: t.pad.md,
    paddingBottom: t.pad.sm,
    fontWeight: 900,
    fontSize: t.font.size.xl,
    lineHeight: t.font.leading.tight,
  },
}));

export const relatedContentItem = styles.one(
  mq({
    default: (t) => ({
      display: "inline-block",
      width: "100%",
      padding: `1em ${t.pad.md}`,
    }),
    hover: (t) => ({
      ":hover": {
        cursor: "pointer",
        backgroundColor: t.color.translucentPrimary,
      },
    }),
  })
);

export const relatedContentShowMore = styles.one(
  mq({
    default: (t) => ({
      display: "inline-block",
      width: "100%",
      padding: t.pad.md,
      color: t.color.primary,
    }),
    hover: (t) => ({
      ":hover": {
        backgroundColor: t.color.translucentPrimary,
      },
    }),
  })
);
