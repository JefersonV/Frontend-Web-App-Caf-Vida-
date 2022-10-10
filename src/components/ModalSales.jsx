import React from 'react'
import styled from 'styled-components';
import '../assets/styles/Sales.css'
import ModalSalesAdd from '../components/ModalSalesAdd'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import {IoPersonAdd} from 'react-icons/io5'
import {HiDocumentReport} from 'react-icons/hi'
import {AiFillFileText} from 'react-icons/ai'
import {VscNewFile} from 'react-icons/vsc'
import {FcCancel} from 'react-icons/fc'
import {IoIosSave} from 'react-icons/io' 
import {GiReturnArrow} from 'react-icons/gi'
import {FcPrint} from 'react-icons/fc'
import { Link } from 'react-router-dom';
import Swal  from 'sweetalert2';


const ModalSales= ({children, estado, cambiarEstado}) => {

    const [estadoModal2, cambiarEstadoModal2] =useState(false);

    const cancelSweet = () =>{
        Swal.fire({
            title: '¿Está seguro de cancelar ?',
            text: "Los datos ingresados no se guardaran  ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, cancelar!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Cancelado',
                'El registro ha sido cancelado',
                'success'
              )
            }
          })
    }
    
    const NewSweet =() =>{
        Swal.fire({
            title: '¿Registrar nueva venta?',
            icon: 'warning',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
             
            } 
          })
    }

    const saveConfirmed=()=>{
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Registro Guardado!!',
            showConfirmButton: false,
            confirmButtonColor: 'green',
            timer: 1300,
               
          })
    }
return(
    
    <>
    {estado && 

    <Overlay>
        <ContenedorModal>
             <h1>REGISTRO DE VENTAS</h1>
                 <hr/>              
            <Encabezado2>
              <h3> <img src="" alt="" /> ¡¡Aroma que te hace soñar, sabor que te hace Despertar!! </h3>           
            </Encabezado2>
            <BodyDate>
            <label id='lbl2' htmlFor="lbl2"> DATOS DEL CLIENTE</label>
            <label id='lab3' htmlFor="">Buscador</label>
            
            <input type="search" placeholder='Buscar....' className="buscar2" id="buscar2" />
            
            
            <Link to="" className='btn4' onClick={() => cambiarEstadoModal2(!estadoModal2)}> <IoPersonAdd size='2rem' color='darkgoldenrod'/> 
            Agregar Cliente</Link> 
           
            <Link to="/reports" className='btn3'><HiDocumentReport size='2rem' color='darkred'/> 
                 Reporte Ventas</Link>
            
            <Link to=""  className='btn1' onClick={()=> cambiarEstado(false)}> <AiFillFileText size='2rem' color='rgb(36, 38, 41)'/> 
            Resumen Ventas Realizadas</Link> 

                
                <div className='table'>
                    <table className='tablePro' >
                        <thead>
                            <tr>
                                <th id='nom'>Nombre</th>
                                <th id='ap' >Apellido</th>
                                <th id='tel' >Teléfono</th>
                                <th id='dire'>Dirección</th>
                                <th id='nit' >NIT</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <td>----</td>
                            <td>----</td>
                            <td>----</td>
                            <td>----</td>
                            <td>----</td>

                        </tbody>
                    </table>

                </div>

               

                
                <label id='lab4' htmlFor="lab4"> DETALLE PRODUCTO</label>
                 
                <select className="select2" id="select2">
                    <option value="" >Café molido  1 lb</option>
                    <option value="" >Café molido 1/2 lb</option>
                </select>
                <div className='table'>
                    <table className='tablePro' >
                        <thead>
                            <tr>
                                <th id='can'>Cantidad</th>
                                <th id='pr' >Precio (lb)</th>
                                <th id='pro' >Producto</th>
                                <th id='det'>Detalle</th>
                                <th id='prec' >Precio</th>
                                <th id='sub' >Subtotal</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <td>----</td>
                            <td>----</td>
                            <td>----</td>
                            <td>----</td>
                            <td>----</td>
                            <td>----</td>

                        </tbody>
                    </table>

                </div>            

                
               
                <div className='metodo'>
                    <label htmlFor="lab5">Método de pago</label>
                    <select className="select3" id="">
                        <option value=""> Efectivo </option>
                        <option value=""> Transferencia Bancaria</option>
                        <option value=""> Depósito Monetario</option>
                    </select>
                                       
                    <label className='lab6' htmlFor="lab6">Descuento %</label>
                    <input className='descu' type="number" placeholder=' %' />
                    <br />
                    <Link to="" className='dev' > <GiReturnArrow size='2rem' color='rgb(28, 4, 95)'/> Devoluciones</Link> 
                        
                    <label  className='lab7' htmlFor="total">Total a pagar</label>
                    
                 
                </div>
                 
                

                <BodyBottuns>
                    <Link to="" className='btn5' onClick={() => NewSweet() } > <VscNewFile size='2rem' color='rgb(155, 74, 8)' /> Nueva Venta</Link>
                  <Link to="" className='btn6' onClick={()=> saveConfirmed()} > <IoIosSave size='2rem' color='darkblue'/> Guardar</Link>
                   <Link to="" className='btn7' onClick={() => cancelSweet()} > <FcCancel size='2rem'/> Cancelar</Link>
                   <Link to="" className='btn9' > <FcPrint size='2rem'/> Imprimir</Link>
                   
                </BodyBottuns>

            
            </BodyDate>
             
            {children}
        </ContenedorModal>
    </Overlay>
}
<ModalSalesAdd 
estado2={estadoModal2}
cambiarEstado2={cambiarEstadoModal2}>
    
</ModalSalesAdd>

    </>
);
}

export default ModalSales


const Overlay = styled.div `
	width: 10vh;
    height: 100vh;
    position: fixed;
    top: 59px;
    left: 10x;
    background: rgba(0,0,0, .5);
    
`;

const ContenedorModal = styled.div`
       width: 100vw;
       height: 92vh;
       background: #fff;
       position: relative;
       padding: 10px;

       h1{
    
        justify-content: center;
        margin-left: 100px;
        font-size: 19px;
    }
`;




const Encabezado2 = styled.div`
    display: flex;
    justify-content: center;

  
        
h3{
   
    margin-left: 150px;
    font-size: 17px;
}`;

const BodyDate = styled.div`
margin-top: 0px;
border-style: groove ;
padding: 1px;


.btn3{
    margin-left: 20px;
    
    cursor: pointer;
    border: none;
   

}
.btn4{
    margin-left: 20px;
    
    cursor: pointer;
    border: none;
    
}

#buscar2{
    align-items: center;
    border-radius: 5px;
    margin-right: 10px;
    margin-left: 10px;
    margin-top: 10px;    
}
#lbl2{
    align-items: center;
    margin-left: 280px;
    cursor: pointer;
}
#lab3{
    align-items: center;
    margin-left: 20px;
    cursor: pointer;
}
#lab4{
    align-items: center;
    margin-left: 280px;
    cursor: pointer;
}
#select2{
    margin-left: 20px;
}

`;




const BodyBottuns=styled.div `
margin-top: 2px;
margin-bottom: 20px;

.btn5{
    margin-left: 290px;
   
}
.btn6{
    margin-left: 20px;
   
}
.btn7{
    margin-left: 20px;
    
}
.btn9{
    margin-left: 20px;
    
`;
