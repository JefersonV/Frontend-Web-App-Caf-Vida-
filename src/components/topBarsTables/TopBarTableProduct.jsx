import React from "react";
import "../../assets/styles/Sales.css";
import { useSearcherContext } from "../../providers/SidebarProvider";
import Logo from "../../assets/images/LOGO_Mesa de trabajo 1.png";
import { useState } from "react";
import ModalAddProduct from "../modals/ModalAddProduct";

const TopBarTableProduct = ({ children }) => {
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  //Función de búsqueda
  const searcher = useSearcherContext();
  return (
    <>
      <div>
        <div>
          <h1 className="top-bar-title">Producto Disponible</h1>
          <hr />

          <div className="barraArriba">
            <img className="logo" src={Logo} width="100px" alt="" />
            <h4 className="frase">
              !! Aroma que te hace soñar, sabor que te hace despertar
            </h4>
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
        <ModalAddProduct
          estado2={estadoModal2}
          cambiarEstado2={cambiarEstadoModal2}
        ></ModalAddProduct>
      </div>
    </>
  );
};

export default TopBarTableProduct;