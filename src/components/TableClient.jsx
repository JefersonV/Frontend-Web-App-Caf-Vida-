import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Table.css";
import * as AiIcons from "react-icons/ai";
import * as FcIcons from "react-icons/fc";
import Swal from "sweetalert2";
import ModalClientUpdate from "./modals/ModalClientUpdate";

const TableClient = ({ children }) => {
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  const [idEdit, setIdEdit] = useState("");
  console.log(idEdit);
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
        productDelete(id);
      }
    });
  };

  //Array de los registros
  const [data, setData] = useState([]);

  //Funcion para obtener la lista de datos
  const getData = async () => {
    const response = await fetch("http://localhost:3000/customers", {
      headers: {
        token: localStorage.token,
      },
    });
    const data = await response.json();
    setData(data);
  };

  //funcion useffect para llamar y cargar los datos
  useEffect(() => {
    getData();
  }, []);

  //Funcion eliminar
  const productDelete = async (id) => {
    console.log("click -> Id: ", id);
    await fetch(`http://localhost:3000/customers/${id}`, {
      method: "DELETE",
      headers: {
        token: localStorage.token,
      },
    });
    setData(data.filter((data) => data.id_cliente !== id));
  };

  return (
    <>
      <div>
        <div>
          <button className="btn-update-table" onClick={getData}>
            Actualizar Tabla
          </button>
          <table className="table table-striped w-80 thead-light ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Telefono</th>
                <th scope="col">Correo</th>
                <th scope="col">Dirección</th>
                <th scope="col">NIT</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* La data que trae el Hook Fetch se mapea y se creará una fila para cada item. */}
              {/* {results.map((item, index) => { */}
              {data.map((data, index) => {
                return (
                  <tr key={data.id_cliente}>
                    <th>{index + 1}</th>
                    <td>{data.nombre}</td>
                    <td>{data.telefono}</td>
                    <td>{data.correo}</td>
                    <td>{data.direccion}</td>
                    <td>{data.nit}</td>
                    <td>
                      <button
                        className="btn-borrar"
                        onClick={() => {
                          cambiarEstadoModal2(!estadoModal2);
                          setIdEdit(data.id_cliente);
                        }}
                      >
                        <AiIcons.AiOutlineEdit
                          className="icon-eye icon-table"
                          title="Editar registro"
                        />
                      </button>
                      {/* <Link to="/products/:id/edit">
                        <AiIcons.AiOutlineEdit
                          className="icon-eye icon-table"
                          title="Editar registro"
                        />
                      </Link> */}
                      <button
                        className="btn-borrar"
                        onClick={() => deleteSweet(data.id_cliente)}
                      >
                        <FcIcons.FcFullTrash
                          className="icon-print icon-table"
                          title="Borrar registro"
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {children}
        </div>
        {/* Traemos el modal y le pasamos los props */}
        <ModalClientUpdate
          estado2={estadoModal2}
          cambiarEstado2={cambiarEstadoModal2}
          idEdit={idEdit}
        ></ModalClientUpdate>
      </div>
    </>
  );
};

export default TableClient;
