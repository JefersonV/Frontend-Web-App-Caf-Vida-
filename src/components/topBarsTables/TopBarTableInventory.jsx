import React from "react";
import "../../assets/styles/Sales.css";
import { useSearcherContext } from "../../providers/SidebarProvider";

const TopBarTableInventory = () => {
  //Función de búsqueda
  const searcher = useSearcherContext();
  return (
    <>
      <h1 className="top-bar-title">Resumen del Movimiento de Inventario</h1>
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
            disabled
            onChange={searcher}
          /> */}
        </div>
      </div>
    </>
  );
};

export default TopBarTableInventory;
