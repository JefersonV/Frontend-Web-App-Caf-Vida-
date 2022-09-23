import React from 'react'
import styled from 'styled-components';
import ModalSalesAdd from '../components/ModalSalesAdd'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import { useState } from 'react'

const ModalSales= ({children, estado, cambiarEstado}) => {

    const [estadoModal2, cambiarEstadoModal2] =useState(false);

return(
    
    <>
    {estado && 

    <Overlay>
        <ContenedorModal>
            <Encabezado>
              <h1>REGISTRO DE VENTAS</h1>
            </Encabezado>
                   <hr />
            <Encabezado2>
            <h3> <img src="" alt="" /> ¡¡Aroma que te hace soñar, sabor que te hace Despertar!! </h3>           
             
            </Encabezado2>
            <BodyDate>
            <label id='lbl2' htmlFor="lbl2"> DATOS DEL CLIENTE</label>
            <label id='lab3' htmlFor="">Buscador</label>
            
            <input type="search" placeholder='Buscar....' className="buscar2" id="buscar2" />
            
            <button className='btn4' onClick={() => cambiarEstadoModal2(!estadoModal2)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                </svg> Agregar Cliente</button>
           
            <button className='btn3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-bar-graph-fill" viewBox="0 0 16 16">
                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm.5 10v-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-1z"/>
                </svg> Reporte Ventas</button>
            
            <button onClick={()=> cambiarEstado(false)}> 
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-text-fill" viewBox="0 0 16 16">
                <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z"/>
                </svg>Listado Ventas Realizadas</button>

                <BodyTable>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th> Apellido </th>
                                <th> Teléfono </th>
                                <th> Dirección </th>
                                <th> NIT       </th>
                            </tr>
                            </thead>
                            <tbody>
                                                       
                            <tr>
                                <td>----</td>
                                <td>----</td>
                                <td>----</td>
                                <td>----</td>
                                <td>----</td>
                            </tr>
                        </tbody>
                    </Table>

                </BodyTable>

                <BodyProduct>
                <label id='lab4' htmlFor="lab4"> DETALLE PRODUCTO</label>
                <select className="select2" id="select2">
                    <option value="Seleccionar producto" >Seleccionar producto</option>
                    <option value="" >Café molido 1 lbr</option>
                    <option value="" >  Café molido 1/2 lbr</option>
                </select>

                <Table striped bordered hover size="sm">
                <thead>
                            <tr>
                                <th>Cantidad</th>
                                <th> Peso (lbs)</th>
                                <th> Producto</th>
                                <th> Detalle </th>
                                <th> Precio</th>
                                <th>Subtotal</th>
                            </tr>
                            </thead>
                            <tbody>
                                                       
                            <tr>
                                <td>----</td>
                                <td>----</td>
                                <td>----</td>
                                <td>----</td>
                                <td>----</td>
                            </tr>
                        </tbody>

                </Table>

                </BodyProduct>

                <BodyBottuns>
                    <button className='btn5' >Nueva Venta</button>
                    <button className='btn6' >Guardar</button>
                    <button className='btn7' >Cancelar</button>
                    <button className='btn8' >Imprimir factura</button>
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
       margin:0;
       background: #fff;
       position: relative;
       padding: 5px;
       box-shadow: rgba(100,100,111, 0.2) 0px 7px 29px 0px;
`;

const Encabezado = styled.div`
h1{
    margin: 0;
    justify-content: center;
    margin-left: 100px;
}`;

const Encabezado2 = styled.div`
    display: flex;
    justify-content: center;
    
        
h3{
   
    margin: 2px;
    margin-left: 150px;
    font-size: 15px;
}`;

const BodyDate = styled.div`
margin-top: 10px;
border-style: groove;

padding: 5px;

button{
    margin-left: 20px;
    
    cursor: pointer;
    border: none;
    
}
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


`;

const BodyTable = styled.div`

Table{
    margin-top: 30px;
    border-style: groove;
    margin-left: 2px; 
    font-size: 15px;
    text-align: center;
    
}`;

const BodyProduct = styled.div`
margin-top: 40px;

#lab4{
    align-items: center;
    margin-left: 280px;
    cursor: pointer;
}
.select2{
    margin-left: 20px;
    width: 180px;
    text-align: center;
    cursor: pointer;
}
Table{
    margin-top: 15px;
    border-style: groove;
    margin-left: 2px; 
    font-size: 15px;
    text-align: center;
    
}
`;
const BodyBottuns=styled.div `
margin-top: 180px;
.btn5{
    margin-left: 280px;
}

`;