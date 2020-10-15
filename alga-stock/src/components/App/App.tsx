import React from "react";
import Container from "../../shared/Container";
import Table, { TableHeader } from "../../shared/Table";
import Products from "../../shared/Table/Table.mockdata";
import Header from "../Header";
import ProductForm from "../Products/ProductForm";
import "./App.css";

const headers: TableHeader[] = [
  { key: "id", value: "#" },
  { key: "name", value: "Product" },
  { key: "price", value: "Price", right: true },
  { key: "stock", value: "Available Stock", right: true },
];

function App() {
  return (
    <div className="App">
      <Header title="AlgaStock" />

      <Container>
        <Table data={Products} headers={headers} />

        <ProductForm />
      </Container>
    </div>
  );
}

export default App;
