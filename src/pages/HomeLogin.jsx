import React, { Fragment, useState, useEffect } from "react";
import Home from "./Home";
import SideBarMenu from "../components/SideBarMenu";

const HomeLogin = ({ setAuth }) => {
  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:4000/home/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      console.log(parseRes);
    } catch (err) {
      console.error(err.massage);
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <>
      <SideBarMenu/>
        <Home />
        <button className="" onClick={(e) => logout(e)}>
          Cerrar Sesion
        </button>
    </>
  );
};

export default HomeLogin;
