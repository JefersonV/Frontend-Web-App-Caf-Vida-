import React from "react";
import useFetch from "../Hooks/useFetch";
import { useSidebarContext } from "../providers/SidebarProvider";
import SideBarMenu from "../components/SideBarMenu";
import TableRawMaterial from "../components/TableRawMaterial";
import TopBarTableRawMaterial from "../components/topBarsTables/TopBarTableRawMaterial";

const RawMaterial = () => {
  //const url = "http://localhost:3000/inventory/raw_material";
  const sidebar = useSidebarContext();
  //const dataApi = useFetch(url, "GET", { token: localStorage.token });

  // console.log(sidebar)
  //console.log(dataApi);
  return (
    <>
      {/* wrapper sirve para que se adapte con respecto a la sidebar */}

      <SideBarMenu />
      <div className={sidebar === true ? "wrapper" : "side"}>
        {/* La data está definida en el componente Table */}
        <TopBarTableRawMaterial />
        <TableRawMaterial />
        {/* <TableRawMaterial dataApi={dataApi} /> */}
      </div>
    </>
  );
};

export default RawMaterial;
