import "./featured.scss";
import * as AiIcons from "react-icons/ai";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Featured = () => {
  const percentage = 87;
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
        <p className="monto">Q545.00</p>
        <p className="desc">
          Ventas pagadas, las ventas no cobradas no se incluyen en este total
        </p>
      </div>
    </div>
  );
};

export default Featured;
