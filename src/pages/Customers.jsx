import React from "react";
import TableClient from "../components/TableClient";
import TopBarTableClient from "../components/topBarsTables/TopBarTableClient";
import useFetch from "../Hooks/useFetch";
import { useSidebarContext } from "../providers/SidebarProvider";
import SideBarMenu from "../components/SideBarMenu";

const Customers = () => {
  //const url = "http://localhost:3000/sales";
  const sidebar = useSidebarContext();
  //const dataApi = useFetch(url, "GET", { token: localStorage.token });
  return (
    <>
      {/* wrapper sirve para que se adapte con respecto a la sidebar */}

      <SideBarMenu />
      <div className={sidebar === true ? "wrapper" : "side"}>
        {/* La data está definida en el componente Table */}
        <TopBarTableClient />
        {/* <Table dataApi={dataApi} /> */}
        <TableClient />
      </div>
    </>
  );
};

export default Customers;
