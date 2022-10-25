import React from 'react'
import '../../assets/styles/MenuCostos.css'
import * as BiIcons from 'react-icons/bi'
import * as AiIcons from 'react-icons/ai'
import { Link } from "react-router-dom"
import { useState, useEffect } from "react" 
import { useResultsSearchContext } from '../../providers/SidebarProvider'
import NewPacking from '../../components/NewPacking'

const TablePacking =({children})=>{
    const [estadoRegistro3, cambiarEstadoRegistro3] = useState(false);
    const results= useResultsSearchContext()

//Array de los registros
const [data, setData] = useState([]);

//Funcion para obtener la lista de datos
const getData = async () => {
  const response = await fetch( 
    "http://localhost:4000/menu_costo/packing_material",
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

  
    return(
        <>
        {/** Se encuentra la tabla de listado de los materiales de empaque*/}
        <div className='MaterialEmpaque'>
          <div><label htmlFor="lab" id="label1">Materiales de Empaque</label> 
        <button className="link7" onClick={()=> cambiarEstadoRegistro3(!estadoRegistro3)} > Agregar nuevo empaque</button> </div>

   <table className="table table-striped w-80 thead-light ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha</th>
            <th scope="col">Nombre Empaque</th>
            <th scope="col">Costo del empaque</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
            {/**Data que trae el Hook Fetch */}
            {results.map((packing,index)=>{
                return(
            <tr key={index}>
                <th>{packing.id_empaque}</th>
                <td>{packing.fecha}</td>
                <td>{packing.nombre}</td>
                <td>{packing.costo}</td>
                
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

        <NewPacking
        estado3={estadoRegistro3}
        CambiarEstado3 ={cambiarEstadoRegistro3}

        ></NewPacking>

        </>
    )

}
export default TablePacking