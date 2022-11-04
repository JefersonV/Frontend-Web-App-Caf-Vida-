import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * La función generateSales acepta los siguientes tipos de datos
 * ventas: es una variable Json, la función se encarga de convertirlo a array
 * datoDeporte: es un string sobre la fecha de los datos
 */
const generateSales = (
  ventas,
  datoReporte = "Reporte de ventas"
) => {
  //Iniciamos una array vacio
  let ventas2 = [];
  //Con el ciclo for, recoremos todo el json que recibimos de entrada
  //ventas.length devuelve un entero con la longitud del json
  for (let i = 0; i < ventas.length; i++) {
    //Hacemos push a un array nuevo dentro de ventas2, odesa ventas2=[] => ventas2=[[]]
    ventas2.push([]);
    //Hacemos push a cada dato del json
    //ventas2[[id_ventaas, fecha, cantidad...]]
    ventas2[i].push(ventas[i].id_venta);
    ventas2[i].push(ventas[i].fecha);
    ventas2[i].push(ventas[i].cantidad);
    ventas2[i].push(ventas[i].descripcion);
    ventas2[i].push(ventas[i].descuento);
    ventas2[i].push(ventas[i].subtotal);
    ventas2[i].push(ventas[i].total);
    ventas2[i].push(ventas[i].cliente);
    ventas2[i].push(ventas[i].factura);
    ventas2[i].push(ventas[i].producto);
    ventas2[i].push(ventas[i].modo_pago);
    ventas2[i].push(ventas[i].usuario);
  }

  //Configuramos la hoja para el pdf
  //orientación l=horizontal y p=vertical
  //unit, es la unidad de medida para X y Y => mm = milimetos
  //format es el tamaño de la hoja
  const doc = new jsPDF({ orientation: "l", unit: "mm", format: "legal" });

  //doc.text(posiciónX, posiciónY, string)
  doc.text(155, 9, "CAFE VIDA");
  doc.text(140, 15, "REPORTE DE VENTAS");
  doc.text(5, 21, datoReporte);

  // Construyendo la tabla
  // head: recibe el encabezado de la tabla con todas las columnas
  // body: recibe las filas con la información, en este caso recibe un Json
  autoTable(doc, {
    head: [
      [
        "id_venta",
        "fecha",
        "cantidad",
        "descripcion",
        "descuento",
        "subtotal",
        "total",
        "cliente",
        "factura",
        "producto",
        "modo_pago",
        "usuario",
      ],
    ],
    body: ventas2,
    startY: 27,
  });

  //llamado a funcion par generar pdf directamente y guardarlo
  doc.save("table.pdf");

  //Llamado a funcion para generar el reporte en una pestaña aparte
  //Solo abre una preview en otra pestaña pero no la guarda
  //doc.output("dataurlnewwindow", "reporteVentas");
};

export default generateSales;
