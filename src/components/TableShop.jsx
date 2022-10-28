import { React, useEffect, useState } from "react";
import "../assets/styles/Table.css";
import "../assets/styles/StyleTopBarTableShop.css";
import * as AiIcons from "react-icons/ai";
import * as FcIcons from "react-icons/fc";
import Swal from "sweetalert2";
import ModalShopUp from "./ModalShopUp";

const TableShop = ({ children }) => {
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  const [idOfEdit, setIdOfEdit] = useState("");

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
        ShopDelete(id);
      }
    });
  };

  //Array de los registros
  const [data, setData] = useState([]);

  //Funcion para obtener la lista de datos
  const getData = async () => {
    const response = await fetch("http://localhost:3000/inventory/shopping/", {
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
  const ShopDelete = async (id) => {
    console.log("click -> Id: ", id);
    await fetch(`http://localhost:3000/inventory/shopping/${id}`, {
      method: "DELETE",
      headers: {
        token: localStorage.token,
      },
    });
    setData(data.filter((data) => data.id_compra !== id));
  };

  return (
    <>
      <div>
        <button
          className="Boton-Actualizar"
          onClick={() => {
            getData();
          }}
        >
          {" "}
          <span>Actualizar Tabla</span>
        </button>
        <div>
          <table className="table table-striped w-80 thead-light ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Proveedor</th>
                <th scope="col">Fecha</th>
                <th scope="col">Total</th>
                <th scope="col">Tipo Comprobante</th>
                <th scope="col">Modo de Pago</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {/* La data que trae el Hook Fetch se mapea y se creará una fila para cada item. */}
              {/* {results.map((item, index) => { */}
              {data.map((data) => {
                return (
                  <tr key={data.id_compra}>
                    <th>{data.id_compra}</th>
                    <td>{data.proveedor}</td>
                    <td>{data.fecha}</td>
                    <td>{data.total}</td>
                    <td>{data.tipo_comprbante}</td>
                    <td>{data.modo_pago}</td>
                    <td>
                      <button
                        className="btn-borrar"
                        onClick={() => {
                          cambiarEstadoModal2(!estadoModal2);
                          setIdOfEdit(data.id_compra);
                          console.log(
                            "id dentro de la tabla: ",
                            data.id_compra
                          );
                          console.log("Id que se va a enviar: ", idOfEdit);
                          /* console.log("Boton tabla id:", data.id_compra); */
                        }}
                      >
                        <AiIcons.AiOutlineEdit
                          className="icon-eye icon-table"
                          title="Editar registro"
                        />
                      </button>

                      <button
                        className="btn-borrar"
                        onClick={() => deleteSweet(data.id_compra)}
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
        <ModalShopUp
          estado2={estadoModal2}
          cambiarEstado2={cambiarEstadoModal2}
          idEdit={idOfEdit}
        ></ModalShopUp>
      </div>
    </>
  );
};

export default TableShop;
