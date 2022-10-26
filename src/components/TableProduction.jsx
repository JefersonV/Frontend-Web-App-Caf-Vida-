import React from 'react'
import {useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import '../assets/styles/TableProduction.css'
import * as BiIcons from 'react-icons/bi'
import * as AiIcons from 'react-icons/ai'
import CalculoCosto from '../components/CalculoCosto'
import CalculoCostoUpdate from '../components/CalculoCostoUpdate'
import { useResultsSearchContext, useSearcherContext } from "../providers/SidebarProvider"
import Swal from "sweetalert2";
const TableProduction =({children})=>{

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
            productionDelete(id);
          }
        });
      };


    //Estado para llamar el modal de calculo de costo
    const [estadoCosto, cambiarEstadoCosto] = useState(false);
    const [estadoCosto2, cambiarEstadoCosto2] = useState(false);
    const [idEdit,setIdEdit] = useState("");
    //dato del estado global
    //const results = useResultsSearchContext()
    //Función de búsqueda
    const searcher = useSearcherContext()

    //Array de los registros
    const [data, setData] = useState([]);

    //Funcion para obtener la lista de datos
    const getData = async () => {
      const response = await fetch( 
        "http://localhost:4000/production_cost",
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

  //Funcion eliminar
  const productionDelete = async (id) => {
    console.log("click -> Id: ", id);
    await fetch(`http://localhost:4000/production_cost/${id}`, {
      method: "DELETE",
      headers: {
        token: localStorage.token,
      },
    });
    setData(data.filter((data) => data.id_costo_produccion !== id));
  };

   


    return(
        <>
        <div className="TopBar">
            <div className="Contenido">
                <label htmlFor="lab" id="lab"> Costos de Producción</label>
                
                <Link to="/menu_costos" className="link1"> Establecer / Modificar Costos</Link>
                <Link><button className="link2" onClick={()=> cambiarEstadoCosto(!estadoCosto)}> Calcular Nuevo Costo</button></Link></div>
            <div className="search">
                <label htmlFor="lab2" id="lab2"> Buscar</label>
                <input type="search" placeholder="Buscar..." id="Buscar" onChange={searcher} />
                
            </div>
        </div>

        <div className="wrapper-exterior" >
   <div className="table-wrapper" > 
        <table className="table table-striped w-80 thead-light ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Materia Prima</th>
            <th scope="col">Costo Materia Prima</th>
            <th scope="col">Unidad de medida</th>
            <th scope="col">Empaque</th>
            <th scope="col">Costo de Empaque</th>
            <th scope="col">Servicio</th>
            <th scope="col">Costo de Servicio</th>
            <th scope="col"> Precio Venta</th>
            <th scope="col">Costo por venta</th>
            <th scope="col">Ganancia Adquirida</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
            {/**Data que trae el Hook Fetch */}
            {data.map((data,index)=>{
                return(
            <tr key={data.id_costo_produccion}>
                <th>{index + 1}</th>
                <td>{data.fecha}</td>
                <td>{data.cantidad}</td>
                <td>{data.materia_prima}</td>
                <td>{data.costo_materia}</td>
                <td>{data.unidad_de_medida}</td>
                <td>{data.tipo_empaque}</td>
                <td>{data.costo_empaque}</td>
                <td>{data.servicio}</td>
                <td>{data.costo_servicio}</td>
                <td>{data.precio_venta}</td>
                <td>{data.costo_por_libra}</td>
                <td>{data.ganancia_neta}</td>

            <td>
            <button className='btn-editar'
            onClick={()=>{cambiarEstadoCosto2(!estadoCosto2);
            setIdEdit(data.id_costo_produccion);
          }}>
                <BiIcons.BiEdit color="darkblue" className="icon-edit icon-table" title="Editar Dato"/>
            </button>

            <button
            className='btn-borrar'
             onClick={()=>deleteSweet(data.id_costo_produccion)}
                ><AiIcons.AiOutlineDelete color="darkred" className="icon-delete icon-table" title="Eliminar registro"/>
            </button>
        </td>
        
        </tr>
        )
         })
        }

        </tbody>
        </table>
        </div>
        </div>
        {children}
        <CalculoCosto
        estado={estadoCosto}
        CambiarEstado ={cambiarEstadoCosto}
        ></CalculoCosto>

        <CalculoCostoUpdate
        estado2={estadoCosto2}
        cambiarEstado2={cambiarEstadoCosto2}
        idEdit={idEdit}
        ></CalculoCostoUpdate>

        </>

    )
}
export default TableProduction