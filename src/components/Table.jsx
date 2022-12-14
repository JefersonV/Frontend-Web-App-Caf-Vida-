import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Table.css";
import dayjs from "dayjs/esm/index.js";
import * as FcIcons from "react-icons/fc";
import { useResultsSearchContext } from "../providers/SidebarProvider";
import generateSalesCheck from "../generatePDF/salesCheck";
import generateSales from "../generatePDF/generateSales";

const Table = () => {
  //Datos del estado global
  /* ---------------------------------------------------------------------- */
  /* NOTA: se decidió dejar toda la lógica en el componente TopBarTable.jsx */
  /* ---------------------------------------------------------------------- */
  const results = useResultsSearchContext();
  let day = dayjs().format("YYYY-MM-DD");
  return (
    <>
      <button
        className="btn4m"
        onClick={() =>
          generateSales(
            results,
            "Reporte de ventas del 27/09/2022 al 30/09/2022"
          )
        }
      >
        Imprimir Reporte
      </button>
      <table className="table table-striped w-80 thead-light table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha</th>
            <th scope="col">Cliente</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Producto</th>
            <th scope="col">Método Pago</th>
            <th scope="col">Total</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* La data que trae el Hook Fetch se mapea y se creará una fila para cada item. */}
          {results.map((item, index) => {
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{dayjs(item.fecha).format("DD/MM/YYYY")}</td>
                <td>{item.cliente}</td>
                <td>{item.cantidad}</td>
                <td>{item.producto}</td>
                <td>{item.modo_pago}</td>
                <td>Q.{item.total.toFixed(2)}</td>
                <td>
                  <button
                    onClick={
                      () => generateSalesCheck(item) /* console.log(item) */
                    }
                  >
                    <Link to="#">
                      <FcIcons.FcPrint
                        className="icon-print icon-table"
                        title="Imprimir factura de la venta"
                      />
                    </Link>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
