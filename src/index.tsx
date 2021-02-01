import { useState, Suspense, lazy } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ThemeContext, { themeType } from './contexts/theme_context';
import Navigation from './components/navigation';
import Loading from './components/loading';
import './styles.scss';

const Popular = lazy(() => import('./components/popular'));
const Battle = lazy(() => import('./components/battle'));
const Results = lazy(() => import('./components/results'));

function App() {
  const [theme, setTheme] = useState<themeType>('light');
  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
        <div className={theme}>
          <div className="container">
            <Navigation />
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path="/" component={Popular} />
                <Route exact path="/battle" component={Battle} />
                <Route exact path="/battle/results" component={Results} />
                {/* redirect back to homepage if no matching route */}
                <Route>
                  <Redirect to="/" />
                </Route>
              </Switch>
            </Suspense>
          </div>
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
