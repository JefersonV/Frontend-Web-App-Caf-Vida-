import React from 'react'
import '../assets/styles/Table.css'
import * as AiIcons from 'react-icons/ai'
import * as FcIcons from 'react-icons/fc'

const Table = ({dataApi = []}) => {
  return (
    <>
    <div className="wrapper">
      <table className="table table-striped w-80 thead-light">
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
          {dataApi.map((item, index) => {
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
                <AiIcons.AiOutlineEye className="icon-eye icon-table" title="Ver detalles de la venta"/>
                <FcIcons.FcPrint className="icon-print icon-table" title="Imprimir factura de la venta" />
              </td>
            </tr>
          )  
          })
          }
        </tbody>
      </table>
    </div>
    </>
  )
}

export default Table