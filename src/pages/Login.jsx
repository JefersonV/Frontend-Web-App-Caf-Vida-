import React, { useState } from "react";
import PropTypes from "prop-types";

//Funcion para realizar la peticion POST a la API
function loginUser(credentials) {
  //Se imprimen las credenciales para las pruebas
  console.log(JSON.stringify(credentials));

  //Petición
  return fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "aplication/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const Login = ({ setToken }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  //Funcion para controlar el evento submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Para capturar el resultado de la peticion
    const token = await loginUser({
      email,
      password,
    });
    //Se imprime el resultado de la peticion
    console.log(token);
    setToken(token);
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
