import React from "react";
import { PrimarySidebar } from "@/components/primary-sidebar";
import { column, grid, row } from "@/styles/layout";
import { text } from "@/styles/text";

export const Dashboard = {
  Root({ children }: DashboardRootProps) {
    return (
      <div
        className={grid({
          inline: true,
          alignY: "start",
          cols: {
            min: [72, "auto"],
            sm: [88, "auto"],
            md: [88, "auto"],
            lg: [88, "auto"],
            xl: [256, "auto"],
          },
        })}
        style={{ margin: "0 auto" }}
      >
        <PrimarySidebar />
        {children}
      </div>
    );
  },

  Feed({ header, main, sidebar }: DashboardFeedProps) {
    const sidebarRef = React.useRef<HTMLDivElement>(null);
    useStickyFooter(sidebarRef);

    return (
      <main
        role="main"
        className={grid({
          cols: {
            min: ["minmax(240px, 600px)", 0],
            sm: ["minmax(240px, 600px)", 0],
            md: ["minmax(240px, 600px)", 0],
            lg: ["minmax(240px, 600px)", 324],
            xl: ["minmax(240px, 600px)", 400],
          },
        })}
      >
        <div
          className={column({
            width: "100%",
            border: [["none", "hairline", "none", "none"], "accent"],
          })}
          style={{ minHeight: "var(--vh)" }}
        >
          {header}

          <section style={{ height: 4000 }}>{main}</section>
        </div>

        <section
          ref={sidebarRef}
          className={column({
            width: "100%",
            display: { min: "none", lg: "flex" },
            position: "sticky",
            inset: [0, "auto", "auto"],
            height: "var(--vh)",
          })}
          style={{ overflow: "hidden" }}
        >
          {sidebar}
        </section>
      </main>
    );
  },

  FeedHeader({ height = 53, children }: DashboardFeedHeaderProps) {
    return (
      <header
        className={row({
          position: "sticky",
          bg: "bodyBg",
          border: [["none", "none", "hairline"], "accent"],
          width: "100%",
          height,
          align: "center",
          distribute: "between",
          inset: [0, "auto", "auto"],
          z: "high",
        })}
      >
        {children}
      </header>
    );
  },

  Heading({ children }: DashboardHeadingProps) {
    return (
      <div className={row({ pad: ["none", "md"] })}>
        <h2 className={text({ variant: "heading" })}>{children}</h2>
      </div>
    );
  },
};

function useStickyFooter(target: React.MutableRefObject<HTMLElement | null>) {
  React.useEffect(() => {
    if (!target.current) return;
    let prevScrollY = window.scrollY;

    function makeFooterSticky() {
      if (!target.current) return;
      const { scrollY } = window;
      const scrollDistance = scrollY - prevScrollY;
      target.current.scrollTop = target.current.scrollTop + scrollDistance;
      prevScrollY = scrollY;
    }
    // need to adjust the footer top when the page just loads
    // because the footer may not be sticky
    makeFooterSticky();

    // whenever the window is resized, we need to re-adjust the
    // footer top to update its position
    window.addEventListener("resize", makeFooterSticky);
    window.addEventListener("scroll", makeFooterSticky);
    return () => {
      window.removeEventListener("resize", makeFooterSticky);
      window.removeEventListener("scroll", makeFooterSticky);
    };
  }, [target]);
}

export interface DashboardRootProps {
  children: React.ReactNode;
}

export interface DashboardFeedProps {
  header?: React.ReactNode;
  main: React.ReactNode;
  sidebar: React.ReactNode;
}

export interface DashboardFeedHeaderProps {
  height?: React.ReactText;
  children: React.ReactNode;
}

export interface DashboardHeadingProps {
  children: React.ReactNode;
}
