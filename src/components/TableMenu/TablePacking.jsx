import React from "react";
import "../../assets/styles/MenuCostos.css";
import "../../assets/styles/styleTablesMenu.css";
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useResultsSearchContext } from "../../providers/SidebarProvider";
import NewPacking from "../../components/NewPacking";
import NewPackingUpdate from "../ModalesUpdate/NewPackingUpdate";
import Swal from "sweetalert2";
import dayjs from 'dayjs/esm/index.js'

const TablePacking = ({ children }) => {
  const [estadoRegistro3, cambiarEstadoRegistro3] = useState(false);

  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  const [idEdit, setIdEdit] = useState("");

  //const results= useResultsSearchContext()

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
        packingDelete(id);
      }
    });
  };

  //Array de los registros
  const [data, setData] = useState([]);

  //Funcion para obtener la lista de datos
  const getData = async () => {
    const response = await fetch(
      "http://localhost:3000/production_cost/menu_costo/packing_material",
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
  const packingDelete = async (id) => {
    console.log("click -> Id: ", id);
    await fetch(
      `http://localhost:3000/production_cost/menu_costo/packing_material/${id}`,
      {
        method: "DELETE",
        headers: {
          token: localStorage.token,
        },
      }
    );
    setData(data.filter((data) => data.id_empaque !== id));
  };

  return (
    <>
      {/** Se encuentra la tabla de listado de los materiales de empaque*/}
      <div className="MaterialEmpaque">
        <div>
          <label htmlFor="lab" id="label1">
            Materiales de Empaque
          </label>
          <button className="btn-update-table" onClick={getData}>
            Actualizar Tabla
          </button>
          <button
            className="link7"
            onClick={() => cambiarEstadoRegistro3(!estadoRegistro3)}
          >
            {" "}
            Agregar nuevo empaque
          </button>{" "}
        </div>

        <div className="wrapper-exterior">
          <div className="table-wrapper">
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
                {data.map((data, index) => {
                  return (
                    <tr key={data.id_empaque}>
                      <th>{index + 1}</th>
                      <td>{dayjs(data.fecha).format('DD/MM/YYYY')}</td>
                      <td>{data.nombre}</td>
                      <td>Q. {data.costo_empaque}</td>

                      <td>
                        <button
                          className="btn-editar"
                          onClick={() => {
                            cambiarEstadoModal2(!estadoModal2);
                            setIdEdit(data.id_empaque);
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
                          onClick={() => deleteSweet(data.id_empaque)}
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

      <NewPacking
        estado3={estadoRegistro3}
        CambiarEstado3={cambiarEstadoRegistro3}
      ></NewPacking>
      <NewPackingUpdate
        estado2={estadoModal2}
        cambiarEstado2={cambiarEstadoModal2}
        idEdit={idEdit}
      ></NewPackingUpdate>
    </>
  );
};
export default TablePacking;
