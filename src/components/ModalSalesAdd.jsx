import React, {useState} from "react";
import styled from "styled-components";
import { BiEdit } from "react-icons/bi";
import "../assets/styles/Sales.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ModalSalesAdd = ({ children, estado2, cambiarEstado2 }) => {
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
  const [dataClient, setDataClient] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    direccion: "",
    nit: "",
  })

  const { nombre, telefono, correo, direccion, nit } = dataClient;

  const onChangeData = e => {
    setDataClient({ ...dataClient, [e.target.name]: e.target.value })
    console.log(dataClient)
  }

  //Evento de envío del formularioy
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      // cuerpo del JSON
      const body = { nombre, telefono, correo, direccion, nit };

      const response = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      localStorage.setItem("token", parseRes.token);

      setAuth(true);
    } catch (err) {
      console.error(err.massage);
    }
  };

  return (
    <>
      {estado2 && (
        <Overlay1>
          <ContenedorModal>
            <h1>
              <BiEdit size="2rem" color="darkgreen" />
              Registro de clientes{" "}
            </h1>
            {/* <Form onSubmit={onSubmitForm}> */}
            <Form>
              <label htmlFor="" className="lal2">
                {" "}
                Nombre{" "}
              </label>
              <div className="boddy">
                <input
                  className="txt1"
                  type="text"
                  name="nombre"
                  placeholder=" Ingrese nombre"
                  value={nombre}
                  onChange={(e) => onChangeData(e)}
                />
              </div>

              <label htmlFor="" className="lal3">
                {" "}
                Teléfono{" "}
              </label>
              <div className="boddy3">
                <input
                  className="txt1"
                  type="phone"
                  name="telefono"
                  placeholder=" Ingrese numero"
                  value={telefono}
                  onChange={(e) => onChangeData(e)}
                />
                <label htmlFor="" className="lal3">
                {" "}
                Correo{" "}
              </label>
                <input
                  className="txt1"
                  type="email"
                  name="correo"
                  placeholder="Ingrese correo"
                  value={correo}
                  onChange={(e) => onChangeData(e)}
                />
              </div>

              <label htmlFor="" className="la4">
                {" "}
                Dirección
              </label>
              <div className="boddy4">
                <input
                  className="txt4"
                  type="text"
                  name="direccion"
                  placeholder=" Ingrese Dirección"
                  value={direccion}
                  onChange={(e) => onChangeData(e)}
                />
              </div>

              <label htmlFor="" className="lal5">
                {" "}
                Nit{" "}
              </label>
              <div className="boddy5">
                <input
                  className="txt5"
                  type="text"
                  name="nit"
                  placeholder=" Ingrese NIT"
                  value={nit}
                  onChange={(e) => onChangeData(e)}
                />
              </div>

              <LinkButt>
                <button className="btn8" onClick={() => cancelSweet()}>
                  {" "}
                  Cancelar
                </button>
                <button className="btn9" onClick={() => saveSweetalert()}>
                  {" "}
                  Guardar{" "}
                </button>
              </LinkButt>

              {children}
            </Form>
          </ContenedorModal>
        </Overlay1>
      )}
    </>
  );
};
export default ModalSalesAdd;

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
  height: 500px;
  padding: 20px;
  background: #fff;
  position: relative;
  margin-right: 80px;
  margin-left: 100px;
  bottom: 30px;

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  h1 {
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
    background-color: rgba(24, 223, 230, 0.897);
  }
  .btn8 {
    padding: 5px;
    margin-left: 100px;
    background-color: rgba(230, 24, 24, 0.897);
    border: solid 1px;
    box-shadow: 3px 3px 7px rgb(75, 33, 122);
  }
`;
