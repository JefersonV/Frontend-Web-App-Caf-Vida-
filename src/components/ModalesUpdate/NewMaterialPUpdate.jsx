import React, {useState,useEffect}from 'react';
import styled from 'styled-components'
import { BiEdit } from "react-icons/bi";
import Swal from "sweetalert2";

const NewMaterialPUpdate=({children, estado5, CambiarEstado5, idEdit,})=>{
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
            CambiarEstado5(false);
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
              CambiarEstado5(false)
            );
          }
        });
      };
    
      const [data, setData] = useState([]);

      //Funcion para obtener la lista de datos
      const getData = async (id) => {
        const response = await fetch( 
          `http://localhost:4000/production_cost/menu_costo/raw_material/${id}`,
          {
            headers: {
              token: localStorage.token,
            },
          }
        );
    const data = await response.json();
    setData(data);
    setDataMaterial({
      id_tipo_materia: data.tipo_materia,
      cantidad:data.cantidad,
      id_unidad_medida:data.unidad_medida,
      costo: data.costo,
    });
  };
  //console.log(data);

  console.log(data);
  //funcion useffect para llamar y cargar los datos
  useEffect(() => {
    if (idEdit) {
      getData(idEdit);
    }
  }, [idEdit]);

  
      //para capturar Datos
      const [dataMaterial, setDataMaterial] = useState({
        id_tipo_materia:"",
        cantidad:"",
        id_unidad_medida:"",
        costo:"",
      });

      const onChangeData =(e)=>{
        setDataMaterial({ ...dataMaterial,[e.target.name]: e.target.value });
        console.log(e.target.name, e.target.value);

      };

      //Enviar formulario
      const onSubmitForm = async(e)=>{
        e.preventDefault();
        console.log(dataMaterial);
        try{
          const response = await fetch(
             `http://localhost:4000/production_cost/menu_costo/raw_material/${idEdit}`,
              {method: "PUT",
              body: JSON.stringify(dataMaterial),
              headers:{
                "Content-Type":"application/json",
                token: localStorage.token,
              },
             }
             );
             console.log(response);
        }catch(error){
          console.log(error.massage);
        }
      };


    return(
        <>
        {estado5 &&(
        <Overlay>
        <Contenedor>
            <h1><BiEdit size="2rem" color=" rgb(104, 22, 8)" />
            Actualizando costo Materia Prima</h1>
            
            <form onSubmit={onSubmitForm}>
            <Form2>
            
          <label htmlFor="" className="labl4">
            {" "}
           Tipo de materia prima{" "}
          </label>
          <div className="boddy">
             <select className='select2' 
             name='id_tipo_materia'
              onChange={(e)=>onChangeData(e)}>
                
                <option value="">{data.tipo_materia}</option>
                <option value="1">Cafe pergamino</option>
                <option value="2">Cafe grano</option>
            </select> 
          </div>

          <label htmlFor="" className="lal3">
            {" "}
            Cantidad de Materia{" "}
          </label>
          <label htmlFor="" className="labl5">
            {" "}
            Unidad de medida{" "}
          </label>

          <div className="boddy3">
           
            
          <input
              className="txt1"
              type="number"
              name="cantidad"
              placeholder=" Ingrese cantidad"
              value={dataMaterial.cantidad}
              onChange={(e)=> onChangeData(e)}
              
            />

            <select className='select3'
            name='id_unidad_medida'
            onChange={(e)=> onChangeData(e)}
            >
              <option value="">{data.unidad_medida}</option>
                <option value="1">Quintal</option>
                <option value="2">1 libra</option>
                <option value="3">1/2 libra</option>
            </select>

          </div>

          <label htmlFor="" className="la4">
            {" "}
            Costo
          </label>
          
          <div className="boddy4">
           
          <input
              className="txt1"
              type="number"
              name="costo"
              placeholder=" Ingrese el precio"
              value={dataMaterial.costo}
              onChange={(e)=> onChangeData(e)}
              
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

        )
        }
        </>
    );
};
export default NewMaterialPUpdate

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
  height: 400px;
  padding: 20px;
  background: #fff;
  position: relative;
  margin-right: 80px;
  margin-left: 100px;
  bottom: 40px;

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  h1 {
    margin-top: 0;
    font-size: 20px;
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
 .select3{
  margin-left:80px
 }
  label {
    margin-top: 5px;
  }
.labl3{
    margin-left:190px;
}
.labl4{
    margin-left: 2px;
}
.labl5{
    margin-left: 120px;
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