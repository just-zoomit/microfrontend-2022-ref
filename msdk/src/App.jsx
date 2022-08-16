import React from "react";
import ReactDOM from "react-dom";

import Msdk from './components/Msdk';

import "./index.css";

const App = () => (
  <div className="App">
     <main>
        <h1>Zoom Meeting SDK Sample React</h1>

          <Msdk/>
      </main>
  </div>
);
ReactDOM.render( <App /> , document.getElementById('root'));

