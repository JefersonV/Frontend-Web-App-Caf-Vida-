import React, { useEffect, useState } from "react";
import "./featured.scss";
import * as AiIcons from "react-icons/ai";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Featured = () => {
  const urlSuma = "http://localhost:3000/dashboard/suma";
  const urlVentasHoy = "http://localhost:3000/dashboard/ventas-hoy";

  //estado para la suma de todas las ventas del mes
  const [venta, setVenta] = useState([]);
  //estado para la suma de las ventas de hoy
  const [ventasHoy, setVentasHoy] = useState([]);

  //Funcion para obtener la lista de datos
  const getSumaVenta = async (url) => {
    const response = await fetch(url, {
      headers: {
        token: localStorage.token,
      },
    });
    const data = await response.json();
    setVenta(data[0]);
  };

  //Funcion para obtener la lista de datos
  const getVentasHoy = async (url) => {
    const response = await fetch(url, {
      headers: {
        token: localStorage.token,
      },
    });
    const data = await response.json();
    setVentasHoy(data[0]);
  };
  //funcion useffect para llamar y cargar los datos
  useEffect(() => {
    getSumaVenta(urlSuma);
    getVentasHoy(urlVentasHoy);
  }, []);
  let sumaTotal = venta.suma_total;
  let sumaVentasHoy = ventasHoy.venta_total;
  let resultado = sumaTotal / sumaVentasHoy;
  let percentage = resultado * 100;
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Ingresos</h1>
        <AiIcons.AiOutlineMore />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={percentage} text={`${percentage}%`} />
        </div>
        <p className="title">Total ventas de hoy</p>
        <p className="monto">Q. {ventasHoy.venta_total}</p>
        <p className="desc">
          Ventas pagadas, las ventas no cobradas no se incluyen en este total
        </p>
      </div>
    </div>
  );
};

export default Featured;
