import { mq, styles } from "@/styles";

export const tabs = {
  tabList: styles({
    default: {
      display: "flex",
      flexWrap: "nowrap",
      scrollPadding: 36,
      scrollSnapType: "x mandatory",
      overflowY: "hidden",
      overflowX: "auto",
      msOverflowStyle: "none",
      scrollbarWidth: "none",
      "::-webkit-scrollbar": {
        display: "none",
      },
      transform: "translate3d(0px, 0px, 0px)",
      alignItems: "stretch",
      flexGrow: 0,
      flexShrink: 1,

      "& > *": {
        flexShrink: 0,
      },
    },

    withBorder: (t) => ({
      borderBottom: `${t.borderWidth.hairline} solid ${t.color.accent}`,
    }),
  }),

  tab: styles.one(
    mq({
      default: (t) => ({
        fontWeight: 600,
        color: t.color.textAccentLight,
        flexGrow: 1,
        flexShrink: 0,
        height: 53,
        minWidth: 56,
        padding: `0 ${t.pad.md}`,

        "&[aria-selected=true]": {
          color: t.color.text,
        },
        "&[aria-disabled=true]": {
          color: t.color.textAccentLight,
          opacity: 0.5,
        },
      }),
      hover: (t) => ({
        ":hover": {
          backgroundColor: t.color.accent,
          cursor: "pointer",
        },

        "&[aria-selected=true]": {
          ":hover": {},
        },
        "&[aria-disabled=true]": {
          ":hover": {
            cursor: "not-allowed",
          },
        },
      }),
    })
  ),

  tabText: styles.one((t) => ({
    display: "inline-grid",
    alignItems: "center",
    alignSelf: "stretch",
    justifySelf: "center",
    height: "100%",
    padding: 0,

    "[aria-selected=true] &": {
      "::after": {
        content: '""',
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        borderRadius: t.radius.full,
        backgroundColor: t.color.primary,
        height: 4,
      },
    },
  })),
};
