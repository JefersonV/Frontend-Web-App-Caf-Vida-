import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const generateSales = () => {
  const doc = new jsPDF();

  doc.text(90, 7, "CAFE VIDA");
  doc.text(80, 12, "Ventas mensuales");

  // Construyendo la tabla
  // head: recibe el encabezado de la tabla con todas las columnas
  // body: recibe las filas con la información, en este caso recibe un Json
  autoTable(doc, {
    head: [
      [
        "Cantidad",
        "Peso(lbs)",
        "Producto",
        "Detalle",
        "Precio",
        "Cliente",
        "Subtotal",
        "Fecha",
        "Total",
      ],
    ],
    body: [
      [
        3,
        1,
        "Cafe de 2da calidad",
        "No se que va aca",
        45,
        "Manuel Puac",
        135,
        "8/09/2022",
        135,
      ],
      [
        3,
        1,
        "Cafe de 2da calidad",
        "No se que va aca",
        45,
        "Manuel Puac",
        135,
        "8/09/2022",
        135,
      ],
      [
        3,
        1,
        "Cafe de 2da calidad",
        "No se que va aca",
        45,
        "Manuel Puac",
        135,
        "8/09/2022",
        135,
      ],
      [
        3,
        1,
        "Cafe de 2da calidad",
        "No se que va aca",
        45,
        "Manuel Puac",
        135,
        "8/09/2022",
        135,
      ],
    ],
  });

  //llamado a funcion par generar pdf directamente y guardarlo
  doc.save("table.pdf");

  //Llamado a funcion para generar el reporte en una pestaña aparte
  //return doc.output("reporteDeVentas.pdf");
};

export default generateSales;
