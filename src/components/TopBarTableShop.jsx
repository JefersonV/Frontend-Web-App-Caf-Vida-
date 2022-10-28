import React from "react";
import "../assets/styles/Sales.css";
import { useSearcherContext } from "../providers/SidebarProvider";
import { Link } from "react-router-dom";
import { FcPaid } from "react-icons/fc";
import Logo from "../assets/images/LOGO_Mesa de trabajo 1.png";

const TopBarTableShop = () => {
  //Función de búsqueda
  const searcher = useSearcherContext();
  return (
    <>
      <h1 className="top-bar-title">COMPRAS REALIZADAS</h1>
      <hr />

      <div className="barraArriba">
        {/* <div className="cont1">
          <label htmlFor="lbl1" id="lbl1">
            Visualización por:{" "}
          </label>
          <select name="select" id="select">
            <option value="">Resumen de ventas de hoy</option>
            <option value="">Resumen de ventas semanal</option>
            <option value="">Resumen de ventas mensual</option>
            <option value="">Resumen de todas las ventas</option>
          </select>
          <input
            type="search"
            placeholder="Buscar...."
            name="buscar"
            id="buscar"
            onChange={searcher}
          />
        </div> */}
        <img className="logo" src={Logo} width="100px" alt="" />
        <h4 className="frase">
          !! Aroma que te hace soñar, sabor que te hace despertar
        </h4>

        <button className="BotonParaNuevo">
          {/* <FcPaid /> */}
          <Link to="/new_shopping">
            <FcPaid /> Nueva Compra
          </Link>
        </button>
      </div>
    </>
  );
};

export default TopBarTableShop;
