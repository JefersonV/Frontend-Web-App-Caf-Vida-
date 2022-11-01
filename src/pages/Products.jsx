import React from "react";
import SideBarMenu from "../components/SideBarMenu";
import { useSidebarContext } from "../providers/SidebarProvider";
import TableProducts from "../components/TableProducts";
import TopBarTableProduct from "../components/topBarsTables/TopBarTableProduct";

const Products = () => {
  //const url = "http://localhost:3000/inventory/products";
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
        <TopBarTableProduct />
        {/* <TableProducts dataApi={dataApi} /> */}
        <TableProducts />
      </div>
    </>
  );
};

export default Products;