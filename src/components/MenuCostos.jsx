import React from "react";
import "../assets/styles/MenuCostos.css";
import { Link } from "react-router-dom";
import { useSidebarContext } from "../providers/SidebarProvider";
import TableMaterial from "./TableMenu/TableMaterial";
import TablePacking from "./TableMenu/TablePacking";
import TableService from "./TableMenu/TableService";

const MenuCostos = () => {
  //const url ='http://localhost:4000/menu_costo';
  const sidebar = useSidebarContext();
  //const dataApi = useFetch(url);
  return (
    <>
      {/**Sirve para que se adapte respecto a la sidebar */}
      <div className={sidebar === true ? "wrapper" : "side"}>
        <div className="ContenidoM">
          <label htmlFor="lab" id="labelTitle">
            Costo Actual de los servicios y materias
          </label>
          <Link to="/production_cost" className="link5">
            {" "}
            Costo de Producción
          </Link>
          <hr />
        </div>
        <TableMaterial />
        <TablePacking />
        <TableService />
      </div>
    </>
  );
};

export default MenuCostos;
