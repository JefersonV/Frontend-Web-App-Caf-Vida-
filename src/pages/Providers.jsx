import React from "react";
import { useSidebarContext } from "../providers/SidebarProvider";
import TableProviders from "../components/TableProviders";
import TopBarTableProvider from "../components/topBarsTables/TopBarTableProvider";

const Providers = () => {
  const sidebar = useSidebarContext();
  return (
    <>
      {/* wrapper sirve para que se adapte con respecto a la sidebar */}

      <div className={sidebar === true ? "wrapper" : "side"}>
        {/* La data está definida en el componente Table */}
        <TopBarTableProvider />
        {/* <TableProducts dataApi={dataApi} /> */}
        <TableProviders />
      </div>
    </>
  );
};

export default Providers;