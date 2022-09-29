import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/styles/Table.css'
import * as AiIcons from 'react-icons/ai'
import * as FcIcons from 'react-icons/fc'
import { useResultsSearchContext} from '../providers/SidebarProvider';

const Table = ({dataApi = []}) => {
  //Datos del estado global 
  const results = useResultsSearchContext()
  return (
    <>
      <table className="table table-striped w-80 thead-light shadow-lg">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Código</th>
            <th scope="col">Fecha</th>
            <th scope="col">Cliente</th>
            <th scope="col">Vendedor</th>
            <th scope="col">Total</th>
            <th scope="col">Método Pago</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* La data que trae el Hook Fetch se mapea y se creará una fila para cada item. */}
          {results.map((item, index) => {
            return (
            <tr key={index}>
              <th>{item.id}</th>
              <td>{item.status}</td>
              <td>{item.species}</td>
              <td>{item.gender}</td>
              <td>{item.species}</td>
              <td>{item.status}</td>
              <td>{item.name}</td>
              <td>
                <Link to="#">
                  <AiIcons.AiOutlineEye className="icon-eye icon-table" title="Ver detalles de la venta"/>
                </Link>
                <Link to="#">
                  <FcIcons.FcPrint className="icon-print icon-table" title="Imprimir factura de la venta" />
                </Link>
              </td>
            </tr>
          )  
          })
          }
        </tbody>
      </table>
    </>
  )
}

export default Table