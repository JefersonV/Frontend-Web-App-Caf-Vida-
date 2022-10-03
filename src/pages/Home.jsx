import React from "react";
import "../assets/styles/Navbar.css";
import "../assets/styles/home.scss";
import Widget from "../components/widgets/Widget";
import Featured from "../components/featured/Featured";
import Chart from "../components/chart/Chart";
import { useSidebarContext } from '../providers/SidebarProvider'
const Home = () => {
  const sidebar = useSidebarContext()
  return (
    <div className={sidebar === true ? "wrapper" : "side"}>
      <div className="home">
        <div className="homeContainer">
          <div className="widgets">
            <Widget type={"ventasMes"} />
            <Widget type={"costoMes"} />
            <Widget type={"bolsasVend"} />
            <Widget type={"cliente"} />
            <Widget type={"bolsasDisp"} />
          </div>
          <div className="charts">
            <Featured />
            <Chart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
