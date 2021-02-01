import { useTheme } from '../hooks/useTheme';

export default function Navigation() {
  const { isLightMode, toggleTheme } = useTheme();
  const buttonIcon = isLightMode ? '🔦' : '💡';
  return (
    <nav>
      <button className="theme-btn" onClick={toggleTheme}>
        {buttonIcon}
      </button>
    </nav>
  );
}
