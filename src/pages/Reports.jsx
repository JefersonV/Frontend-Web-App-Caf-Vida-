import React from "react";
import generateSales from "../generatePDF/generateSales";
// const dateOfReport = "del mes de agosto de 2022";
import { useSidebarContext } from '../providers/SidebarProvider'
const sales = [
  {
    id_venta: 9,
    fecha: "2022-09-22T06:00:00.000Z",
    cantidad: 4,
    descripcion: "Descripcion actualizada BIEN",
    descuento: 0,
    subtotal: 180,
    total: 180,
    cliente: "Jefferson Velasquez",
    factura: "Factura de venta",
    producto: "Café de segunda calidad",
    modo_pago: "Depósito",
    usuario: "Carlos",
  },
  {
    id_venta: 7,
    fecha: "2022-09-22T06:00:00.000Z",
    cantidad: 6,
    descripcion: "Actualizado correcto",
    descuento: 15,
    subtotal: 270,
    total: 255,
    cliente: "Jefferson Velasquez",
    factura: "Factura de venta",
    producto: "Café de segunda calidad",
    modo_pago: "Depósito",
    usuario: "Carlos",
  },
  {
    id_venta: 11,
    fecha: "2022-09-25T06:00:00.000Z",
    cantidad: 2,
    descripcion: "Cafe weno",
    descuento: 0,
    subtotal: 90,
    total: 90,
    cliente: "Ever Ramirez",
    factura: "Factura de venta",
    producto: "Café de segunda calidad",
    modo_pago: "Transferencia",
    usuario: "Carlos",
  },
  {
    id_venta: 12,
    fecha: "2022-09-25T06:00:00.000Z",
    cantidad: 2,
    descripcion: "Cafe weno 2 ACTUALIZADO",
    descuento: 0,
    subtotal: 90,
    total: 90,
    cliente: "Ever Ramirez",
    factura: "Factura de venta",
    producto: "Café de segunda calidad",
    modo_pago: "Transferencia",
    usuario: "Carlos",
  },
  {
    id_venta: 13,
    fecha: "2022-09-25T06:00:00.000Z",
    cantidad: 3,
    descripcion: "Cafe weno NUEVA FUNC",
    descuento: 10,
    subtotal: 135,
    total: 125,
    cliente: "Ever Ramirez",
    factura: "Factura de venta",
    producto: "Café de segunda calidad",
    modo_pago: "Transferencia",
    usuario: "Carlos",
  },
  {
    id_venta: 10,
    fecha: "2022-09-25T06:00:00.000Z",
    cantidad: 2,
    descripcion: "CAFE Prueba",
    descuento: 10,
    subtotal: 50,
    total: 40,
    cliente: "Ever Ramirez",
    factura: "Factura de venta",
    producto: "Cafe Prueba",
    modo_pago: "Transferencia",
    usuario: "Carlos",
  },
  {
    id_venta: 14,
    fecha: "2022-09-25T06:00:00.000Z",
    cantidad: 1,
    descripcion: "Insert cafe prueba",
    descuento: 5,
    subtotal: 25,
    total: 20,
    cliente: "Ever Ramirez",
    factura: "Factura de venta",
    producto: "Cafe Prueba",
    modo_pago: "Transferencia",
    usuario: "Carlos",
  },
  {
    id_venta: 2,
    fecha: "2022-09-25T06:00:00.000Z",
    cantidad: 5,
    descripcion: "ACTUALIZADO BIEN",
    descuento: 10,
    subtotal: 125,
    total: 115,
    cliente: "Jefferson Velasquez",
    factura: "Factura de venta",
    producto: "Cafe Prueba",
    modo_pago: "Depósito",
    usuario: "Carlos",
  },
  {
    id_venta: 16,
    fecha: "2022-09-25T06:00:00.000Z",
    cantidad: 2,
    descripcion: "INSERTADO BIEN",
    descuento: 10,
    subtotal: 50,
    total: 40,
    cliente: "Jefferson Velasquez",
    factura: "Factura de venta",
    producto: "Cafe Prueba",
    modo_pago: "Depósito",
    usuario: "Carlos",
  },
  {
    id_venta: 17,
    fecha: "2022-09-25T06:00:00.000Z",
    cantidad: 17,
    descripcion: "Cafe vida Actualizado",
    descuento: 10,
    subtotal: 425,
    total: 415,
    cliente: "Jefferson Velasquez",
    factura: "Factura de venta",
    producto: "Cafe Prueba",
    modo_pago: "Depósito",
    usuario: "Carlos",
  },
];

//Quiero agregar un boton para la funcion generateSales(date, sales)

const Reports = () => {
  const sidebar = useSidebarContext()
  return (
    <div className={sidebar === true ? "wrapper" : "side"}>
      <button
          onClick={() =>
            generateSales(sales, "Reporte de ventas del 27/09/2022 al 30/09/2022")
          }
        >
          Prueba
        </button>
        <h1>Reportes</h1>
        {/* proba */}
    </div>
  );
};

export default Reports;
