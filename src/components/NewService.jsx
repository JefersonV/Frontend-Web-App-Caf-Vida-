import React from 'react';
import styled from 'styled-components'
import { BiEdit } from "react-icons/bi";
import Swal from "sweetalert2";
const NewService=({children, estado4, CambiarEstado4})=>{
    const saveSweetalert = () => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          iconColor:"rgb(7, 14, 88) ",
          title: "Registro Guardado!!",
          showConfirmButton: true,
          confirmButtonColor: "rgb(7, 14, 88)",
          //background:'black'
        }).then((result) => {
          if (result.isConfirmed) {
            CambiarEstado4(false);
          }
        });
      };

      const cancelSweet = () => {
        Swal.fire({
          title: "¿Está seguro de cancelar ?",
          text: "Los datos ingresados no se guardaran  ",
          icon: "warning",
          iconColor:"rgb(93, 8, 104)",
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
              CambiarEstado4(false)
            );
          }
        });
      };
    
    return(
        <>
        {estado4 && (
            <Overlay>
            <Contenedor>
                <h1><BiEdit size="2rem" color=" rgb(104, 22, 8)" />
                Costos material de empaque</h1>
                <Form2>
             

              <label htmlFor="" className="lal3">
                {" "}
                Tipo de Servicio{" "}
              </label>
              <label htmlFor="" className="labl4">
                {" "}
                Costo del servicio{" "}
              </label>

              <div className="boddy3">
               
                <select className='select1'>
                    <option>nombre de material</option>
                </select>

                <input
                  className="txt1"
                  type="number"
                  name="cantidad"
                  placeholder=" Ingrese cantidad"
                  
                />
              </div>

              <label htmlFor="" className="la4">
                {" "}
                Unidad de Medida
              </label>
              
              <div className="boddy4">
                <select className='select2'>
                    <option>Seleccionar Fecha</option>
                </select>
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
            </Contenedor>
        </Overlay>

            
            
            )}
        </>
    );
};
export default NewService

const Overlay =styled.div`
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
const Contenedor =styled.div`
width: 550px;
  height: 350px;
  padding: 20px;
  background: #fff;
  position: relative;
  margin-right: 80px;
  margin-left: 100px;
  bottom: 40px;

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  h1 {
    margin-top: 0;
    font-size: 21px;
    margin-right: 200px;
    margin-left: 0;
  }
`;
const Form2=styled.div`
margin-top: 30px;
  margin-left: 40px;
  input {
    width: 180px;
    padding: 3px;
    border: solid 1px #bdc7d8;
    box-shadow: 2px 2px 5px #999;
  }
  .select2{
    width: 180px;
    padding: 3px;
    border: solid 1px #bdc7d8;
    box-shadow: 2px 2px 5px #999;
    margin-left:2px;
  }
 
  label {
    margin-top: 5px;
  }
.labl3{
    margin-left:190px;
}
.labl4{
    margin-left: 150px;
}
.txt1{
    margin-left: 80px;
}
 select{
    width: 180px;
    padding: 3px;
    border: solid 1px #bdc7d8;
    box-shadow: 2px 2px 5px #999;
    margin-left:2px;
 }

`;
const LinkButt = styled.div`
  margin-top: 50px;
  .btn9 {
    border-radius: .5em;
    box-shadow: 4px 4px 7px rgb(73, 16, 139);
    padding: 5px;
    margin-left: 40px;
    background-color: rgba(88, 105, 110, 0.897);
  }
  .btn8 {
    padding: 5px;
    margin-left: 250px;
    background-color: rgba(11, 181, 233, 0.897);
    border-radius: .5em;
    box-shadow: 4px 4px 7px rgb(73, 16, 139);
  }
`;