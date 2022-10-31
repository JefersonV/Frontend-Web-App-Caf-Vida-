import React from "react";
import "../../assets/styles/MenuCostos.css";
// import "../../assets/styles/styleTablesMenu.css";
// import "../assets/styles/Sales.css";
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useResultsSearchContext } from "../../providers/SidebarProvider";
import NewService from "../../components/NewService";
import NewServiceUpdate from "../ModalesUpdate/NewServiceUpdate";
import Swal from "sweetalert2";

const TableService = ({ children }) => {
  //const results= useResultsSearchContext()
  //Estado para llamar el modal para los nuevos ingresos
  const [estadoRegistro4, cambiarEstadoRegistro4] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  const [idEdit, setIdEdit] = useState("");

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
        serviceDelete(id);
      }
    });
  };

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

  //Funcion para elminar registro
  const serviceDelete = async (id) => {
    console.log("click -> Id: ", id);
    await fetch(
      `http://localhost:4000/production_cost/menu_costo/service/${id}`,
      {
        method: "DELETE",
        headers: {
          token: localStorage.token,
        },
      }
    );
    setData(data.filter((data) => data.id_servicio_cafe !== id));
  };

  return (
    <>
      {/**Tabla del listado de Servicios que se registran */}
      <div className="listadoServicio">
        <div>
          <label htmlFor="lab" id="label1">
            Servicio
          </label>
          <button
            className="link6"
            onClick={() => cambiarEstadoRegistro4(!estadoRegistro4)}
          >
            {" "}
            Agregar Nuevo Servicio
          </button>{" "}
        </div>

        <div className="wrapper-exterior">
          <div className="table-wrapper">
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
                {data.map((data, index) => {
                  return (
                    <tr key={data.id_servicio_cafe}>
                      <th>{index + 1}</th>
                      <td>{data.fecha}</td>
                      <td>{data.servicio}</td>
                      <td>{data.materia_prima}</td>
                      <td>{data.unidad_de_medida}</td>
                      <td>{data.costo_servicio}</td>

                      <td>
                        <button
                          className="btn-editar"
                          onClick={() => {
                            cambiarEstadoModal2(!estadoModal2);
                            setIdEdit(data.id_servicio_cafe);
                          }}
                        >
                          <BiIcons.BiEdit
                            color="darkblue"
                            className="icon-edit icon-table"
                            title="Editar Dato"
                          />
                        </button>
                        <Link
                          to="#"
                          onClick={() => deleteSweet(item.id_servicio_cafe)}
                        >
                          <AiIcons.AiOutlineDelete
                            color="darkred"
                            className="icon-delete icon-table"
                            title="Eliminar registro"
                          />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {children}
      {/**Para hacer el llamado del modal de registo de nuevo servicio */}
      <NewService
        estado4={estadoRegistro4}
        CambiarEstado4={cambiarEstadoRegistro4}
      ></NewService>

      <NewServiceUpdate
        estado4={estadoModal2}
        CambiarEstado4={cambiarEstadoModal2}
        idEdit={idEdit}
      ></NewServiceUpdate>
    </>
  );
};
export default TableService;
