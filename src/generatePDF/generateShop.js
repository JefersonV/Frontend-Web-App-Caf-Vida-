import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs/esm/index.js";
/**
 * La función generateSales acepta los siguientes tipos de datos
 * ventas: es una variable Json, la función se encarga de convertirlo a array
 * datoDeporte: es un string sobre la fecha de los datos
 */
const generateShop = (
  compras,
  datoReporte = "Reporte de compras"
) => {
  //Iniciamos una array vacio
  let compra2 = [];
  //Con el ciclo for, recoremos todo el json que recibimos de entrada
  //ventas.length devuelve un entero con la longitud del json
  for (let i = 0; i < compras.length; i++) {
    //Hacemos push a un array nuevo dentro de ventas2, odesa ventas2=[] => ventas2=[[]]
    compra2.push([]);
    //Hacemos push a cada dato del json
    //ventas2[[id_ventaas, fecha, cantidad...]]
    compra2[i].push(compras[i].id_compra);
    compra2[i].push(compras[i].proveedor);
    compra2[i].push(dayjs(compras[i].fecha).format('DD/MM/YYYY'));
    compra2[i].push(compras[i].total);
    compra2[i].push(compras[i].tipo_comprobante);
    compra2[i].push(compras[i].modo_pago);
  }

  //Configuramos la hoja para el pdf
  //orientación l=horizontal y p=vertical
  //unit, es la unidad de medida para X y Y => mm = milimetos
  //format es el tamaño de la hoja
  const doc = new jsPDF({ orientation: "l", unit: "mm", format: "a4" });

  //doc.text(posiciónX, posiciónY, string)
  doc.text(135, 9, "CAFE VIDA");
  doc.text(120, 15, "REPORTE DE COMPRAS");
  doc.text(5, 21, datoReporte);

  // Construyendo la tabla
  // head: recibe el encabezado de la tabla con todas las columnas
  // body: recibe las filas con la información, en este caso recibe un Json
  autoTable(doc, {
    head: [["No.", "Proveedor", "Fecha", "Total", "Comprobante", "Modo Pago"]],
    body: compra2,
    startY: 27,
  });

  //llamado a funcion par generar pdf directamente y guardarlo
  doc.save("table.pdf");

  //Llamado a funcion para generar el reporte en una pestaña aparte
  //Solo abre una preview en otra pestaña pero no la guarda
  //doc.output("dataurlnewwindow", "reporteVentas");
};

export default generateShop;
