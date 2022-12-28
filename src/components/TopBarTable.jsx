import React, { useState, useEffect } from "react";
import "../assets/styles/Sales.css";
import "../assets/styles/SalesBtn.css";
import * as FcIcons from "react-icons/fc";
import generateSalesCheck from "../generatePDF/salesCheck";
import generateSales from "../generatePDF/generateSales";
// import { useSearcherContext } from "../providers/SidebarProvider";
import { useFetchContext } from "../providers/SidebarProvider";
import { useResultsSearchContext } from "../providers/SidebarProvider";
import { Link } from "react-router-dom";
/* Librería para las fechas (dayjs) */
import dayjs from "dayjs/esm/index.js";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);

const TopBarTable = () => {
  // Definido en el archivo SidebarProvider.jsx -> tiene la data de la api, al end point /sales
  const dataApi = useFetchContext();
  /* opción por defecto 3 (form control select) -> porque la opción por defecto debe ser mensual */
  const [dateSelected, setDateSelected] = useState(3);
  
  const handleDateChange = (e) => {
    // console.log(e.target.value)
    setDateSelected(Number(e.target.value));
    // console.log(dateSelected)
  };
  /* Opción de la semana actual */
  // Utilidades para filtro semanal 
  let inicioSemana = dayjs().startOf("week");
  let finSemana = dayjs().endOf("week");
  // retorna true si se encuentra en la semana actual (el día inicia en domingo, según docs de dayjs)
  let semanaActual = dayjs().isBetween(inicioSemana, dayjs(finSemana));

  let filtradosSemanaActual = dataApi.filter((dato) =>
    // Comprueba que cada item de [results -> dato.fecha] se encuentre en la semana actual
    dayjs(dato.fecha).isBetween(inicioSemana, dayjs(finSemana)) === true
  );

  // console.log("semana actual");
  // console.log(filtradosSemanaActual);

  /* Opción de todas las ventas (solo se toman en cuenta las del año en curso) */
  let inicioYear = dayjs().startOf("year");
  let finYear = dayjs().endOf("year");
  let currentYear = dayjs().isBetween(inicioYear, dayjs(finYear));

  let filtradosCurrentYear = dataApi.filter((dato) => 
    // Comprueba que cada item [results -> dato.fecha] se encuentre en el año en curso
    dayjs(dato.fecha).isBetween(inicioYear, dayjs(finYear)) === true
  );

  // console.log(results)
  // console.log("current year");
  // console.log(filtradosCurrentYear);

  /* Opción del mes actual */
  // Utilidad, objeto con la fecha del mes anterior
  let mesAnterior = dayjs().subtract(1, "month");

  let filtradosMesActual = dataApi.filter((dato) =>
    // comprueba que cada item [results -> dato.fecha] se encuentre en el mes actual
    dayjs(mesAnterior).isBefore(dayjs(dato.fecha), "month") === true
  );
  // console.log("mes actual");
  // console.log(filtradosMesActual);

  // Estado del control (<select>)
  const [resultsDates, setResultsDates] = useState(dataApi);

  /* Opción día actual */
  let filtradosDiaActual = dataApi.filter((dato) => 
    // Comprueba que cada item [results -> dato.fecha] se encuentre en el día actual
    dayjs(dato.fecha).isToday() === true
  );

  // console.log(resultsDates)
  
  console.log("select");
  console.log(dateSelected);

  console.log("filtrados");
  console.log(resultsDates);

  useEffect(() => {
    //Renderiza al entrar a la ruta /sales el filtro (filtradosMesActual)
    setResultsDates(filtradosMesActual)
  }, [dataApi])

  useEffect(()=> {
    // Renderiza cada vez que ocurre un cambio en el control select
    switch(dateSelected) {
      case 1:
        setResultsDates(filtradosDiaActual)
        // results = filtradosDiaActual
      break;
      case 2:
        setResultsDates(filtradosSemanaActual)
      break;
      case 3:
        setResultsDates(filtradosMesActual)
      break;
      case 4:
        setResultsDates(filtradosTrimestre)
      break;
      case 5:
        setResultsDates(filtradosCurrentYear)
      break;
      default:
        setResultsDates(filtradosMesActual)
    }
  }, [dateSelected])

  /* State para el input de búsqueda */
  const [search, setSearch] = useState("")

  // Handler <input type="search" />
  const searcher = (e) => {
    console.log(e.target.value)
    setSearch(e.target.value)
    console.log(search.length)
  }

  /* // Método de filtrado del control <input type="search"> */
  // Si no se a ingresado ningún caracter a la búsqueda finalDates = resultsDates
  const finalDates = !search ? resultsDates
  // Si se ingresa un caracter, va filtrar en función de el caracter o la cadena de texto ingresada
  : resultsDates.filter((dato) =>  
    dato.cliente.toLowerCase().includes(search.toLocaleLowerCase()) ||
    dato.producto.toLowerCase().includes(search.toLocaleLowerCase()) ||
    dato.fecha.includes(search)
  )

  // console.warn('final')
  // console.log(finalDates)


  /* --------FILTROS DE LOS REPORTES -------------*/
  /* -> Utilidades para el filtro mensual */
  let mesAnteriorReport = dayjs().subtract(1, "month");
  // Filtro mes actual
  let filtradosMesActualReport = dataApi.filter((dato) =>
    // Retorna true si dato.fecha -> se encuentra en el mes actual
    dayjs(mesAnteriorReport).isBefore(dayjs(dato.fecha), "month") === true
  );

  /* -> Utilidades para el filtro trimestral */
  // Inicializamos la fecha de inicio (primer día de hace 2 meses, desde la fecha actual)
  let mesesTrimestre = dayjs().subtract(2, "month").startOf("month")
  // Fin de mes
  let finMes = dayjs().endOf("month")

  let esParteDelTrimestre = dayjs().isBetween(mesesTrimestre, dayjs(finMes))
  
  // Filtro trimestral
  let filtradosTrimestre = dataApi.filter((dato) => 
  // Retorna true si dato.fecha -> está entre el trimestre,
  // empezando desde la fecha actual - 2 meses [primer día del mes]
    dayjs(dato.fecha).isBetween(mesesTrimestre, dayjs(finMes)) === true
  )
  // console.log(filtradosTrimestre)


  /* -> Utilidades para el filtro anual */
  let inicioYearReport = dayjs().startOf("year");
  let finYearReport = dayjs().endOf("year");
  let currentYearReport = dayjs().isBetween(inicioYearReport, dayjs(finYearReport));
  
  let filtradoAnualReport = dataApi.filter((dato) =>
    // Retorna true si dato.fecha -> se encuentra en el año en curso
    dayjs(dato.fecha).isBetween(inicioYearReport, dayjs(finYearReport))
  )

  // console.log(filtradoAnual)

  return (
    <>
      <h1 className="top-bar-title">
        !! Ahora que te hace soñar, sabor que te hace despertar
      </h1>
      <hr />
      <div className="barraArriba">
        <div className="cont1">
          <label htmlFor="lbl1" id="lbl1">
            Visualización por:
          </label>
          <select
            value={dateSelected}
            name="selectDate"
            id="selectDate"
            onChange={handleDateChange}
          >
            <option value="1">Resumen de ventas de hoy</option>
            <option value="2">Resumen de ventas semanal</option>
            <option value="3">Resumen de ventas mensual</option>
            <option value="4">Resumen de ventas trimestral</option>
            <option value="5">Resumen de todas las ventas</option>
          </select>
          <input
            type="search"
            placeholder="Buscar...."
            name="buscar"
            id="buscar"
            onChange={searcher}
          />
        </div>
        <Link to="/new" className="btn4m" id="btn2">
          Nueva Venta
        </Link>
      </div>
      <button
        className="btn4m"
        title="Reporte del mes actual"
        onClick={() =>
          generateSales(
            filtradosMesActualReport,
            "Reporte de ventas del 27/09/2022 al 30/09/2022"
          )
        }
      >
        Reporte Mensual
      </button>
      <button
        className="btn4m"
        title="Reporte del presente mes y los últimos 2 meses transurridos"
        onClick={() =>
          generateSales(
            filtradosTrimestre,
            "Reporte de ventas del 27/09/2022 al 30/09/2022"
          )
        }
      >
        Reporte Trimestral
      </button>
      <button
        className="btn4m"
        title="Reporte de todas las ventas que se han realizado durante el año"
        onClick={() =>
          generateSales(
            filtradoAnualReport,
            "Reporte de ventas del 27/09/2022 al 30/09/2022"
          )
        }
      >
        Reporte Anual
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
          {finalDates.map((item, index) => {
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

export default TopBarTable;
