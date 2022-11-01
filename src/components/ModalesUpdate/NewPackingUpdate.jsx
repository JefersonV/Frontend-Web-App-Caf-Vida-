import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiEdit } from "react-icons/bi";
import Swal from "sweetalert2";

const NewMaterialUpdate = ({ children, estado2, cambiarEstado2, idEdit }) => {
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
        cambiarEstado2(false);
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
          cambiarEstado2(false)
        );
      }
    });
  };

  //Array de los registros
  const [data, setData] = useState([]);

  //Funcion para obtener la lista de datos
  const getData = async (id) => {
    const response = await fetch(
      `http://localhost:3000/production_cost/menu_costo/packing_material/${id}`,
      {
        headers: {
          token: localStorage.token,
        },
      }
    );
    const data = await response.json();
    setData(data);
    setDataPacking({
      tipo_empaque: data.nombre,
      costo: data.costo,
    });
  };
  console.log(data);

  useEffect(() => {
    if (idEdit) {
      getData(idEdit);
    }
  }, [idEdit]);

  //para capturar Datos
  const [dataPacking, setDataPacking] = useState({
    tipo_empaque: "",
    costo: "",
  });

  const onChangeData = (e) => {
    setDataPacking({
      ...dataPacking,
      [e.target.name]: e.target.value,
    });
    console.log(dataPacking);
  };

  //Enviar formulario
  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log(dataPacking);
    try {
      const response = await fetch(
        `http://localhost:3000/production_cost/menu_costo/packing_material/${idEdit}`,
        {
          method: "PUT",
          body: JSON.stringify(dataPacking),
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },
        }
      );
      console.log(response);
      if (response.status === 204) {
      }
    } catch (error) {
      console.log(error.massage);
    }
  };

  return (
    <>
      {estado2 && (
        <Overlay>
          <Contenedor>
            <h1>
              <BiEdit size="2rem" color=" rgb(104, 22, 8)" />
              Costos material de empaque
            </h1>
            <form onSubmit={onSubmitForm}>
              <Form2>
                <label htmlFor="" className="lal3">
                  {" "}
                  Material de Empaque{" "}
                </label>
                <label htmlFor="" className="labl4">
                  {" "}
                  Costo de empaque{" "}
                </label>

                <div className="boddy3">
                  <select
                    className="select1"
                    id=""
                    name="tipo_empaque"
                    onChange={(e) => onChangeData(e)}
                  >
                    <option value="">{data.nombre}</option>
                    <option value="1"> Empaque triliminado</option>
                    <option value="2"> Empaque válvula</option>
                    <option value="3"> Empaque con zip y válvula</option>
                  </select>

                  <input
                    className="txt1"
                    type="number"
                    name="costo"
                    value={dataPacking.costo}
                    placeholder=" Ingrese el costo del empaque"
                    onChange={(e) => onChangeData(e)}
                  />
                </div>

                <LinkButt>
                  <button className="btn8" onClick={(e) => saveSweetalert(e)}>
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
export default NewMaterialUpdate;

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
  height: 250px;
  padding: 20px;
  background: #fff;
  position: relative;
  margin-right: 80px;
  margin-left: 100px;
  bottom: 80px;

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

  label {
    margin-top: 5px;
  }
  .labl3 {
    margin-left: 190px;
  }
  .labl4 {
    margin-left: 150px;
  }
  .txt1 {
    margin-left: 80px;
  }
  select {
    width: 180px;
    padding: 3px;
    border: solid 1px #bdc7d8;
    box-shadow: 2px 2px 5px #999;
    margin-left: 2px;
  }
`;
const LinkButt = styled.div`
  margin-top: 30px;
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
