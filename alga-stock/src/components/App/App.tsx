import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getAllProducts } from "../../services/Products.service";

import Container from "../../shared/Container";
import Table, { TableHeader } from "../../shared/Table";
import { Product } from "../../shared/Table/Table.mockdata";
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
  // const [products, setProducts] = useState([Products]);
  const [products, setProducts] = useState<Product[]>([]);

  const [updatingProduct, setUpdatingProduct] = useState<Product | undefined>(
    products[0]
  );

  useEffect(() => {
    async function fetchData() {
      const _products = await getAllProducts();
      setProducts(_products);
    }

    fetchData();
  }, []);

  const handleProductSubmit = (product: ProductCreator) => {
    // console.log(product);
    setProducts([
      ...products,
      { _id: String(products.length + 1), ...product },
    ]);
  };

  const handleProductUpdate = (newProduct: Product) => {
    // console.log(newProduct);
    setProducts(
      products.map((product) =>
        product._id === newProduct._id ? newProduct : product
      )
    );

    setUpdatingProduct(undefined);
  };

  const handleProductEdit = (product: Product) => {
    // console.table(product);
    setUpdatingProduct(product);
  };

  const deleteProduct = (id: string) => {
    console.log(id);
    setProducts(products.filter((product) => product._id !== id));
  };

  const handleProductDelete = (product: Product) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#09f",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, delete ${product.name}!`,
    }).then((result: any) => {
      if (result.value) {
        //console.log("confirmed");
        deleteProduct(product._id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleProductDetail = (product: Product) => {
    Swal.fire(
      "Product details",
      `${product.name} costs $${product.price} and we have ${product.stock} available in stock`,
      "info"
    );
  };

  return (
    <div className="App">
      <Header title="AlgaStock" />

      <Container>
        <Table
          data={products}
          headers={headers}
          enableActions
          onDelete={handleProductDelete}
          onDetail={handleProductDetail}
          onEdit={handleProductEdit}
        />
        <ProductForm
          form={updatingProduct}
          onUpdate={handleProductUpdate}
          onSubmit={handleProductSubmit}
        />
      </Container>
    </div>
  );
}

export default App;
