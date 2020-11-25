import React, { useState } from "react";
import Button from "../../shared/Button";
import Form from "../../shared/Form";
import Input from "../../shared/Input";
import * as AuthenticationAction from "../../redux/Authentication/Authentication.action";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "../../redux";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const dispatch: ThunkDispatch = useDispatch();

  const [form, setForm] = useState({
    user: "",
    pass: "",
  });

  const history = useHistory();

  const handleLogin = async () => {
    // console.table(form);

    try {
      await dispatch(AuthenticationAction.login(form));
      history.push("/");
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    }
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
        name="pass"
        label="Password"
        value={form.pass}
        onChange={handleInputChange}
      />
      <Button>Login</Button>
    </Form>
  );
};

export default LoginForm;
