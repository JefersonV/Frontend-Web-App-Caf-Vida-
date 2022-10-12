import React from "react";
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

  return (
    <>
      {estado2 && (
        <Overlay1>
          <ContenedorModal>
            <h1>
              <BiEdit size="2rem" color="darkgreen" />
              Registro de clientes{" "}
            </h1>
            <Form>
              <label htmlFor="" className="lal1">
                {" "}
                Código{" "}
              </label>
              <div className="boddy">
                <input
                  className="txt1"
                  type="text"
                  placeholder=" Código autogenerado"
                  disabled
                />
              </div>

              <label htmlFor="" className="lal2">
                {" "}
                Nombre{" "}
              </label>
              <div className="boddy">
                <input
                  className="txt1"
                  type="text"
                  placeholder=" Ingrese nombre"
                  required
                />
              </div>

              <label htmlFor="" className="lal3">
                {" "}
                Teléfono{" "}
              </label>
              <div className="boddy3">
                <input
                  className="txt2"
                  type="phone"
                  placeholder=" Ingrese numero"
                  required
                />
                <input
                  className="txt3"
                  type="phone"
                  placeholder=" Ingrese numero"
                  required
                />
              </div>

              <label htmlFor="" className="la4">
                {" "}
                NIT
              </label>
              <div className="boddy4">
                <input
                  className="txt4"
                  type="text"
                  placeholder=" Ingrese NIT"
                  required
                />
              </div>

              <label htmlFor="" className="lal5">
                {" "}
                Dirección{" "}
              </label>
              <div className="boddy5">
                <input
                  className="txt5"
                  type="text"
                  placeholder=" Ingrese Dirección"
                  required
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
