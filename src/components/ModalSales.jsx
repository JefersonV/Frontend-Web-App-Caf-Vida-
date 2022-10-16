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
import SearchBarDrop from './SearchBarDrop';
// import logo from '../assets/images/logo-white.png'
import { useSidebarContext } from '../providers/SidebarProvider'

const ModalSales = ({ children }) => {
  // Para que se ajuste con respecto a la sidebar
  const sidebar = useSidebarContext()
  // Estado del modal del formulario de clientes
  const [estadoModal2, cambiarEstadoModal2] = useState(false);

  const clientes = [
    {
      id: 1,
      nombre: 'Jeferson Velásquez',
      telefono: 12345678,
      correo: 'jvelasquezc@example.com',
      direccion: 'Panajachel, zona 1',
      nit: 23154668
    },
    {
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
    },
    {
      id: 6,
      nombre: 'Jeferson Velásquez',
      telefono: 12345678,
      correo: 'jvelasquezc@example.com',
      direccion: 'Panajachel, zona 1',
      nit: 23154668
    },
    {
      id: 7,
      nombre: 'Juan Pérez',
      telefono: 12345678,
      correo: 'jvelasquezc@example.com',
      direccion: 'Panajachel, zona 1',
      nit: 23154668
    },
    {
      id: 8,
      nombre: 'Esther López',
      telefono: 12345678,
      correo: 'jvelasquezc@example.com',
      direccion: 'Panajachel, zona 1',
      nit: 23154668
    },
    {
      id: 9,
      nombre: 'Marina García',
      telefono: 12345678,
      correo: 'jvelasquezc@example.com',
      direccion: 'Panajachel, zona 1',
      nit: 23154668
    },
    {
      id: 10,
      nombre: 'Mario Gómez',
      telefono: 12345678,
      correo: 'jvelasquezc@example.com',
      direccion: 'Panajachel, zona 1',
      nit: 23154668
    },
  ]
  const products = [
    {
      id: 1,
      nombre: 'Café Molido',
      stock_ingreso: 0,
      precio_venta: 50,
      stock_minimo: 10,
      peso: '1 lb',
      detalle: 'Café Molido de 1lb de 2da calidad',
      cantidad: 0,
      descuento: 0,
      subtotal: 0,
      total: 0
    },
    {
      id: 2,
      nombre: 'Café Molido',
      stock_ingreso: 0,
      precio_venta: 25,
      stock_minimo: 10,
      peso: '1/2 lb',
      detalle: 'Café Molido de 1/2 lb de 2da calidad',
      cantidad: 0,
      descuento: 0,
      subtotal: 0,
      total: 0
    }

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
        // Función limpiar datos
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
  // console.log(clientes.length)
  /* Opciones que aparecerán en el buscador */
  const defaultOptions = [];
  for (let i = 0; i < clientes.length-1; i++) {
    defaultOptions.push(`${clientes[i].id}   ${clientes[i].nombre}`);
  }
  
  // Estado del buscador
  const [options, setOptions] = useState([])
  //Manejador de evento del buscador
  const onInputChange = (e) => {
    setOptions(
      defaultOptions.filter((option) => 
      option.toLowerCase().includes(e.target.value.toLocaleLowerCase()))
    );
  }

  //Select de producto
  const [productSelected, setProductSelected] = useState({

  })
  //Estado para la tabla de Producto
  const [tableData, setTableData] = useState([{}])
  
  
  //Manejador del control <select>
  const onChangeSelect = e => {
    e.preventDefault()
    console.log('Seleccionaste: ' + e.target.value)
    setProductSelected({value: e.target.value})
    // setProductSelected(({productSelected.id}))
    // return e.target.value;
    // console.log(products)
    // const productoEncontrado = products.find((product, index) => product.detalle === productSelected.value)
    // setTableData(tableData => tableData.concat(productoEncontrado))
    e.stopPropagation()
  }
  
  //Buscamos el valor en el array products comparandolo a el producto seleccionado
  const productoEncontrado = products.find(product => product.detalle === productSelected.value)
  console.log('Seleccionado ' + productSelected.value)
  console.log(products.map(product => product.detalle))

  // Btn agregar
  const submitSelected = e => {
    e.preventDefault()
    // alert('Lo que te corresponde es: ' + productSelected.value)
    console.log(e.target.value)
    // console.log('seleccionaste ' + productSelected )
    // setSearches(searches => searches.concat(query))
  } 
    // console.log('nuevo')
    // console.log(tableData)
  return (
    <>
      <div className={sidebar ? "wrapper" : "side"}>
        <main className="overlay">
          <div className="contenedorModal">
            <h1>Registro de Ventas</h1>
            <hr />
            <div className="BodyDate">
              <div className="buttons-saleTop">

                <label id='label3'>
                  Buscar cliente
                </label>
                <SearchBarDrop options={options} onInputChange={onInputChange} />
                  <button
                    className="btn4"
                    onClick={() => cambiarEstadoModal2(!estadoModal2)}
                  >
                  <IoPersonAdd size="2rem" color="darkgoldenrod" />
                  Nuevo cliente
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
              </div>
                <div className="table">
                <label id='label2' htmlFor="">
                <p className="customer-data">
                  Datos del cliente
                </p>
              </label>
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
                      
                      {/* {clientes.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.nombre}</td>
                            <td>{item.telefono}</td>
                            <td>{item.correo}</td>
                            <td>{item.direccion}</td>
                            <td>{item.nit}</td>
                          </tr>
                        )
                      })} */}
                      <tr>
                        <td>----</td>
                        <td>----</td>
                        <td>----</td>
                        <td>----</td>
                        <td>----</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <form action="" onClick={submitSelected}>
                  <label id="lab4" className="lab4">
                    DETALLE PRODUCTO
                    {/* onChange = {e => setSelects(e.target.value)} */}
                    <select value="seleccione" className="select2" id="select2" onChange={onChangeSelect}>
                      
                      {products.map((product) => {
                        return (
                          <option key={product.id} value={product.detalle}>{product.detalle}</option>
                        )
                      })}
                    </select> 
                  </label>
                  <input type="submit" value="Registra producto" />
                </form>
                <div className="table">
                  <table className="tablePro">
                    <thead>
                      <tr>
                        <th id="can">Cantidad</th>
                        <th id="pr">Peso (lb)</th>
                        <th id="pro">Producto</th>
                        <th id="det">Detalle</th>
                        <th id="prec">Precio</th>
                        <th id="sub">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                        {/* {  
                          tableData.map((product) => {
                          return(
                            <tr>
                              <td>
                                <input className="table-input" type="number" name="" id="" />
                              </td>
                              <td>{product.peso}</td>
                              <td>{product.nombre}</td>
                              <td>{product.detalle}</td>
                              <td>{product.precio_venta}</td>
                              <td>{product.subtotal}</td>
                            </tr>
                          )
                          })
                        } */}
                    </tbody>
                  </table>
                  <div className="table-total">
                    <label className="lab7" htmlFor="total">
                      Total a pagar
                    </label>
                  </div>
                </div>
                <div className="metodo">
                  <div className="metodo-left">
                    <label htmlFor="lab5">Método de pago</label>
                    <select className="select3" id="">
                      <option value=""> Efectivo </option>
                      <option value=""> Transferencia Bancaria</option>
                      <option value=""> Depósito Monetario</option>
                    </select>
                  </div>
                  <div className="metodo-right">
                    <label className="lab6" htmlFor="lab6">
                      Descuento %
                    </label>
                    <input className="descu" type="number" placeholder=" %" />
                  </div>
                  <br />
                  {/* <button className="dev">
                    {" "}
                    <GiReturnArrow size="2rem" color="rgb(28, 4, 95)" />{" "}
                    Devoluciones
                  </button> */}

                  
                </div>

                <section className="buttons-bottom">
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