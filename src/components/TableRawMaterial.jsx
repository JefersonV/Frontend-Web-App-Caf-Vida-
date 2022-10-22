import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Table.css";
import * as AiIcons from "react-icons/ai";
import * as FcIcons from "react-icons/fc";
import { useResultsSearchContext } from "../providers/SidebarProvider";
import Swal from "sweetalert2";

const TableRawMaterial = () => {
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
        Swal.fire("Eliminado!", "El registro se ha elimando", "Exitoso");
        productDelete(id);
      }
    });
  };

  //Array de los registros
  const [data, setData] = useState([]);

  //Funcion para obtener la lista de datos
  const getData = async () => {
    const response = await fetch(
      "http://localhost:3000/inventory/raw_material",
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
  const productDelete = async (id) => {
    console.log("click -> Id: ", id);
    await fetch(`http://localhost:3000/inventory/raw_material/${id}`, {
      method: "DELETE",
      headers: {
        token: localStorage.token,
      },
    });
    setData(data.filter((data) => data.id_materia_prima !== id));
  };
  return (
    <>
      <table className="table table-striped w-80 thead-light ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha</th>
            <th scope="col">Materia Prima</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Unidad Medida</th>
            <th scope="col">Costo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* La data que trae el Hook Fetch se mapea y se creará una fila para cada item. */}
          {data.map((data) => {
            return (
              <tr key={data.id_materia_prima}>
                <th>{data.id_materia_prima}</th>
                <td>{data.fecha}</td>
                <td>{data.tipo_materia}</td>
                <td>{data.cantidad}</td>
                <td>{data.unidad_medida}</td>
                <td>{data.costo}</td>
                <td>
                  <Link to="#">
                    <AiIcons.AiOutlineEdit
                      className="icon-eye icon-table"
                      title="Editar registro"
                    />
                  </Link>
                  <button
                    className="btn-borrar"
                    onClick={() => deleteSweet(data.id_materia_prima)}
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
    </>
  );
};

export default TableRawMaterial;
