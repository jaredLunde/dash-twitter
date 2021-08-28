import { useAtom } from "jotai";
import type { NextPage } from "next";
import { Button } from "@/components/button";
import { themeAtom } from "@/styles";
import { row } from "@/styles/layout";
import { skeleton } from "@/styles/skeleton";

const Home: NextPage = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <div className={row({ pad: "lg", gap: "lg", align: "center" })}>
      Hello
      <div className={skeleton({ size: 20, variant: "circle" })} />
      <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Tweet
      </Button>
    </div>
  );
};

export default Home;
