import React from 'react';
import logo from './logo.png';
import './App.css';
import {ToDoContainer} from "./ToDoContainer";

function App() {
  return (
    <div className="App" id="app">
      <header className="App-header" id="main-header">
        <a href="https://www.shanepreater.dev/"><img src={logo} className="App-logo" alt="logo" /></a>
        <h3>Sample TODO App</h3>
        <ToDoContainer/>
      </header>
    </div>
  );
}

export default App;
