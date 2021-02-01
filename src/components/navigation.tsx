import { useTheme } from '../hooks/useTheme';

export default function Navigation() {
  const { isLightMode, toggleTheme } = useTheme();
  const buttonIcon = isLightMode ? '🔦' : '💡';
  return (
    <nav>
      <button
        style={{ fontSize: 30 }}
        className="btn-clear"
        onClick={toggleTheme}
      >
        {buttonIcon}
      </button>
    </nav>
  );
}
