import React, { useState } from "react";
import styled from "styled-components";
import { BiEdit } from "react-icons/bi";
import Swal from "sweetalert2";

const CalculoCosto = ({ children, estado, CambiarEstado }) => {
  const saveSweetalert = () => {
    Swal.fire({
      position: "top-center",
      icon: "success",
      iconColor: "rgb(7, 14, 88) ",
      title: "Registro Guardado!!",
      showConfirmButton: true,
      confirmButtonColor: "rgb(7, 14, 88)",
      //background:'black'
    }).then((result) => {
      if (result.isConfirmed) {
        CambiarEstado(false);
      }
    });
  };

  const cancelSweet = () => {
    Swal.fire({
      title: "¿Está seguro de cancelar ?",
      text: "Los datos ingresados no se guardaran  ",
      icon: "warning",
      iconColor: "rgb(93, 8, 104)",
      showCancelButton: true,
      confirmButtonColor: "rgb(7, 46, 163)",
      cancelButtonColor: "rgb(163, 7, 39)",
      confirmButtonText: "Si, cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Cancelado",
          "El registro ha sido cancelado",
          "success",
          CambiarEstado(false)
        );
      }
    });
  };

  //para capturar Datos
  const [dataProduction, setDataProduction] = useState({
    cantidad: 0,
    precio_venta: 0,
    id_empaque: "",
    id_tipo_materia: "",
    id_unidad_medida: "",
    id_servicio_cafe: "",
  });

  const onChangeData = (e) => {
    setDataProduction({ ...dataProduction, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };

  //Enviar formulario
  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log(dataProduction);
    try {
      const response = await fetch("http://localhost:3000/production_cost", {
        method: "POST",
        body: JSON.stringify(dataProduction),
        headers: { 
          "Content-Type": "application/json",
          token: localStorage.token,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error.massage);
    }
  };

  return (
    <>
      {estado && (
        <Overlay>
          <Contenedor>
            <h1>
              <BiEdit size="2rem" color=" rgb(104, 22, 8)" />
              Cálculo costo de producción
            </h1>
            <form onSubmit={onSubmitForm}>
              <Form2>
                <label htmlFor="" className="labl3">
                  {" "}
                  Tipo materia prima{" "}
                </label>
                <div className="boddy">
                  <select
                    className="selec1"
                    name="id_tipo_materia"
                    onChange={(e) => onChangeData(e)}
                  >
                    <option value="">Seleccione materia prima..</option>
                    <option value="1">Cafe pergamino</option>
                    <option value="2">Cafe grano</option>
                  </select>
                </div>

                <label htmlFor="" className="lal3">
                  {" "}
                  Cantidad Transformada{" "}
                </label>
                <label htmlFor="" className="labl4">
                  {" "}
                  Unidad de Medida{" "}
                </label>

                <div className="boddy3">
                  <input
                    className="txt1"
                    type="number"
                    name="cantidad"
                    placeholder=" Ingrese cantidad"
                    onChange={(e) => onChangeData(e)}
                  />
                  <select
                    className="select1"
                    name="id_unidad_medida"
                    onChange={(e) => onChangeData(e)}
                  >
                    <option value="">Seleccione la medida...</option>
                    <option value="1">1/2 libra</option>
                    <option value="2">1  libra</option>
                    <option value="3">Quintal</option>
                  </select>
                </div>

                <label htmlFor="" className="la4">
                  {" "}
                  Empaque utilizado
                </label>
                <label htmlFor="" className="labl5">
                  {" "}
                  Servicio Adquirido{" "}
                </label>
                <div className="boddy4">
                  <select
                    className="select2"
                    name="id_empaque"
                    onChange={(e) => onChangeData(e)}
                  >
                    <option value="">Seleccionar empaque...</option>
                    <option value="1">Empaqu válvula</option>
                    <option value="2">Empaque triliminado</option>
                    <option value="3">Empaque con zip y válvula</option>
                  </select>

                  <select
                    className="select1"
                    name="id_servicio_cafe"
                    onChange={(e) => onChangeData(e)}
                  >
                    <option value="">Seleccionar servicio</option>
                    <option value="1">Tueste de café</option>
                    <option value="2">Trillado de Café</option>
                  </select>
                </div>
                <label htmlFor="" className="lal5">
                  {" "}
                  Precio venta por Libra{" "}
                </label>
               

                <div className="boddy5">
                  <input
                    className="txt5"
                    type="text"
                    name="precio_venta"
                    //value={precio_venta}
                    placeholder=" venta por libra"
                    onChange={(e) => onChangeData(e)}
                  />
                 </div>

                <LinkButt>
                  <button className="btn8" onClick={() => saveSweetalert()}>
                    {" "}
                    Guardar
                  </button>
                  <button className="btn9" onClick={() => cancelSweet()}>
                    {" "}
                    Cancelar{" "}
                  </button>
                </LinkButt>

                {children}
              </Form2>
            </form>
          </Contenedor>
        </Overlay>
      )}
    </>
  );
};

export default CalculoCosto;
const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 57px;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Contenedor = styled.div`
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
const Form2 = styled.div`
  margin-top: 30px;
  margin-left: 40px;
  input {
    width: 180px;
    padding: 3px;
    border: solid 1px #bdc7d8;
    box-shadow: 2px 2px 5px #999;
  }
  .select2 {
    width: 180px;
    padding: 3px;
    border: solid 1px #bdc7d8;
    box-shadow: 2px 2px 5px #999;
    margin-left: 2px;
  }
  .selec1 {
    margin-left: 99px;
    width: 230px;
    margin-bottom: 7px;
  }
  .txt6 {
    margin-left: 50px;
  }
  label {
    margin-top: 5px;
  }
  .labl3 {
    margin-left: 150px;
  }
  .labl4 {
    margin-left: 80px;
  }
  .labl5 {
    margin-left: 120px;
  }
  .labl6 {
    margin-left: 80px;
  }
  select {
    width: 180px;
    padding: 5px;
    border: solid 1px #bdc7d8;
    box-shadow: 2px 2px 5px #999;
    margin-left: 50px;
  }
`;
const LinkButt = styled.div`
  margin-top: 50px;
  .btn9 {
    border-radius: 0.5em;
    box-shadow: 4px 4px 7px rgb(73, 16, 139);
    padding: 5px;
    margin-left: 40px;
    background-color: rgba(88, 105, 110, 0.897);
  }
  .btn8 {
    padding: 5px;
    margin-left: 250px;
    background-color: rgba(11, 181, 233, 0.897);
    border-radius: 0.5em;
    box-shadow: 4px 4px 7px rgb(73, 16, 139);
  }
`;
