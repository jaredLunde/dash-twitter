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

        {sidebar}
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
        style={{ contain: "strict" }}
      >
        {children}
      </header>
    );
  },

  FeedSidebar({ children }: DashboardFeedSidebarProps) {
    const sidebarRef = React.useRef<HTMLDivElement>(null);
    const style = useSidebarScroller(sidebarRef);

    return (
      <section
        ref={sidebarRef}
        className={column({
          width: "100%",
          display: { min: "none", lg: "flex" },
        })}
        style={style}
      >
        {children}
      </section>
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

function useSidebarScroller(
  target: React.MutableRefObject<HTMLElement | null>
): React.CSSProperties {
  React.useEffect(() => {
    if (!target.current) return;
    let prevScrollY = 0;
    let animationFrame: ReturnType<typeof requestAnimationFrame>;

    function scrollSidebarInFrame() {
      if (!target.current) return;
      const { scrollY } = window;

      if (
        // basically Safari elastic scrolling is a fucking joke
        scrollY < 0 ||
        scrollY > document.body.offsetHeight - window.innerHeight
      ) {
        prevScrollY = scrollY;
        animationFrame = 0;
      }

      const scrollDistance = scrollY - prevScrollY;
      target.current.scrollTop = target.current.scrollTop + scrollDistance;
      prevScrollY = scrollY;
      animationFrame = 0;
    }

    function scrollSidebar() {
      if (animationFrame) return;
      animationFrame = requestAnimationFrame(scrollSidebarInFrame);
    }

    // Run once in case window has already scrolled
    scrollSidebarInFrame();

    // Whenever the window is resized or scrolled, we need to re-adjust the
    // footer top to update its position
    window.addEventListener("resize", scrollSidebar);
    window.addEventListener("scroll", scrollSidebar);

    return () => {
      window.removeEventListener("resize", scrollSidebar);
      window.removeEventListener("scroll", scrollSidebar);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [target]);

  return {
    position: "sticky",
    top: 0,
    overflow: "hidden",
    height: "var(--vh)",
    willChange: "scroll-position",
    contain: "strict",
  };
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

export interface DashboardFeedSidebarProps {
  children: React.ReactNode;
}

export interface DashboardHeadingProps {
  children: React.ReactNode;
}
