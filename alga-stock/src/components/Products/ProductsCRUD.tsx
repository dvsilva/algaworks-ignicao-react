import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Swal from "sweetalert2";

import {
  createSingleProduct,
  deleteSingleProduct,
  // getAllProducts,
  updateSingleProduct,
} from "../../services/Products.service";

import { Product } from "../../shared/Table/Table.mockdata";
import Table, { TableHeader } from "../../shared/Table";
import ProductForm, { ProductCreator } from "../Products/ProductForm";
import {
  getProducts,
  insertNewProduct,
} from "../../redux/Products/Products.action";

const headers: TableHeader[] = [
  { key: "id", value: "#" },
  { key: "name", value: "Product" },
  { key: "price", value: "Price", right: true },
  { key: "stock", value: "Available Stock", right: true },
];

declare interface ProductsCRUDProps {
  products: Product[];
}

const ProductsCRUD: React.FC<ProductsCRUDProps> = (props) => {
  const dispatch = useDispatch();

  // const [products, setProducts] = useState([Products]);
  // const [products, setProducts] = useState<Product[]>([]);

  const [updatingProduct, setUpdatingProduct] = useState<Product | undefined>(
    undefined
  );

  async function fetchData() {
    // const _products = await getAllProducts();
    // setProducts(_products);

    try {
      await dispatch(getProducts());
      Swal.fire("Uhul!", "Fetch done", "success");
    } catch (err) {
      Swal.fire("Oops!", err.message, "error");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleProductSubmit = async (product: ProductCreator) => {
    // console.log(product);
    /**
    setProducts([
      ...products,
      { _id: String(products.length + 1), ...product },
    ]);
     */
    try {
      // await createSingleProduct(product);
      dispatch(insertNewProduct(product));
      fetchData();
    } catch (err) {
      Swal.fire("Oops!", err.message, "error");
    }
  };

  const handleProductUpdate = async (newProduct: Product) => {
    // console.log(newProduct);
    /**
    setProducts(
      products.map((product) =>
        product._id === newProduct._id ? newProduct : product
      )
    );
    */
    try {
      await updateSingleProduct(newProduct);
      setUpdatingProduct(undefined);
      fetchData();
    } catch (err) {
      Swal.fire("Oops!", err.message, "error");
    }
  };

  const handleProductEdit = (product: Product) => {
    // console.table(product);
    setUpdatingProduct(product);
  };

  const deleteProduct = async (id: string) => {
    // console.log(id);
    // setProducts(products.filter((product) => product._id !== id));

    try {
      await deleteSingleProduct(id);
      fetchData();
      Swal.fire("Uhul!", "Product successfully deleted", "success");
    } catch (err) {
      Swal.fire("Oops!", err.message, "error");
    }
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
    <>
      <Table
        data={props.products}
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
    </>
  );
};

const mapStateToProps = (state: any) => ({
  products: state.products,
});

export default connect(mapStateToProps)(ProductsCRUD);
