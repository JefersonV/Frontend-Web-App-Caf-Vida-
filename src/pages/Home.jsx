import React from "react";
import "../assets/styles/Navbar.css";
import "../assets/styles/home.scss";
import Widget from "../components/widgets/Widget";
import Featured from "../components/featured/featured";
import Chart from "../components/chart/chart";

const Home = () => {
  return (
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
  );
};

export default Home;
