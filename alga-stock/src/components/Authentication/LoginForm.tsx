import React, { useState } from "react";
import Button from "../../shared/Button";
import Form from "../../shared/Form";
import Input from "../../shared/Input";

const LoginForm = () => {
  const [form, setForm] = useState({
    user: "",
    password: "",
  });

  const handleLogin = () => {
    console.table(form);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <Form title="Login - AlgaStock" onSubmit={handleLogin}>
      <Input
        label="User"
        name="user"
        placeholder="E.g.: your_name321"
        value={form.user}
        onChange={handleInputChange}
      />
      <Input
        type="password"
        name="password"
        label="Password"
        value={form.password}
        onChange={handleInputChange}
      />
      <Button>Login</Button>
    </Form>
  );
};

export default LoginForm;
