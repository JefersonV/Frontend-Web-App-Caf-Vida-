import React, { useState } from "react";
import styled from "styled-components";
import { BiEdit } from "react-icons/bi";
import "../../assets/styles/Sales.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ModalAddProduct = ({ children, estado2, cambiarEstado2 }) => {
  const saveSweetalert = () => {
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Registro Guardado!!",
      showConfirmButton: true,
      confirmButtonColor: "green",
      //background:'black'
    }).then((result) => {
      if (result.isConfirmed) {
        cambiarEstado2(false);
      }
    });
  };

  const cancelSweet = () => {
    Swal.fire({
      title: "¿Está seguro de cancelar ?",
      text: "Los datos ingresados no se guardaran  ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Cancelado",
          "El registro ha sido cancelado",
          "success",
          cambiarEstado2(false)
        );
      }
    });
  };

  // Captura de datos del formulario para la API
  const [dataProduct, setDataProduct] = useState({
    nombre: "",
    stock_ingreso: "",
    unidad_medida: "",
    tipo_producto: "",
    precio_venta: "",
    stock_minimo: "",
  });

  //const history = useHistory();
  const onChangeData = (e) => {
    setDataProduct({ ...dataProduct, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };

  //Evento de envío del formulario
  const onSubmitForm = async (e) => {
    e.preventDefault();
    //console.log(dataProduct);

    try {
      const response = await fetch("http://localhost:3000/inventory/products", {
        method: "POST",
        body: JSON.stringify(dataProduct),
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
      });
      // const data = await response.json();
      console.log(response);
      if (response.status === 204) {
        saveSweetalert();
      }
    } catch (error) {
      console.log(error.massage);
    }
  };

  return (
    <>
      {estado2 && (
        <Overlay1>
          <ContenedorModal>
            <h1>
              <BiEdit size="2rem" color="darkgreen" />
              Ingreso de Productos{" "}
            </h1>
            {/* <Form onSubmit={onSubmitForm}> */}
            <form>
              <Form>
                <label htmlFor="" className="lal2">
                  {" "}
                  Producto{" "}
                </label>
                <div className="boddy">
                  <input
                    className="txt1"
                    autocomplete="off"
                    type="text"
                    name="nombre"
                    placeholder=" Ingrese nombre producto"
                    //value={producto}
                    onChange={(e) => onChangeData(e)}
                  />
                </div>

                <label htmlFor="" className="lal3">
                  {" "}
                  Stock a Ingresar{" "}
                </label>
                <div className="boddy">
                  <input
                    className="txt1"
                    type="number"
                    name="stock_ingreso"
                    placeholder=" Cantidad a ingresar"
                    //value={stock_ingreso}
                    onChange={(e) => onChangeData(e)}
                  />
                </div>
                <label htmlFor="" className="lal3">
                  {" "}
                  Presentación{" "}
                </label>
                <div className="boddy">
                  <select
                    className="txt1"
                    id=""
                    name="unidad_medida"
                    onChange={(e) => onChangeData(e)}
                  >
                    <option value="">Seleccione el tipo...</option>
                    <option value="1"> 1 Libra</option>
                    <option value="2"> 1/2 Libra</option>
                  </select>
                </div>
                <label htmlFor="" className="lal5">
                  {" "}
                  Tipo de Producto{" "}
                </label>
                <div className="boddy">
                  <select
                    className="txt1"
                    id=""
                    name="tipo_producto"
                    onChange={(e) => onChangeData(e)}
                  >
                    <option value="">Seleccione el tipo...</option>
                    <option value="1"> Café Molido</option>
                  </select>
                </div>
                <label htmlFor="" className="lal3">
                  {" "}
                  Stock Minimo{" "}
                </label>
                <div className="boddy">
                  <input
                    className="txt1"
                    type="number"
                    name="stock_minimo"
                    placeholder="Ingrese stock minimo"
                    //value={stock_minimo}
                    onChange={(e) => onChangeData(e)}
                  />
                </div>

                <label htmlFor="" className="la4">
                  {" "}
                  Precio Venta
                </label>
                <div className="boddy">
                  <input
                    className="txt1"
                    type="number"
                    name="precio_venta"
                    placeholder=" Ingrese precio venta"
                    //value={precio_venta}
                    onChange={(e) => onChangeData(e)}
                  />
                </div>

                <LinkButt>
                  <Link to="#" className="btn8" onClick={() => cancelSweet()}>
                    {" "}
                    Cancelar
                  </Link>
                  <button
                    // type="submit"
                    className="btn9"
                    onClick={(e) => onSubmitForm(e)}
                  >
                    {" "}
                    Guardar{" "}
                  </button>
                </LinkButt>

                {children}
              </Form>
            </form>
          </ContenedorModal>
        </Overlay1>
      )}
    </>
  );
};
export default ModalAddProduct;

const Overlay1 = styled.div`
  width: 100vw;
  height: 95vh;
  position: fixed;
  top: 57px;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ContenedorModal = styled.div`
  width: 550px;
  height: 570px;
  padding: 20px;
  background: #fff;
  position: relative;
  margin-right: 80px;
  margin-left: 100px;
  bottom: 30px;
  border-radius: 5px;

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  h1 {
    text-align: center;
    margin-top: 0;
    font-size: 21px;
    margin-right: 200px;
    margin-left: 0;
  }
`;

const Form = styled.div`
  margin-top: 20px;
  margin-left: 40px;
  input {
    width: 430px;
    padding: 3px;
    border: solid 1px #bdc7d8;
    box-shadow: 2px 2px 5px #999;
    border-radius: 3px;
  }
  label {
    margin-top: 5px;
  }
  .txt2 {
    width: 210px;
  }
  .txt3 {
    margin-left: 10px;
    width: 210px;
  }
`;
const LinkButt = styled.div`
  margin-top: 30px;
  .btn9 {
    border: solid 1px;
    box-shadow: 3px 3px 7px rgb(75, 33, 122);
    padding: 5px;
    margin-left: 100px;
    background-color: lightseagreen;
    border-color: lightseagreen;
    border-radius: 5px;
  }
  .btn8 {
    padding: 5px;
    margin-left: 100px;
    background-color: rgba(230, 24, 24, 0.897);
    border: solid 1px;
    box-shadow: 3px 3px 7px rgb(75, 33, 122);
    border-color: rgba(24, 223, 230, 0.897);
    border-radius: 5px;
  }
`;
