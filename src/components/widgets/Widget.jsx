import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import "./widget.scss";

const Widget = ({ type }) => {

  // const getSales = async () => {
  //   const res = await fetch("http://localhost:3000/sales/18");
  //   const data = await res.json();
  //   console.log(data);
  // };

  //getSales();
  const getSales = async () => {
    const res = await fetch("http://localhost:3000/sales/9");
    const data = await res.json();
    console.log(data);
  };

  // getSales();
  
  //temporal
  const ventasMes = 2500;
  const costoMes = 3500;
  const bolsasVend = 123;
  const clientesFrec = 12;
  const bolsasDispo = 15;
  const porcentaje = 20;
  let data = {};

  switch (type) {
    case "ventasMes":
      data = {
        title: "VENTAS DEL MES",
        isMoney: true,
        link: "Ver todas las ventas",
        path: "/sales",
        monto: ventasMes,
        icon: (
          <FaIcons.FaShoppingCart
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "costoMes":
      data = {
        title: "COSTOS DEL MES",
        isMoney: true,
        link: "Ver todos los costos",
        path: "/production_cost",
        monto: costoMes,
        icon: (
          <FaIcons.FaMoneyBill
            className="icon"
            style={{
              backgroundColor: "rgba(0, 128, 0, 0.2)",
              color: "green",
            }}
          />
        ),
      };
      break;
    case "bolsasVend":
      data = {
        title: "BOLSAS VENDIDAS",
        isMoney: false,
        link: "Ver todas...",
        path: "/sales",
        monto: bolsasVend,
        icon: (
          <FaIcons.FaShoppingCart
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "cliente":
      data = {
        title: "CLIENTES FRECUENTES",
        isMoney: false,
        link: "Ver todos...",
        path: "/customers",
        monto: clientesFrec,
        icon: (
          <FaIcons.FaUserAlt
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    case "bolsasDisp":
      data = {
        title: "BOLSAS DISPONIBLES",
        isMoney: false,
        link: "Ver todos...",
        path: "/products",
        monto: bolsasDispo,
        icon: (
          <FaIcons.FaShoppingBasket
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "Q"} {data.monto}
        </span>
        {/* <span className="link">{data.link}</span> */}
        <Link className="link" to={data.path}>
          {data.link}
        </Link>
      </div>
      <div className="right">
        <div className="percentage positive">
          <FaIcons.FaAngleUp />
          {porcentaje}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
