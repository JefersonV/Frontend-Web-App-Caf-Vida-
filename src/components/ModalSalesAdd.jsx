import React from 'react'
import styled from 'styled-components';


const ModalSalesAdd = ({children, estado2, cambiarEstado2}) => {
  return (
    <>
    {estado2 && 
      <Overlay1>

        <ContenedorModal>
            <h1>Registro de clientes</h1>
            <button onClick={()=> cambiarEstado2(false)}>ok</button>
            {children}

        </ContenedorModal>

      </Overlay1>
      }
    </>
  )
}

export default ModalSalesAdd

const Overlay1 = styled.div `
	width: 100vw;
    height: 95vh;
    position: fixed;
    top: 57px;
    left: 0;
    background: rgba(0,0,0, .5);
    display: flex;
    align-items: center;
    justify-content:center;
    
`;
const ContenedorModal = styled.div`
       width: 700px;
       height: 580px;
      padding: 20px;
       background: #fff;
       position: relative;
       margin-top: 1px;
       box-shadow: rgba(100,100,111, 0.2) 0px 7px 29px 0px;
`;