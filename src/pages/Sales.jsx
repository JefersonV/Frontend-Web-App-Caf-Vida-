import React from 'react'
import { useEffect, useState } from 'react'
import Table from '../components/Table'
const Sales = () => {
  const [dataApi, setDataApi] = useState([])
  const url = 'https://rickandmortyapi.com/api/character'
  const fetchDataApi = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(data => setDataApi(data.results))
      .catch(err => console.log(err)) 
      
  }

  useEffect(() => {
    fetchDataApi(url)
  }, [])
  return (
    <>
      <Table dataApi={dataApi} /> 
    </>
  );
}

export default Sales