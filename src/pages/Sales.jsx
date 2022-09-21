import React from 'react'
import { useEffect, useState } from 'react'
import Table from '../components/Table'
import useFetch from '../Hooks/useFetch'
const Sales = () => {
  const url = 'https://rickandmortyapi.com/api/character'
/*   const [dataApi, setDataApi] = useState([])
  const fetchDataApi = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(data => setDataApi(data.results))
      .catch(err => console.log(err)) 
      
  }

  useEffect(() => {
    fetchDataApi(url)
  }, []) */

  const dataApi = useFetch(url)
  return (
    <>
      <Table dataApi={dataApi} /> 
    </>
  );
}

export default Sales