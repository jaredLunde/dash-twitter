import { useAtom } from "jotai";
import type { NextPage } from "next";
import { themeAtom } from "@/styles";
import { skeleton } from "@/styles/skeleton";

const Home: NextPage = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <div>
      Hello
      <div className={skeleton({ size: 20, variant: "circle" })} />
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" ? "Dark" : "Light"}
      </button>
    </div>
  );
};

export default Home;
