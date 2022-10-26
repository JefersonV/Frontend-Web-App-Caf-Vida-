import React from "react";
import "../../assets/styles/Sales.css";
import { useSearcherContext } from "../../providers/SidebarProvider";
import { Link } from "react-router-dom";
import { useState } from "react";
import ModalAddProvider from "../modals/ModalAddProvider";

const TopBarTableProvider = ({ children }) => {
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  //Función de búsqueda
  const searcher = useSearcherContext();
  return (
    <>
      <div>
        <div>
          <h1 className="top-bar-title">Proveedores Registrados</h1>
          <hr />

          <div className="barraArriba">
            <div className="cont1">
              <label htmlFor="lbl1" id="lbl1">
                Visualización por:{" "}
              </label>
              <select name="select" id="select">
                <option value="">Resumen de ventas de hoy</option>
                <option value="">Resumen de ventas semanal</option>
                <option value="">Resumen de ventas mensual</option>
                <option value="">Resumen de todas las ventas</option>
              </select>
              {/* <input
                type="search"
                placeholder="Buscar...."
                name="buscar"
                id="buscar"
                onChange={searcher}
              /> */}
            </div>
            {/* <Link to="/new" className="btn2" id="btn2">
          Agregar Nuevo
        </Link> */}
            <button
              className="btn4m"
              onClick={() => cambiarEstadoModal2(!estadoModal2)}
            >
              Agregar Nuevo
            </button>
          </div>
          {children}
        </div>
        {/* Traemos el modal y le pasamos los props */}
        <ModalAddProvider
          estado2={estadoModal2}
          cambiarEstado2={cambiarEstadoModal2}
        ></ModalAddProvider>
      </div>
    </>
  );
};

export default TopBarTableProvider;
