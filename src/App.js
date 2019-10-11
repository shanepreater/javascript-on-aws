import React from 'react';
import logo from './logo.png';
import './App.css';
import {ToDoContainer} from "./ToDoContainer";

function App() {
  return (
    <div className="App" id="app">
      <header className="App-header" id="main-header">
        <a href="https://www.shanepreater.dev/"><img src={logo} className="App-logo" alt="logo" /></a>
      </header>
      <body id="main-content">
        <h3>Sample TODO App</h3>
        <ToDoContainer/>
      </body>
    </div>
  );
}

export default App;
