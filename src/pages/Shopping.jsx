import { React, useEffect, useState } from "react";
import TableShop from "../components/TableShop";
import TopBarTableShop from "../components/TopBarTableShop";
import useFetch from "../Hooks/useFetch";
import { useSidebarContext } from "../providers/SidebarProvider";

const Shopping = () => {
  const url = "http://localhost:3000/sales";
  const sidebar = useSidebarContext();
  const dataApi = useFetch(url, "GET", { token: localStorage.token });
  // console.log(sidebar)
  // console.log(dataApi)

  return (
    <>
      {/* wrapper sirve para que se adapte con respecto a la sidebar */}

      <div className={sidebar === true ? "wrapper" : "side"}>
        {/* La data está definida en el componente Table */}
        <TopBarTableShop />
        {/* 
        <TableShop dataApi={dataApi} />
        */}
        <TableShop />
      </div>
    </>
  );
};

export default Shopping;
