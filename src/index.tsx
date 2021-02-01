import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import ThemeContext, { themeType } from './contexts/theme_context';
import Navigation from './components/navigation';
import './styles.scss';

function App() {
  const [theme, setTheme] = useState<themeType>('light');
  return (
    <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
      <div className={theme}>
        <Navigation />
      </div>
    </ThemeContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
