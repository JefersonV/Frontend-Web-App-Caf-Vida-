import React from 'react'
import Table from '../components/Table'
import TopBarTable from '../components/TopBarTable'
import useFetch from '../Hooks/useFetch'
import { useSidebarContext } from '../providers/SidebarProvider'
// import SideBarMenu from '../components/SideBarMenu'
const Sales = () => {
  const url = 'http://localhost:3000/sales'
  const sidebar = useSidebarContext()
  const dataApi = useFetch(url, "GET", { token: localStorage.token })
  // console.log(sidebar)
  // console.log(dataApi)
  return (
    <>
      {/* wrapper sirve para que se adapte con respecto a la sidebar */}
      
        {/* <SideBarMenu/> */}
        <div className={sidebar === true ? "wrapper" : "side"}>
          {/* La data está definida en el componente Table */}
          <TopBarTable />
          <Table dataApi={dataApi} /> 
        </div>

    </>
  );
}

export default Sales