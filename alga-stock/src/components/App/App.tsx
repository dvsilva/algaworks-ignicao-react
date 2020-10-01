import React from "react";
import Container from "../../shared/Container";
import Header from "../Header";
import Table from "../Table";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header title="AlgaStock" />

      <Container>
        <Table data={} />
      </Container>
    </div>
  );
}

export default App;
