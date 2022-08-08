import React from "react";
import ReactDOM from "react-dom";

import Zoom from './component/Zoom';

import "./index.css";

const App = () => (
  <div className="App">
     <main>
        <h1>Zoom Meeting SDK Sample React</h1>

          <Zoom/>
      </main>
  </div>
);
ReactDOM.render(<React.StrictMode> <App /></React.StrictMode>, document.getElementById('root'));

