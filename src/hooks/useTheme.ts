import { useContext, useState } from "react";
import ThemeContext, {
  themeType,
  ThemeProvider,
  ThemeConsumer,
} from "../contexts/themeContext";

export function useTheme() {
  const themeContext = useContext<themeType>(ThemeContext);
  const [theme, setTheme] = useState<themeType>("light");
  const toggleTheme = () =>
    setTheme((theme) => (theme === "light" ? "dark" : "light"));

  return { theme, toggleTheme };
}
