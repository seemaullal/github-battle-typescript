import * as React from "react";
import * as ReactDOM from "react-dom";
import { useTheme } from "./hooks/useTheme";
import "./styles.scss";

function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={theme}>
      <button onClick={toggleTheme}>Toggle theme</button>
      <div>Github battle app</div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
