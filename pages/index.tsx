import { useAtom } from "jotai";
import type { NextPage } from "next";
import { themeAtom } from "@/styles";
import { row } from "@/styles/layout";
import { skeleton } from "@/styles/skeleton";

const Home: NextPage = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <div className={row({ pad: "lg", gap: "lg", align: "center" })}>
      Hello
      <div className={skeleton({ size: 20, variant: "circle" })} />
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" ? "Dark" : "Light"}
      </button>
    </div>
  );
};

export default Home;
