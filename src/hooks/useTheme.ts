import { useState } from 'react';

export function useTheme() {
  type themeType = 'light' | 'dark';
  const [theme, setTheme] = useState<themeType>('light');
  const toggleTheme = () =>
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));

  return { theme, toggleTheme };
}
