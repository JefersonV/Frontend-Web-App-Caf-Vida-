import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiEdit } from "react-icons/bi";
import "../../assets/styles/Sales.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ModalClientUpdate = ({ children, estado2, cambiarEstado2, idEdit }) => {
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
        //handleClick();
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
  //Array de los registros PRUEBA
  const [newData, setNewData] = useState([]);

  //Array de los registros
  const [data, setData] = useState([]);

  //Funcion para obtener la lista de datos
  const getData = async (id) => {
    const response = await fetch(`http://localhost:3000/costumers/${id}`, {
      headers: {
        token: localStorage.token,
      },
    });
    const data = await response.json();
    setData(data);
    setDataCliente({
      nombre: data.nombre,
      telefono: data.telefono,
      correo: data.correo,
      direccion: data.direccion,
      nit: data.nit,
    });
  };
  console.log(data);

  //funcion useffect para llamar y cargar los datos
  useEffect(() => {
    if (idEdit) {
      getData(idEdit);
    }
  }, [idEdit]);

  // Captura de datos del formulario para la API
  const [dataCliente, setDataCliente] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    direccion: "",
    nit: "",
  });

  //const history = useHistory();
  const onChangeData = (e) => {
    setDataCliente({ ...dataCliente, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };

  //Evento de envío del formulario
  const onSubmitForm = async (e) => {
    e.preventDefault();
    //console.log(dataProduct);

    try {
      const response = await fetch(
        `http://localhost:3000/costumers/${idEdit}`,
        {
          method: "PUT",
          body: JSON.stringify(dataCliente),
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },
        }
      );
      // const data = await response.json();
      console.log(response);
      if (response.status === 204) {
        saveSweetalert();
      }
    } catch (error) {
      console.log(error.massage);
    }
  };

  //PRUEBA
  const getNewData = async () => {
    const newResponse = await fetch(`http://localhost:3000/costumers`, {
      headers: {
        token: localStorage.token,
      },
    });
    const newData = newResponse.json();
    setNewData(newData);
  };

  return (
    <>
      {estado2 && (
        <Overlay1>
          <ContenedorModal>
            <h1>
              <BiEdit size="2rem" color="darkgreen" />
              Actualizar Cliente{" "}
            </h1>
            {/* <Form onSubmit={onSubmitForm}> */}
            <form onSubmit={onSubmitForm}>
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
                    value={dataCliente.nombre}
                    onChange={(e) => onChangeData(e)}
                  />
                </div>

                <label htmlFor="" className="lal3">
                  {" "}
                  Telefono{" "}
                </label>
                <div className="boddy">
                  <input
                    className="txt1"
                    type="number"
                    name="telefono"
                    placeholder=" Ingrese telefono"
                    value={dataCliente.telefono}
                    onChange={(e) => onChangeData(e)}
                  />
                </div>
                <label htmlFor="" className="lal3">
                  {" "}
                  Correo{" "}
                </label>
                <div className="boddy">
                  <input
                    className="txt1"
                    type="text"
                    name="correo"
                    placeholder=" Ingrese correo"
                    value={dataCliente.correo}
                    onChange={(e) => onChangeData(e)}
                  />
                </div>
                <label htmlFor="" className="lal5">
                  {" "}
                  Direccion{" "}
                </label>
                <div className="boddy">
                  <input
                    className="txt1"
                    type="text"
                    name="direccion"
                    placeholder=" Ingrese direccion"
                    value={dataCliente.direccion}
                    onChange={(e) => onChangeData(e)}
                  />
                </div>
                <label htmlFor="" className="lal3">
                  {" "}
                  NIT{" "}
                </label>
                <div className="boddy">
                  <input
                    className="txt1"
                    type="number"
                    name="nit"
                    placeholder="Ingrese No. NIT"
                    value={dataCliente.nit}
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
                    onClick={() => saveSweetalert()}
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
export default ModalClientUpdate;

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
