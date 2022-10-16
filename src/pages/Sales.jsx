import React from 'react'
import Table from '../components/Table'
import TopBarTable from '../components/TopBarTable'
import useFetch from '../Hooks/useFetch'
import { useSidebarContext } from '../providers/SidebarProvider'
const Sales = () => {
  const url = 'http://localhost:4000/sales'
  const sidebar = useSidebarContext()
  const dataApi = useFetch(url)
  // console.log(sidebar)
  // console.log(dataApi)
  return (
    <>
      {/* wrapper sirve para que se adapte con respecto a la sidebar */}
      
        <div className={sidebar === true ? "wrapper" : "side"}>
          {/* La data está definida en el componente Table */}
          <TopBarTable />
          <Table dataApi={dataApi} /> 
        </div>

    </>
  );
}

export default Sales