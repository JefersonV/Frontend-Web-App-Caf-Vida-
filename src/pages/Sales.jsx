import React from 'react'
import Table from '../components/Table'
import TopBarTable from '../components/TopBarTable'
import useFetch from '../Hooks/useFetch'
import { useSidebarContext, useSidebarToggleContext } from '../providers/SidebarProvider'
const Sales = () => {
  const url = 'https://rickandmortyapi.com/api/character'
  const sidebar = useSidebarContext()
  const dataApi = useFetch(url)
  console.log(sidebar)
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