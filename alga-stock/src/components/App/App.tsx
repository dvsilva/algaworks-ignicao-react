import React from "react";
import Button from "../Button";
import Header from "../Header";
import "./App.css";

function TestComponent() {
  return (
    <img
      width="16"
      src="https://img.icons8.com/pastel-glyph/2x/search--v2.png"
      alt="search icon"
    />
  );
}

function App() {
  return (
    <div className="App">
      <Header title="AlgaStock" />

      <div className="Container">
        <Button content="Click me" onClick={() => window.alert("alert")} />
        <Button onClick={() => window.alert("alert button 1")}>Alert</Button>
        <Button
          onClick={() => window.alert("alert button 2")}
          appendIcon={<TestComponent />}
        >
          Alert
        </Button>
      </div>
    </div>
  );
}

export default App;
