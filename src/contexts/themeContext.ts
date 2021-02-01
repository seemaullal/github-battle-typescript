import * as React from "react";
export type themeType = "light" | "dark";

const ThemeContext = React.createContext<themeType>("light");

export default ThemeContext;
export const ThemeConsumer = ThemeContext.Consumer;
export const ThemeProvider = ThemeContext.Provider;
