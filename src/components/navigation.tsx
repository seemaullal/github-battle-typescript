import { useTheme } from '../hooks/useTheme';
import { NavLink } from 'react-router-dom';
import { CSSProperties } from 'react';

export default function Navigation() {
  const { isLightMode, toggleTheme } = useTheme();
  const buttonIcon = isLightMode ? '🔦' : '💡';
  const activeStyle: CSSProperties = { color: 'magenta' };
  return (
    <nav className="row space-between">
      <ul className="row nav">
        <li>
          <NavLink
            to="/"
            exact
            activeClassName="highlighted-link"
            className="nav-link"
          >
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/battle"
            exact
            activeClassName="highlighted-link"
            className="nav-link"
          >
            Battle
          </NavLink>
        </li>
      </ul>
      <button className="theme-btn" onClick={toggleTheme}>
        {buttonIcon}
      </button>
    </nav>
  );
}
