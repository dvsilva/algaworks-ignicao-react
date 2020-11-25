import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { Product } from "../../shared/Table/Table.mockdata";
import Table, { TableHeader } from "../../shared/Table";
import ProductForm, { ProductCreator } from "../Products/ProductForm";
import * as ProductsAction from "../../redux/Products/Products.action";
import { RootState, ThunkDispatch } from "../../redux";

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
  const dispatch: ThunkDispatch = useDispatch();

  const showErrorAlert = (err: Error) =>
    Swal.fire("Oops!", err.message, "error");

  const [updatingProduct, setUpdatingProduct] = useState<Product | undefined>(
    undefined
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  async function fetchData() {
    dispatch(ProductsAction.getProducts()).catch(showErrorAlert);
  }

  const handleProductSubmit = async (product: ProductCreator) => {
    dispatch(ProductsAction.insertNewProduct(product)).catch(showErrorAlert);
  };

  const handleProductUpdate = async (newProduct: Product) => {
    await dispatch(ProductsAction.updateProduct(newProduct))
      .then(() => setUpdatingProduct(undefined))
      .catch(showErrorAlert);
  };

  const deleteProduct = async (id: string) => {
    dispatch(ProductsAction.deleteProduct(id))
      .then(() => Swal.fire("Uhul!", "Product successfully deleted", "success"))
      .catch(showErrorAlert);
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
    }).then(({ value }) => value && deleteProduct(product._id));
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
        onEdit={setUpdatingProduct}
        itensPerPage={3}
      />
      <ProductForm
        form={updatingProduct}
        onUpdate={handleProductUpdate}
        onSubmit={handleProductSubmit}
      />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  products: state.products,
});

export default connect(mapStateToProps)(ProductsCRUD);
