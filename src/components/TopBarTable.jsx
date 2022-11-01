import React from 'react'
import '../assets/styles/Sales.css'
import '../assets/styles/SalesBtn.css'
import { useSearcherContext } from '../providers/SidebarProvider'
import { Link } from 'react-router-dom'

const TopBarTable = () => {
    //Función de búsqueda
    const searcher = useSearcherContext()
  return (
    <>
      <h1 className="top-bar-title">!! Ahora que te hace soñar, sabor que te hace despertar</h1>
      <hr />

      <div className="barraArriba">
        <div className="cont1">
          <label htmlFor="lbl1" id="lbl1">Visualización por: </label>
          <select name="select" id="select">
            <option value="">Resumen de ventas de hoy</option>
            <option value="">Resumen de ventas semanal</option>
            <option value="">Resumen de ventas mensual</option>
            <option value="">Resumen de todas las ventas</option>
          </select>
          <input type="search" placeholder='Buscar....' name="buscar" id="buscar" onChange={searcher}/>
        </div>

        <Link to="/new" className="btn4m" id="btn2">Nueva Venta</Link>

      </div>
    </>
  )
}

export default TopBarTable