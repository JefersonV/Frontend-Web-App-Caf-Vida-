import React, { useState } from "react";
import { useSidebarContext } from '../providers/SidebarProvider'
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
      <h1 className="">Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="email"
          className=""
          value={email}
          onChange={(e) => onChange(e)}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="password"
          className=""
          value={password}
          onChange={(e) => onChange(e)}
        ></input>
        <button className="">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;