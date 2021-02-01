import { useContext } from 'react';
import ThemeContext from '../contexts/theme_context';

export function useTheme() {
  const { theme, setTheme } = useContext(ThemeContext);
  if (!theme) {
    throw new Error(
      'theme must be set using ThemeContext.Provider  before using'
    );
  }
  const toggleTheme = () =>
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));

  return { toggleTheme, isLightMode: theme === 'light' };
}
