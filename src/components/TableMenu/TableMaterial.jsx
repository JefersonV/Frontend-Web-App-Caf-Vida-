import React, { useEffect, useState } from 'react'
import '../../assets/styles/MenuCostos.css'
import * as BiIcons from 'react-icons/bi'
import * as AiIcons from 'react-icons/ai'
import { Link } from "react-router-dom"
import { useResultsSearchContext } from '../../providers/SidebarProvider'
import NewMaterialP from '../../components/NewMaterialP'

const TableMaterial =({children})=>{
      //Array de los registros
  const [data, setData] = useState([]);

  //Funcion para obtener la lista de datos
  const getData = async () => {
    const response = await fetch( 
      "http://localhost:4000/menu_costo/raw_material",
      {
        headers: {
          token: localStorage.token,
        },
      }
    );
    const data= await response.json();
    setData(data);
  }; 

  //funcion useffect para llamar y cargar los datos
  useEffect(() => {
    getData();
  }, []);

    //const sidebar = useSidebarContext()
    //data del estado global
  const results= useResultsSearchContext()
  //Estado para llamar el modal para los nuevos ingresos
  const[estadoRegistro5,cambiarEstadoRegistro5]=useState(false);

    return(
        <>
        
            {/**Tabla del listado de MAteria Prima */}
            <label htmlFor="lab" id="label1">Materia Prima</label>
            <Link><button className="link4" onClick={()=> cambiarEstadoRegistro5(!estadoRegistro5)}> Agregar Nueva Materia Prima</button></Link><table className="table table-striped w-80 thead-light ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha</th>
            <th scope="col">Materia Prima</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Unidad de medida</th>
            <th scope="col">Costo Producto Terminado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
            {/**Data que trae el Hook Fetch */}
            {results.map((data,index)=>{
                return(
            <tr key={index}>
                <th>{data.id_materia_prima}</th>
                <td>{data.fecha}</td>
                <td>{data.tipo_materia}</td>
                <td>{data.cantidad}</td>
                <td>{data.unidad_medida}</td>
                <td>{data.costo}</td>
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

        
        {children}
        {/**Para hacer el llamado del modal de registo de nuevo empaque */}
        <NewMaterialP
        estado5={estadoRegistro5}
        CambiarEstado5={cambiarEstadoRegistro5}

        ></NewMaterialP>
        </>

    )

}
export default TableMaterial