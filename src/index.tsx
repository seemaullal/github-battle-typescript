import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ThemeContext, { themeType } from './contexts/theme_context';
import Navigation from './components/navigation';
import './styles.scss';

function App() {
  const [theme, setTheme] = useState<themeType>('light');
  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
        <div className={theme}>
          <div className="container">
            <Navigation />
            <Switch>
              <Route exact path="/">
                Hello
              </Route>
              <Route exact path="/battle">
                Battle
              </Route>
            </Switch>
          </div>
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
