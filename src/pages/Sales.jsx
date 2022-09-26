import React from 'react'
import Table from '../components/Table'
import useFetch from '../Hooks/useFetch'
import { useSidebarContext, useSidebarToggleContext } from '../providers/SidebarProvider'
const Sales = () => {
  const url = 'https://rickandmortyapi.com/api/character'
  const sidebar = useSidebarContext()
  const dataApi = useFetch(url)
  
  return (
    <>
      {/* wrapper sirve para que se adapte con respecto a la sidebar */}
        <div className={sidebar === true ? "wrapper" : null}>
          {/* La data está definida en el componente Table */}
          <Table dataApi={dataApi} /> 
        </div>

    </>
  );
}

export default Sales