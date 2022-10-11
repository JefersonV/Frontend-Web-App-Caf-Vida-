import React, { Fragment, useState, useEffect } from "react";

import SideBarMenu from "../components/SideBarMenu";

const Home = ({ setAuth }) => {
  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:3000/home/", {
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
    <Fragment>
      <SideBarMenu />
      <h1>Home</h1>
      <button className="" onClick={(e) => logout(e)}>
        Cerar Sesion
      </button>
    </Fragment>
  );
};

export default Home;
