import * as FaIcons from "react-icons/fa";
import "./widget.scss";

const Widget = ({ type }) => {
  //temporal
  const monto = 100;
  const porcentaje = 20;
  let data = {};

  switch (type) {
    case "ventasMes":
      data = {
        title: "VENTAS DEL MES",
        isMoney: false,
        link: "Ver todas las ventas",
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
        isMoney: false,
        link: "Ver todos los costos",
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
          {data.isMoney && Q} {monto}
        </span>
        <span className="link">{data.link}</span>
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
