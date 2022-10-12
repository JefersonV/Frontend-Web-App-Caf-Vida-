import React, { Fragment, useState } from "react";
import "../assets/styles/Login.css";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };

      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      localStorage.setItem("token", parseRes.token);

      setAuth(true);
    } catch (err) {
      console.error(err.massage);
    }
  };

  return (
    <Fragment>
      <div class="login-box">
        <h2>Login</h2>
        <form onSubmit={onSubmitForm}>
          <div class="user-box">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            ></input>
            <label>Correo Electrónico</label>
          </div>
          <div class="user-box">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
            ></input>
            <label>Contraseña</label>
          </div>
          <div class="button-form">
            <button class="btn">Ingresar</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
