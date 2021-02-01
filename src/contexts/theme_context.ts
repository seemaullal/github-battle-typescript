import * as React from 'react';

export type themeType = 'light' | 'dark';

interface currentTheme {
  theme: themeType;
  setTheme: React.Dispatch<React.SetStateAction<themeType>>;
}

const ThemeContext = React.createContext<currentTheme>(null!);

export default ThemeContext;
