import React from "react";
import logo from "../../logo.svg";
import "./App.css";

// import TestComponent from "./components/TestComponent/TestComponent";
import TestComponent from "../TestComponent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Ola, Mundo!</p>
        <TestComponent />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;