import React from "react";
import generateSales from "../generatePDF/generateSales";
// const dateOfReport = "del mes de agosto de 2022";

const sales = [
  {
    cantidad: 3,
    peso: 1,
    producto: "Cafe de segunda calidad",
    detalle: "Venta al crédito",
    precio: 45,
    cliente: "Manuel Puac",
    subtotal: 135,
    fecha: "8/09/2022",
    total: 135,
  },
];

//Quiero agregar un boton para la funcion generateSales(date, sales)

const Reports = () => {
  return (
    <>
      <button onClick={() => generateSales()}>Prueba</button>
      <h1>Reportes</h1>
      {/* proba */}
    </>
  );
};

export default Reports;
