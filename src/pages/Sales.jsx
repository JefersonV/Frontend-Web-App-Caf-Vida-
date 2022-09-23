import React from 'react'
import Table from '../components/Table'
import useFetch from '../Hooks/useFetch'
const Sales = () => {
  const url = 'https://rickandmortyapi.com/api/character'
  
  const dataApi = useFetch(url)
  return (
    <>
      {/* La data está definida en el componente Table */}
      <Table dataApi={dataApi} /> 
    </>
  );
}

export default Sales