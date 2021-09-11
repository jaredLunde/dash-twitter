import { resetVendorButtonStyles } from "../button";
import { DropdownMenu } from "@/components/dropdown-menu";
import { Icon } from "@/components/icon";
import { mq, styles } from "@/styles";

export function Footer() {
  return (
    <footer className={footerStyles()}>
      <a
        href="https://twitter.com/en/tos"
        target="_blank"
        rel="noopener noreferrer"
      >
        Terms of Service
      </a>
      <a
        href="https://twitter.com/en/privacy"
        target="_blank"
        rel="noopener noreferrer"
      >
        Privacy Policy
      </a>
      <a
        href="https://help.twitter.com/en/rules-and-policies/twitter-cookies"
        target="_blank"
        rel="noopener noreferrer"
      >
        Cookie Policy
      </a>
      <a
        href="https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=adsinfo"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ads info
      </a>
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger>
          More <Icon src="/icons/more-horizontal.svg" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content side="top" align="end">
          <DropdownMenu.ItemExternalLink
            href="https://about.twitter.com/en"
            target="_blank"
            rel="noopener noreferrer"
          >
            About
          </DropdownMenu.ItemExternalLink>
          <DropdownMenu.ItemExternalLink
            href="https://status.twitterstat.us/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Status
          </DropdownMenu.ItemExternalLink>
          <DropdownMenu.ItemExternalLink
            href="https://business.twitter.com/?ref=web-twc-ao-gbl-twitterforbusiness&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=twitterforbusiness"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter for Business
          </DropdownMenu.ItemExternalLink>
          <DropdownMenu.ItemExternalLink
            href="https://developer.twitter.com/en"
            target="_blank"
            rel="noopener noreferrer"
          >
            Developers
          </DropdownMenu.ItemExternalLink>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <span>© 2021 Twitter, Inc.</span>
    </footer>
  );
}

const footerStyles = styles.one(
  mq({
    default: (t) => ({
      fontSize: t.font.size.xs,
      textAlign: "left",
      padding: `0 ${t.pad.md}`,
      color: t.color.textAccentLight,

      button: {
        ...resetVendorButtonStyles,
        verticalAlign: "baseline",
        userSelect: "text",
      },

      "a,button": {
        color: t.color.textAccentLight,
        whiteSpace: "pre",
      },

      "& > *": {
        marginRight: t.gap.md,
      },
    }),
    hover: {
      "a:hover,button:hover": {
        textDecoration: "underline",
        cursor: "pointer",
      },
    },
  })
);
