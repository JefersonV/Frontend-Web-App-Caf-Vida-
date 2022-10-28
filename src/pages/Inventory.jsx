import React from "react";
import SideBarMenu from "../components/SideBarMenu";
import useFetch from "../Hooks/useFetch";
import { useSidebarContext } from "../providers/SidebarProvider";
import TableInventory from "../components/TableInventory";
import TopBarTableInventory from "../components/topBarsTables/TopBarTableInventory";

const Inventory = () => {
  const url = "http://localhost:3000/inventory";
  const sidebar = useSidebarContext();
  const dataApi = useFetch(url, "GET", { token: localStorage.token });

  // console.log(sidebar)
  //console.log(dataApi);
  return (
    <>
      {/* wrapper sirve para que se adapte con respecto a la sidebar */}

      <SideBarMenu />
      <div className={sidebar === true ? "wrapper" : "side"}>
        {/* La data está definida en el componente Table */}
        <TopBarTableInventory />
        <TableInventory dataApi={dataApi} />
      </div>
    </>
  );
};

export default Inventory;
