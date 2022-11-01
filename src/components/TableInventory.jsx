import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Table.css";
import * as AiIcons from "react-icons/ai";
import * as FcIcons from "react-icons/fc";
import dayjs from 'dayjs/esm/index.js'
// import { useResultsSearchContext } from "../providers/SidebarProvider";

const TableInventory = () => {
  //Datos del estado global
  // const results = useResultsSearchContext();
  const [inventory, setInventory] = useState([])
  const getProducts = async () => {
    const response = await fetch("http://localhost:3000/inventory/products", {
      headers: {
        token: localStorage.token,
      },
    });
    console.log('respuesta')
    console.log(response)
    const data = await response.json()
    setInventory(data)  
  }
  
  useEffect(()=> {
    getProducts()
    console.log('productos fetch')
    console.log(inventory)
  }, [])
  return (
    <>
      <table className="table table-striped w-80 table-bordered ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha</th>
            <th scope="col">Responsable</th>
            <th scope="col">Tipo Operación</th>
            <th scope="col">Cliente/Proveedor</th>
            <th scope="col">Descuento</th>
            <th scope="col">Forma Pago</th>
            <th scope="col">Total Operación</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* La data que trae el Hook Fetch se mapea y se creará una fila para cada item. */}
          {inventory.map((item, index) => {
            // let fechaArray = item.fecha.split("T");
            let opcion;
            if (item.cliente == null) opcion = item.proveedor;
            else opcion = item.cliente;

            return (
              <tr key={index}>
                <th>{index + 1}</th>
                {/* <td>{fechaArray[0]}</td> */}
                <td>{dayjs(item.fecha).format('DD/MM/YYYY')}</td>
                <td>{item.responsable}</td>
                <td>{item.tipo_operacion}</td>
                <td>{opcion}</td>
                <td>{item.descuento}</td>
                <td>{item.modo_pago}</td>
                <td>Q. {item.total_operacion}</td>
                <td>
                  <Link to="#">
                    <AiIcons.AiOutlineEye
                      className="icon-eye icon-table"
                      title="Ver detalles de la venta"
                    />
                  </Link>
                  <Link to="#">
                    <FcIcons.FcPrint
                      className="icon-print icon-table"
                      title="Imprimir factura de la venta"
                    />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TableInventory;