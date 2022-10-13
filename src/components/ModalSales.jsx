import React from 'react'
import { useState } from 'react'
import "../assets/styles/Sales.css";
/* Icons */
import { IoPersonAdd } from "react-icons/io5";
import { HiDocumentReport } from "react-icons/hi";
import { AiFillFileText } from "react-icons/ai";
import { VscNewFile } from "react-icons/vsc";
import { FcCancel } from "react-icons/fc";
import { IoIosSave } from "react-icons/io";
import { GiReturnArrow } from "react-icons/gi";
import { FcPrint } from "react-icons/fc";
/* icons */
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ModalSalesAdd from './ModalSalesAdd';
import logo from '../assets/images/logo-white.png'
import { useSidebarContext } from '../providers/SidebarProvider'

const ModalSales = ({ children, estado, cambiarEstado }) => {
  // Para que se ajuste con respecto a la sidebar
  const sidebar = useSidebarContext()
  const clientes = [
    {
      id: 1,
      nombre: 'Jeferson Velásquez',
      telefono: 12345678,
      correo: 'jvelasquezc@example.com',
      direccion: 'Panajachel, zona 1',
      nit: 23154668
    },
/*     {
      id: 2,
      nombre: 'Juan Pérez',
      telefono: 12345678,
      correo: 'jvelasquezc@example.com',
      direccion: 'Panajachel, zona 1',
      nit: 23154668
    },
    {
      id: 3,
      nombre: 'Esther López',
      telefono: 12345678,
      correo: 'jvelasquezc@example.com',
      direccion: 'Panajachel, zona 1',
      nit: 23154668
    },
    {
      id: 4,
      nombre: 'Marina García',
      telefono: 12345678,
      correo: 'jvelasquezc@example.com',
      direccion: 'Panajachel, zona 1',
      nit: 23154668
    },
    {
      id: 5,
      nombre: 'Mario Gómez',
      telefono: 12345678,
      correo: 'jvelasquezc@example.com',
      direccion: 'Panajachel, zona 1',
      nit: 23154668
    }, */
  ]

  /* Sweet alert */
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
        Swal.fire("Cancelado", "El registro ha sido cancelado", "success");
      }
    });
  };

  const NewSweet = () => {
    Swal.fire({
      title: "¿Registrar nueva venta?",
      icon: "warning",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
      }
    });
  };

  const saveConfirmed = () => {
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Registro Guardado!!",
      showConfirmButton: false,
      confirmButtonColor: "green",
      timer: 1300,
    });
  };

  const [estadoModal2, cambiarEstadoModal2] = useState(false);

  return (
    <>
      <div className={sidebar ? "wrapper" : "side"}>
        <main className="overlay">
          <div className="contenedorModal">
            <p>Registro de Ventas</p>
            <hr />
            <div className="Encabezado2">
              <h3>
                <img src={logo} width="50px" alt="logo cafe vida" />
                ¡¡Aroma que te hace soñar, sabor que te
                hace Despertar!!
              </h3>
            </div>
            <div className="BodyDate">
              <label id='label2' htmlFor="">
                Datos del cliente
              </label>
              <label id='label3'>
                Buscador
              </label>

              <input
                  type="search"
                  placeholder="Buscar...."
                  className="buscar2"
                  id="buscar2"
                  
                />

                <button
                  className="btn4"
                  onClick={() => cambiarEstadoModal2(!estadoModal2)}
                >
                <IoPersonAdd size="2rem" color="darkgoldenrod" />
                Agregar Cliente
              </button>
              <Link to="/reports" className="btn3">
                  <HiDocumentReport size="2rem" color="darkred" />
                  Reporte Ventas
                </Link>
                <Link to="/sales" className="btn1">
                  {" "}
                  <AiFillFileText size="2rem" color="rgb(36, 38, 41)" />
                  Resumen Ventas Realizadas
                </Link>
                <div className="table">
                  <table className="tablePro">
                    <thead>
                      <tr>
                        <th id="nom">Nombre</th>
                        <th id="tel">Teléfono</th>
                        <th id="cor">Correo</th>
                        <th id="dire">Dirección</th>
                        <th id="nit">NIT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientes.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.nombre}</td>
                            <td>{item.telefono}</td>
                            <td>{item.correo}</td>
                            <td>{item.direccion}</td>
                            <td>{item.nit}</td>
                          </tr>
                        )
                      })}
                      {/* <td>----</td>
                      <td>----</td>
                      <td>----</td>
                      <td>----</td>
                      <td>----</td> */}
                    </tbody>
                  </table>
                </div>
                
                <label id="lab4" htmlFor="lab4">
                  {" "}
                  DETALLE PRODUCTO
                </label>
                <select className="select2" id="select2">
                  <option value="">Café molido 1 lb</option>
                  <option value="">Café molido 1/2 lb</option>
                </select>
                <div className="table">
                  <table className="tablePro">
                    <thead>
                      <tr>
                        <th id="can">Cantidad</th>
                        <th id="pr">Precio (lb)</th>
                        <th id="pro">Producto</th>
                        <th id="det">Detalle</th>
                        <th id="prec">Precio</th>
                        <th id="sub">Subtotal</th>
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
                <div className="metodo">
                  <label htmlFor="lab5">Método de pago</label>
                  <select className="select3" id="">
                    <option value=""> Efectivo </option>
                    <option value=""> Transferencia Bancaria</option>
                    <option value=""> Depósito Monetario</option>
                  </select>

                  <label className="lab6" htmlFor="lab6">
                    Descuento %
                  </label>
                  <input className="descu" type="number" placeholder=" %" />
                  <br />
                  <button className="dev">
                    {" "}
                    <GiReturnArrow size="2rem" color="rgb(28, 4, 95)" />{" "}
                    Devoluciones
                  </button>

                  <label className="lab7" htmlFor="total">
                    Total a pagar
                  </label>
                </div>

                <section className="buttons">
                <button className="btn5" onClick={() => NewSweet()}>
                    {" "}
                    <VscNewFile size="2rem" color="rgb(155, 74, 8)" /> Nueva Venta
                  </button>
                  <button className="btn6" onClick={() => saveConfirmed()}>
                    {" "}
                    <IoIosSave size="2rem" color="darkblue" /> Guardar
                  </button>
                  <button className="btn7" onClick={() => cancelSweet()}>
                    {" "}
                    <FcCancel size="2rem" /> Cancelar
                  </button>
                  <button className="btn9">
                    {" "}
                    <FcPrint size="2rem" /> Imprimir
                  </button>
                </section>
            </div>
            {children}
          </div>
        </main>
        {/* Traemos el modal y le pasamos los props */}
        <ModalSalesAdd 
          estado2={estadoModal2}
          cambiarEstado2={cambiarEstadoModal2}
        ></ModalSalesAdd>
      </div>
    </>

  )
}

export default ModalSales