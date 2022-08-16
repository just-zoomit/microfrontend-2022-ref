import React from "react";
import ReactDOM from "react-dom";

import { Counter } from 'counter/Counter';
import { Msdk } from 'msdk/Msdk';

import "./index.css";

const App = () => (
  <div className="container">
    <h1>Container App</h1>
    <Counter />
    <Msdk />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
