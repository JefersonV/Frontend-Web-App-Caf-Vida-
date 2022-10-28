import React from "react";
import useFetch from "../Hooks/useFetch";
import { useSidebarContext } from "../providers/SidebarProvider";
import SideBarMenu from "../components/SideBarMenu";
import TablePackingMaterial from "../components/TablePackingMaterial";
import TopBarTablePackingMaterial from "../components/topBarsTables/TopBarTablePackingMaterial";
const PackingMaterial = () => {
  //const url = "http://localhost:3000/inventory/packing_material";
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
        <TopBarTablePackingMaterial />
        <TablePackingMaterial />
        {/* <TablePackingMaterial dataApi={dataApi} /> */}
      </div>
    </>
  );
};

export default PackingMaterial;
