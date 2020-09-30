import React, { useState } from "react";
import Button from "../../shared/Button";
import Container from "../../shared/Container";
import Input from "../../shared/Input";
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
  const [street, setStreet] = useState("");

  return (
    <div className="App">
      <Header title="AlgaStock" />

      <Container>
        <Button content="Click me" onClick={() => window.alert("alert")} />
        <Button onClick={() => window.alert("alert button 1")}>Alert</Button>
        <Button
          onClick={() => window.alert("alert button 2")}
          appendIcon={<TestComponent />}
        >
          Alert
        </Button>
        <Input
          label="Street"
          placeholder="E.g.: 15th avenue"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
      </Container>
    </div>
  );
}

export default App;
