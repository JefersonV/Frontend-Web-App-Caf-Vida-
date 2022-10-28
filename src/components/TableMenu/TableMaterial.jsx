import React, { useEffect, useState } from 'react'
import '../../assets/styles/MenuCostos.css'
import '../../assets/styles/styleTablesMenu.css'
import * as BiIcons from 'react-icons/bi'
import * as AiIcons from 'react-icons/ai'
import { Link } from "react-router-dom"
import { useResultsSearchContext } from '../../providers/SidebarProvider'
import NewMaterialP from '../../components/NewMaterialP'
import NewMaterialPUpdate from '../ModalesUpdate/NewMaterialPUpdate'
import Swal from "sweetalert2";

const TableMaterial =({children})=>{
      
  const deleteSweet = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Quieres eliminar el registro!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminalo!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "El registro se ha elimando", "success");
        materialDelete(id);
      }
    });
  };
  
  //Array de los registros
  const [data, setData] = useState([]);

  //Funcion para obtener la lista de datos
  const getData = async () => {
    const response = await fetch( 
      "http://localhost:4000/production_cost/menu_costo/raw_material",
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



  //Funcion para elminar registro
  const materialDelete = async (id) => {
    console.log("click -> Id: ", id);
    await fetch(`http://localhost:4000/production_cost/menu_costo/raw_material/${id}`, {
      method: "DELETE",
      headers: {
        token: localStorage.token,
      },
    });
    setData(data.filter((data) => data.id_materia_prima !== id));
  };

    //const sidebar = useSidebarContext()
    //data del estado global
  //const results= useResultsSearchContext()
  //Estado para llamar el modal para los nuevos ingresos
  const[estadoRegistro5,cambiarEstadoRegistro5]=useState(false);
  const [estadoUpdate, cambiarEstadoUpdate]=useState(false);
  const [idEdit,setIdEdit] = useState("");

    return(
        <>
        
            {/**Tabla del listado de MAteria Prima */}
            <label htmlFor="lab" id="label1">Materia Prima</label>
            <button className="link4" onClick={()=> cambiarEstadoRegistro5(!estadoRegistro5)}> Agregar Nueva Materia Prima</button> 
            
            <div className="wrapper-exterior" >
   <div className="table-wrapper" > 
        <table className="table table-striped w-80 thead-light ">
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
            {data.map((data,index)=>{
                return(
            <tr key={data.id_materia_prima}>
                <th>{index + 1}</th>
                <td>{data.fecha}</td>
                <td>{data.tipo_materia}</td>
                <td>{data.cantidad}</td>
                <td>{data.unidad_medida}</td>
                <td>{data.costo}</td>
            <td>
            <button className='btn-editar'
            onClick={()=> {cambiarEstadoUpdate(!estadoUpdate);
            setIdEdit(data.id_materia_prima);
          }}
            >
                <BiIcons.BiEdit color="darkblue" className="icon-edit icon-table" title="Editar Dato"/>
            </button>

            <Link to ="#"
            onClick={() => deleteSweet(data.id_materia_prima)}>
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
        {/**Para hacer el llamado del modal de registo de nuevo empaque */}
        <NewMaterialP
        estado5={estadoRegistro5}
        CambiarEstado5={cambiarEstadoRegistro5}

        ></NewMaterialP>

<NewMaterialPUpdate
estado5={estadoUpdate}
CambiarEstado5={cambiarEstadoUpdate}
idEdit={idEdit}
></NewMaterialPUpdate>
 </div>
        </>

    );

};
export default TableMaterial;