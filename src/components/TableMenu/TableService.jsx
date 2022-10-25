import React from 'react'
import '../../assets/styles/MenuCostos.css'
import * as BiIcons from 'react-icons/bi'
import * as AiIcons from 'react-icons/ai'
import { Link } from "react-router-dom"
import { useState, useEffect } from "react" 
import { useResultsSearchContext } from '../../providers/SidebarProvider'
import NewService from '../../components/NewService'

const TableService =({children})=>{
    const results= useResultsSearchContext()
  //Estado para llamar el modal para los nuevos ingresos
    const[estadoRegistro4,cambiarEstadoRegistro4]=useState(false);

//Array de los registros
const [data, setData] = useState([]);

//Funcion para obtener la lista de datos
const getData = async () => {
  const response = await fetch( 
    "http://localhost:4000/production_cost/menu_costo/service",
    {
      headers: {
        token: localStorage.token,
      },
    }
  );
  const data = await response.json();
  setData(data);
};

//funcion useffect para llamar y cargar los datos
useEffect(() => {
  getData();
}, []);




    return(<>
    {/**Tabla del listado de Servicios que se registran */}        
    <div className='listadoServicio'>
          <div>
        <label htmlFor="lab" id="label1">Servicio</label> 
        <button className="link6" onClick={()=> cambiarEstadoRegistro4(!estadoRegistro4)} > Agregar Nuevo Servicio</button> </div>
   <table className="table table-striped w-80 thead-light ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha</th>
            <th scope="col">Tipo de Servicio</th>
            <th scope="col">Materia Prima</th>
            <th scope="col">Unidad de Medida</th>
            <th scope="col">Costos del servicio</th>
             <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
            {/**Data que trae el Hook Fetch */}
            {results.map((item,index)=>{
                return(
            <tr key={index}>
                <th>{item.id_servicio_cafe}</th>
                <td>{item.fecha}</td>
                <td>{item.materia_prima}</td>
                <td>{item.unidad_de_medida}</td>
                <td>{item.servicio}</td>
                <td>{item.costo_servicio}</td>
                
            <td>
            <Link to = "#">
                <BiIcons.BiEdit color="darkblue" className="icon-edit icon-table" title="Editar Dato"/>
            </Link>
            <Link to ="#">
                <AiIcons.AiOutlineDelete color="darkred" className="icon-delete icon-table" title="Eliminar registro"/>

            </Link>
        
        </td>

       </tr>
        )
         })
        }
        </tbody>
        </table>
        </div>

    {children}
     {/**Para hacer el llamado del modal de registo de nuevo servicio */}
    <NewService
        estado4={estadoRegistro4}
        CambiarEstado4={cambiarEstadoRegistro4}
        ></NewService>
    </>
    )

}
export default TableService