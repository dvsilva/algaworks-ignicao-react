import React, { useState } from "react";
import Button from "../../shared/Button";
import Form from "../../shared/Form/Form";
import Input from "../../shared/Input";
import { Product } from "../../shared/Table/Table.mockdata";

declare interface InitialFormState {
  id?: number;
  name: string;
  price: string;
  stock: string;
}

export interface ProductCreator {
  name: string;
  price: number;
  stock: number;
}

declare interface ProductFormProps {
  form?: Product;
  onSubmit?: (product: ProductCreator) => void;
  onUpdate?: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = (props) => {
  const initialFormState: InitialFormState = props.form
    ? {
        id: props.form.id,
        name: props.form.name,
        price: String(props.form.price),
        stock: String(props.form.stock),
      }
    : {
        name: "",
        price: "",
        stock: "",
      };

  const [form, setForm] = useState(initialFormState);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const updateProduct = (product: InitialFormState) => {
    const produtDto = {
      id: Number(product.id),
      name: String(form.name),
      price: parseFloat(form.price),
      stock: Number(form.stock),
    };

    props.onUpdate && props.onUpdate(produtDto);
    setForm(initialFormState);
  };

  const createProduct = (product: InitialFormState) => {
    const produtDto = {
      name: String(form.name),
      price: parseFloat(form.price),
      stock: Number(form.stock),
    };

    props.onSubmit && props.onSubmit(produtDto);
    setForm(initialFormState);
  };

  const handleFormSubmit = () => {
    // console.log(form);
    form.id ? updateProduct(form) : createProduct(form);
    setForm(initialFormState);
  };

  return (
    <Form title="Product form" onSubmit={handleFormSubmit}>
      <Input
        onChange={handleInputChange}
        value={form.name}
        name="name"
        label="Name"
        placeholder="E.g.: Cookie"
        required
      />
      <Input
        onChange={handleInputChange}
        value={form.price}
        name="price"
        label="Price"
        type="number"
        step="0.01"
        min="0"
        placeholder="E.g.: 1.25"
        required
      />
      <Input
        onChange={handleInputChange}
        value={form.stock}
        name="stock"
        label="Stock"
        type="number"
        min="0"
        placeholder="E.g.: 15"
        required
      />
      <Button>Submit</Button>
    </Form>
  );
};

export default ProductForm;
