import * as React from 'react';

export type themeType = 'light' | 'dark';

const ThemeContext = React.createContext<{
  theme: themeType;
  setTheme: React.Dispatch<React.SetStateAction<themeType>>;
}>(null!); // ThemeContext should generally only be accessed using the useTheme hook which checks that this has a non null value

export default ThemeContext;
