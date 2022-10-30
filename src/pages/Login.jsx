import React, { useState } from "react";
import { useSidebarContext } from '../providers/SidebarProvider'
import '../assets/styles/Login.css'
const Login = ({ setAuth }) => {
  const sidebar = useSidebarContext()
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
    <div className={sidebar ? "wrapper" : "side"}>
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={onSubmitForm}>
          <div className="user-box">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            ></input>
            <label>Correo Electrónico</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
            ></input>
            <label>Contraseña</label>
          </div>
          <div className="button-form">
            <button className="btn" id="btn-login">Ingresar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;