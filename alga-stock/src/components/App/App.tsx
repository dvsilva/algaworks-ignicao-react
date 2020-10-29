import React, { useState } from "react";
import Container from "../../shared/Container";
import Table, { TableHeader } from "../../shared/Table";
import Products, { Product } from "../../shared/Table/Table.mockdata";
import Header from "../Header";
import ProductForm, { ProductCreator } from "../Products/ProductForm";
import "./App.css";

const headers: TableHeader[] = [
  { key: "id", value: "#" },
  { key: "name", value: "Product" },
  { key: "price", value: "Price", right: true },
  { key: "stock", value: "Available Stock", right: true },
];

function App() {
  const [products, setProducts] = useState(Products);

  const handleProductSubmit = (product: ProductCreator) => {
    // console.log(product);
    setProducts([...products, { id: products.length + 1, ...product }]);
  };

  const handleProductUpdate = (newProduct: Product) => {
    console.log(newProduct);
    setProducts(
      products.map((product) =>
        product.id === newProduct.id ? newProduct : product
      )
    );
  };

  return (
    <div className="App">
      <Header title="AlgaStock" />

      <Container>
        <Table data={products} headers={headers} />
        <ProductForm
          form={products[0]}
          onUpdate={handleProductUpdate}
          onSubmit={handleProductSubmit}
        />
      </Container>
    </div>
  );
}

export default App;
