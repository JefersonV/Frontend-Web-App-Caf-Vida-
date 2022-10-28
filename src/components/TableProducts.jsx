import { React, useEffect, useState } from "react";
import "../assets/styles/Table.css";
import * as AiIcons from "react-icons/ai";
import * as FcIcons from "react-icons/fc";
import Swal from "sweetalert2";
import ModalAddProductUpdate from "../components/modals/ModalAddProductUpdate";

const TableProducts = ({ children }) => {
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
        productDelete(id);
      }
    });
  };

  //Array de los registros
  const [data, setData] = useState([]);

  //Funcion para obtener la lista de datos
  const getData = async () => {
    const response = await fetch("http://localhost:3000/inventory/products", {
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
    await fetch(`http://localhost:3000/inventory/products/${id}`, {
      method: "DELETE",
      headers: {
        token: localStorage.token,
      },
    });
    setData(data.filter((data) => data.id_producto !== id));
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
                <th scope="col">Producto</th>
                <th scope="col">Precio Venta</th>
                <th scope="col">Precio Compra</th>
                <th scope="col">Stock</th>
                <th scope="col">Stock Minimo</th>
                <th scope="col">Presentación</th>
                <th scope="col">Tipo Producto</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* La data que trae el Hook Fetch se mapea y se creará una fila para cada item. */}
              {/* {results.map((item, index) => { */}
              {data.map((data, index) => {
                return (
                  <tr key={data.id_producto}>
                    <th>{index + 1}</th>
                    <td>{data.producto}</td>
                    <td>Q. {data.precio_venta}</td>
                    <td>Q. {data.costo_compra}</td>
                    <td>{data.stock_actual}</td>
                    <td>{data.stock_minimo}</td>
                    <td>{data.unidad_medida}</td>
                    <td>{data.tipo_producto}</td>
                    <td>
                      <button
                        className="btn-borrar" //btn-editar
                        onClick={() => {
                          cambiarEstadoModal2(!estadoModal2);
                          // Dirigir a la pagina que abre el modal para actualizar
                          //history.push(`/products/${data.id_producto}/edit`);
                          setIdEdit(data.id_producto);
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
                        onClick={() => deleteSweet(data.id_producto)}
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
        <ModalAddProductUpdate
          estado2={estadoModal2}
          cambiarEstado2={cambiarEstadoModal2}
          idEdit={idEdit}
        ></ModalAddProductUpdate>
      </div>
    </>
  );
};

export default TableProducts;
