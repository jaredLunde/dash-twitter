import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import NextLink from "next/link";
import type { LinkProps } from "next/link";
import * as React from "react";
import { Icon } from "@/components/icon";
import { mq, ResponsiveProp, styles } from "@/styles";
import { box, grid } from "@/styles/layout";
import { separator } from "@/styles/separator";

export const DropdownMenu = {
  ...RadixDropdownMenu,
  Content: React.forwardRef<
    HTMLDivElement,
    PropsOf<typeof RadixDropdownMenu.Content> & {
      width?: string | number | ResponsiveProp<string | number>;
    }
  >(function DropdownMenuContent({ width, ...props }, ref) {
    return (
      <RadixDropdownMenu.Content
        {...props}
        avoidCollisions={false}
        className={clsx(props.className, box({ width }), dropdownMenuContent())}
        ref={ref}
      />
    );
  }),

  Item: React.forwardRef<
    HTMLDivElement,
    PropsOf<typeof RadixDropdownMenu.Item>
  >(function DropdownMenuItem(props, ref) {
    return (
      <RadixDropdownMenu.Item
        {...props}
        className={clsx(props.className, dropdownMenuItem())}
        ref={ref}
      />
    );
  }),

  ItemLink: React.forwardRef<
    HTMLDivElement,
    PropsOf<typeof RadixDropdownMenu.Item> & Omit<LinkProps, "passHref">
  >(function DropdownMenuItem(
    { as, href, locale, prefetch, replace, scroll, shallow, ...props },
    ref
  ) {
    return (
      <NextLink
        as={as}
        href={href}
        locale={locale}
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref
      >
        <RadixDropdownMenu.Item
          {...props}
          as={"a" as any}
          className={clsx(props.className, dropdownMenuItem())}
          onSelect={props.onSelect ?? ((e) => e.preventDefault())}
          ref={ref}
        />
      </NextLink>
    );
  }),

  IconItem: React.forwardRef<
    HTMLDivElement,
    PropsOf<typeof RadixDropdownMenu.Item> & { src: string }
  >(function DropdownMenuItem({ children, src, ...props }, ref) {
    return (
      <RadixDropdownMenu.Item
        {...props}
        className={clsx(props.className, dropdownMenuIconItem())}
        ref={ref}
      >
        <Icon src={src} size="1.25em" />
        <span>{children}</span>
      </RadixDropdownMenu.Item>
    );
  }),

  IconItemLink: React.forwardRef<
    HTMLDivElement,
    PropsOf<typeof RadixDropdownMenu.Item> &
      Omit<LinkProps, "passHref"> & { src: string }
  >(function DropdownMenuItem(
    {
      as,
      href,
      locale,
      prefetch,
      replace,
      scroll,
      shallow,
      src,
      children,
      ...props
    },
    ref
  ) {
    return (
      <NextLink
        as={as}
        href={href}
        locale={locale}
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref
      >
        <RadixDropdownMenu.Item
          {...props}
          as={"a" as any}
          className={clsx(props.className, dropdownMenuIconItem())}
          onSelect={props.onSelect ?? ((e) => e.preventDefault())}
          ref={ref}
        >
          <Icon src={src} size="1.25em" />
          <span>{children}</span>
        </RadixDropdownMenu.Item>
      </NextLink>
    );
  }),

  Arrow: React.forwardRef<
    SVGSVGElement,
    PropsOf<typeof RadixDropdownMenu.Arrow>
  >(function DropdownMenuArrow(props, ref) {
    return (
      <RadixDropdownMenu.Arrow
        {...props}
        className={clsx(props.className, dropdownMenuArrow())}
        ref={ref}
      />
    );
  }),

  Separator: React.forwardRef<
    HTMLDivElement,
    PropsOf<typeof RadixDropdownMenu.Separator>
  >(function DropdownMenuArrow(props, ref) {
    return (
      <RadixDropdownMenu.Separator
        {...props}
        className={clsx(props.className, separator())}
        ref={ref}
      />
    );
  }),
};

export const dropdownMenuContent = styles.one((t) => ({
  borderRadius: t.radius.md,
  boxShadow: t.shadow.lg,
  backgroundColor: t.color.bodyBg,
  border: `${t.borderWidth.hairline} solid ${t.color.accent}`,
  "> :first-child": {
    borderRadius: `${t.radius.md} ${t.radius.md} 0 0`,
  },
  "> :last-child": {
    borderRadius: `0 0 ${t.radius.md} ${t.radius.md}`,
  },
}));

export const dropdownMenuArrow = styles.one((t) => ({
  polygon: {
    boxShadow: t.shadow.lg,
    fill: t.color.bodyBg,
  },
}));

export const dropdownMenuItem = styles.one(
  mq({
    default: (t) => ({
      textAlign: "left",
      padding: "1em",
      color: t.color.text,

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

export const dropdownMenuIconItem = () =>
  clsx(
    dropdownMenuItem(),
    grid({ cols: ["max-content", "auto"], gap: "lg", alignY: "center" })
  );

export interface DropdownMenuItemProps {}
