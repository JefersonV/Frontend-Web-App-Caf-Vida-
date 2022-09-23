
import React from 'react'
import { useState } from 'react'
import ModalSales from '../components/ModalSales';
import '../assets/styles/Sales.css'
import styled from 'styled-components';


const Sales = () => {

  const [estadoModal1, cambiarEstadoModal1] =useState(false);
 
    return (
    <>
    
      <h1> ¡¡Aroma que te hace soñar, sabor que te hace Despertar!! </h1>
      <hr />
      
           <div className='barraArriba'>
            <div className='cont1'>
            <label id='lbl1' htmlFor="lbl1"> Visualización por     </label>
            <select name="select" id="select">
              <option value=""> Resumen de ventas de hoy</option>
              <option value="">Resumen de ventas semanal</option>
              <option value="">Resumen de ventas mensual</option>
              <option value="">Resumen de todas las ventas</option>
            </select>

           

            <input type="search" placeholder='Buscar....' name="buscar" id="buscar" />
            </div>
            
           

              
                <div className='cont2'>
                <button className="btn2" id="btn2" onClick={() => cambiarEstadoModal1(!estadoModal1)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                   <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z"/>
                    </svg> Nueva venta    </button>
                </div>
            </div>              
            

            
           

           <ModalSales
           estado={estadoModal1 }
           cambiarEstado={cambiarEstadoModal1}
           >
            <Contenidomod>
             
             
            </Contenidomod>

           </ModalSales>
        
    </>
  )
}

export default Sales

const Contenidomod=styled.div`
align-items: center;
    border: 0;
    margin-left: 500px;
    margin-top: 100px;

`;
