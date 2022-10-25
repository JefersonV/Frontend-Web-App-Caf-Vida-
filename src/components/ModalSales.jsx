import React from 'react'
import { useState,useEffect } from 'react'
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
import createHistory from 'history/createBrowserHistory'
import Swal from "sweetalert2";
/* ---> Importamos el modal */
import ModalSalesAdd from './ModalSalesAdd';
import SearchBarDrop from './SearchBarDrop';
import SideBarMenu from './SideBarMenu';
// import logo from '../assets/images/logo-white.png'
import { useSidebarContext } from '../providers/SidebarProvider'
import { Table } from 'react-bootstrap';

const ModalSales = ({ children }) => {
  // Para que se ajuste con respecto a la sidebar
  const sidebar = useSidebarContext()
  //  ---> Estado del modal del formulario de clientes
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  // Fetch products
  const [fetchProducts, setFetchProducts] = useState([])

  const defaultOptionProduct = {
    id_producto: 0,
    producto: "Click para seleccionar",
    precio_venta: 50,
    costo_compra: 23,
    stock_actual: 20,
    stock_minimo: 10,
    unidad_medida: "Libra"
  }
  // const [showOptions, setShowOptions] = useState(false)

  // const toggleOptions = () => {
  //   setShowOptions(!showOptions)
  // }

  const getProducts = async () => {
    const response = await fetch("http://localhost:4000/inventory/products", {
      headers: {
        token: localStorage.token,
      },
    });
    console.log('respuesta')
    console.log(response)
    const data = await response.json()
    // setFetchProducts((fetchProducts) => fetchProducts.unshift(productDefaultOption))
    setFetchProducts(data)
    setFetchProducts(fetchProducts => [defaultOptionProduct, ...fetchProducts])  
  }
  
  useEffect(()=> {
    getProducts()
    console.log('productos fetch')
    console.log(fetchProducts)
  }, [])
  const addDefaultOptionProduct = (newProduct) => setFetchProducts(oldProducts => [newProduct, ...oldProducts])
  // const addMessage = (newMessage) => setMessages(oldMessages => [newMessage, ...oldMessages])


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
      nombre: 'Esteban López',
      telefono: 12345678,
      correo: 'jvelasquezc@example.com',
      direccion: 'Panajachel, zona 1',
      nit: 23154668
    },
    {
      id: 7,
      nombre: 'Juan Gonzáles',
      telefono: 12345678,
      correo: 'jvelasquezc@example.com',
      direccion: 'Panajachel, zona 1',
      nit: 23154668
    },
    {
      id: 8,
      nombre: 'Marina López',
      telefono: 12345678,
      correo: 'jvelasquezc@example.com',
      direccion: 'Panajachel, zona 1',
      nit: 23154668
    },
    {
      id: 9,
      nombre: 'María Rodríguez',
      telefono: 12345678,
      correo: 'jvelasquezc@example.com',
      direccion: 'Panajachel, zona 1',
      nit: 23154668
    },
    {
      id: 10,
      nombre: 'Marino Gómez',
      telefono: 12345678,
      correo: 'jvelasquezc@example.com',
      direccion: 'Panajachel, zona 1',
      nit: 23154668
    },
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
      cancelButtonText: "Volver al formulario"
    })/* .then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Cancelado", "El registro ha sido cancelado", "success");
      }
    }); */
  };

  const history = createHistory();
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
        history.go(0)
        
        // limpiarDatos()
      }
    });
  };

  const limpiarDatos = () => {
    setClientTable([])
    setClientSelected({})
    setProductSelected({})
    setTableData([])
    setSelectDisabled(false)
  }

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
    defaultOptions.push(`${clientes[i].nombre}`);
  }
  
  // Estado del buscador
  const [options, setOptions] = useState([])
  //Estado de la tabla de cliente
  const [clientTable, setClientTable] = useState([])
  // Estado del item seleccionado
  const [clientSelected, setClientSelected] = useState({})

  const [disabledClientAdd, setDisabledClientAdd] = useState()
  // Botón de registro a la tabla
  const handleCustomer = e => {
    e.preventDefault()

    console.log(clientSelected)
    console.log('acción cliente')
    //Verificamos que el cliente exista, según los datos de la API
    const clienteEncontrado = clientes.find((cliente) => 
      cliente.nombre === clientSelected.client
    )

    // Solo se puede agregar 1 cliente por venta
    if(clientTable.length > -1 && clientTable.length < 1) {
      setClientTable((clientTable) => clientTable.concat(clienteEncontrado))
      console.log('cliente')
      console.log(typeof clientTable)
      console.log(clientTable)
    }

    console.log(typeof clienteEncontrado)
    console.log(clienteEncontrado)
  }
  // Comprueba si hay datos que agregar a la tabla
  const clientObjectIsEmpty = (objeto) => Object.keys(objeto).length === 0 

  //Manejador de evento del buscador y captura de datos
  const onInputChange = (e) => {
    setOptions(
      defaultOptions.filter((option) => 
      option.toLowerCase().includes(e.target.value.toLocaleLowerCase()))
    );
    //setProductSelected({ value: e.target.value });
    setClientSelected({client: e.target.value})
    console.log(clientSelected)
  }

  
  //Estado de Select option de producto
  const [productSelected, setProductSelected] = useState({});

  //Estado para la tabla de Producto
  const [tableData, setTableData] = useState([]);
  
  //Estado para desactivar del botón registrar producto
  const [selectDisabled, setSelectDisabled] = useState(false);
  //Se asegura que si se han usado las opciones disponibles, se bloquee el botón Agregar producto
  const switchSelect = () => {
    if (tableData.length === fetchProducts.length - 1) {
      setSelectDisabled(true);
      //Sweet alert2
      Swal.fire({
        title: 'Todas las opciones disponibles han sido agregadas',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      });
    }
  };
  
  //Manejador del control <select>
  const onChangeSelect = (e) => {
    e.preventDefault();
    //Capturamos el valor seleccionado de select
    setProductSelected({ value: e.target.value });
    console.log('Seleccionado')
    console.log(productSelected)
    e.stopPropagation();
  };
  
  // Btn agregar
  let productoEncontrado = {}
  const submitSelected = (e) => {
    e.preventDefault();
    //Buscamos el valor en el array products comparandolo a el producto seleccionado
    productoEncontrado = fetchProducts.find(
      (product) => product.producto === productSelected.value
    );
    
    console.log('Encontrado ' + typeof productoEncontrado);
    console.log(productoEncontrado);
    //Invocación de la función de validación
    productoSeleccionado(tableData, productSelected)
  };
  /* ------ Cálculo de subtotal y total------ */
  let [total, setTotal] = useState(0)
  let [subTotal, setSubTotal] = useState(0)
  const calcularTotal = (arrayCalculo) => {
    let sumaSubtotal = 0
    
    if(arrayCalculo.length >= 0) {
      
      arrayCalculo.forEach((producto) => {
        sumaSubtotal = sumaSubtotal + producto.subtotal
      })
    }

    //Actualización de estado
    setSubTotal(sumaSubtotal.toFixed(2))
    setTotal(sumaSubtotal.toFixed(2))

  }

  const [descuento, setDescuento] = useState(0)
  /* Manejador del input de descuento */
  const aplicarDescuento = e => {
    let sumaTotal = 0
    if(tableData.length < 1 ) {
      Swal.showValidationMessage(
        "Primero debe seleccionar los productos a vender"
      )
    } else {
      Swal.fire({
        title: "El descuento se aplicará en forma de porcentaje",
        text: "Ingrese un número entero",
        input: "number",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
        preConfirm: (inputValue) => {
          if(isNaN(parseFloat(inputValue)) || inputValue < 1) {
            Swal.showValidationMessage(
              "Debe ingresar un valor numérico entero mayor que 0"
            )
          } else {
            setTotal = total - (inputValue / 100)
            // setTotal(sumaTotal.toFixed(2))
          }
        }
      })
    }
  }

  // Cantidad de producto seleccionado con sweetAlert
  const productoSeleccionado = (tableData, productSelected) => {
    // La primera opción por defecto no cuenta
    if (productoEncontrado.id_producto > 0) {
      
      Swal.fire({
        title: productSelected.value,
        text: "Ingrese la cantidad a vender",
        input: "number",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
        preConfirm: (inputValue) => {
          // Validación de una cantidad válida
          if(isNaN(parseFloat(inputValue)) || inputValue < 1) {
            Swal.showValidationMessage(
              "Debe ingresar un valor numérico entero mayor que 0"
            )
          } else {
          
            // Array intermedio entre productoEncontrado y tableData
            let productoIngresado = {
              id: productoEncontrado.id_producto,
              nombre: productoEncontrado.producto,
              stock_ingreso: productoEncontrado.stock_actual,
              precio_venta: productoEncontrado.precio_venta,
              stock_minimo: productoEncontrado.stock_minimo,
              peso: productoEncontrado.unidad_medida,
              detalle: productoEncontrado.producto,
              cantidad: parseInt(inputValue),
              descuento: 0,
              // Operación para el subtotal
              subtotal: productoEncontrado.precio_venta * inputValue,
              total: 0
            }
            console.log('ingresado')
            console.log(productoIngresado)
            // producto ingresado siiii tiene elementos
            console.log('is Empty')
            let isEmpty = Object.entries(productoIngresado).length >= 0
            console.log(isEmpty)
            setTableData((tableData) => tableData.concat(productoIngresado));
            console.log('table data')
            console.log(tableData);
            console.log(tableData.length)
            // calcularTotal(tableData)
            
            const arrayCalculo = []
            // Le pasamos los datos que tiene el estado además el nuevo que también debe calcular
            arrayCalculo.push(...tableData)
            arrayCalculo.push(productoIngresado)
            
            console.log('calculado')
            console.log(arrayCalculo)
            calcularTotal(arrayCalculo)

          }
        }
      })
    }
  }
  /* Es necesario llamara a tableData por fuera de el método, y también fuera de la invocación */
  console.log('final')
  console.log(tableData)
  
  /* ------------- Finalizar venta ---------*/
  const finalizarVenta = () => {
    // Validaciones
    if(tableData.length < 1 && clientObjectIsEmpty(clientTable)) {
      Swal.fire('Registro incompleto',
      'Debe registrar el cliente y los productos a vender',
      'info')
      return
    } 
    else if (tableData.length < 1) {
      Swal.fire(
        'Registro incompleto',
        'Debe seleccionar el producto a vender',
        'info')
      return
    }
    else if (clientObjectIsEmpty(clientTable)) {
      Swal.fire(
        'Registro incompleto',
        'Debe seleccionar o registrar el cliente',
        'info'
      )
    return
    }
    console.log('prueba de return')
    let ventaApiPost = {
      fecha: '',
      cantidad: '',
      descripcion: 'prueba de un post',
      descuento: 0,
      subtotal: 150,
      total: 150,
      cliente: 1,
      factura: 2,
      producto: 1,
      modo_pago: 2,
      usuario: 1,
    }
    //() => saveConfirmed()
    const url = "http://localhost:4000/sales"
    const submitDataVenta = async (url) => {
      try {
        const response = await (fetch(url, {
          method: "POST",
          body: JSON.stringify(ventaApiPost),
          headers: {
            "Content-type": "application/json",
            token: localStorage.token,
          },
        }));

        console.log(response)
      } catch(err) {
        console.log(err.message)
      }
    }
    submitDataVenta(url)  
  }


  return (
    <>
      <SideBarMenu />
      <div className={sidebar ? "wrapper" : "side"}>
        <main className="overlay">
          <div className="contenedorModal">
            <h1>Registro de Ventas</h1>
            <hr />
            <div className="BodyDate">
              <div className="buttons-saleTop">
                {/* <label id='label3' className="label-cliente" htmlFor="search-bar">
                  Buscar cliente
                </label> */}
                <SearchBarDrop options={options} onInputChange={onInputChange} handleCustomer={handleCustomer}/>
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
                    Ventas Realizadas
                  </Link>
              </div>
              <div className="table">
                <label id='label2' htmlFor="">
                <p className="customer-data">
                  Datos del cliente
                </p>
              </label>
                <table className="table table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th id="nom" scope="col">Nombre</th>
                      <th id="tel" scope="col">Teléfono</th>
                      <th id="cor" scope="col">Correo</th>
                      <th id="dire" scope="col">Dirección</th>
                      <th id="nit" scope="col">NIT</th>
                    </tr>
                  </thead>
                  <tbody>
                    { clientObjectIsEmpty(clientTable) ? (
                      <tr>
                        <td>No hay ningún cliente registrado</td>
                      </tr>
                    ) : (
                        clientTable.map((cliente, index) => {
                          return (
                            <tr key={index}>
                              <th scope="row">{index+1}</th>
                              <td>{cliente.nombre}</td>
                              <td>{cliente.telefono}</td>
                              <td>{cliente.correo}</td>
                              <td>{cliente.direccion}</td>
                              <td>{cliente.nit}</td>
                            </tr>
                          )
                        })
                    )}
                  </tbody>
                </table>
              </div>
                
                <form onSubmit={submitSelected} className="form-product-select">
                  <label htmlFor="select2">
                    Seleccione su producto
                  </label>
                    <select className="select2 custom-select" id="select2" onChange={onChangeSelect}>
                      {fetchProducts.map((product) => {
                        return (
                          <option key={product.id} value={product.producto} >
                            {product.producto}
                          </option>
                        );
                      })}
                    </select>
                  <input
                    className="btn btn-danger"
                    type="submit"
                    value="Agregar producto"
                    disabled={selectDisabled}
                    onMouseDown={switchSelect}
                  />
                </form>
                <div className="table">
                  <table className="table table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th scope="row">#</th>
                        <th id="can">Cantidad</th>
                        <th id="pr">Peso (Lbs)</th>
                        <th id="pro">Producto</th>
                        <th id="det">Detalle</th>
                        <th id="prec">Precio</th>
                        <th id="sub">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.length < 1 ? (
                        <tr>
                          <td className="text-lg-left text-secondary ">
                            No hay ningún producto agregado
                          </td>
                        </tr>
                      ) : (
                        tableData.map((product, index) => {
                          return (
                            <tr key={tableData.id}>
                              <td>{index+1}</td>
                              <td>{product.cantidad}</td>
                              <td>{product.peso}</td>
                              <td>{product.nombre}</td>
                              <td>{product.detalle}</td>
                              <td>Q.{product.precio_venta.toFixed(2)}</td>
                              <td>Q.{product.subtotal.toFixed(2)}</td>
                            </tr>
                          );
                        })
                      )}
                      
                      {tableData.length < 1 ? null
                      : (
                        /* Parte inferior de la tabla para sumatoria de subtotal y total */
                        <>
                          <tr className="table table-light">
                            <th scope="row"></th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td 
                              coldspan="5" 
                              className="font-weight-bold">Suma Subtotal</td>
                            <td>Q.{subTotal}</td>
                          </tr>
                          <tr className="table table-light">
                            <th scope="row"></th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td 
                              coldspan="5"
                              className="font-weight-bold">Total:</td>
                            <td>Q.{total}</td>
                          </tr>
                        </>
                      )
                      }
                    </tbody>
                  </table>
                  
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
                    <button onClick={aplicarDescuento} className="btn-primary rounded">Aplicar Descuento</button>
                    {/* <label className="lab6" htmlFor="lab6">
                      Descuento %
                    </label>
                    <input className="descu" type="number" placeholder=" %" onChange={onChangeDescuento}/> */}
                  </div>
                  <br />
                </div>

                <section className="buttons-bottom">
                <button className="btn5" onClick={() => NewSweet()}>
                    {" "}
                    <VscNewFile size="2rem" color="rgb(155, 74, 8)" /> Nueva Venta
                  </button>
                  <button className="btn6" onClick={finalizarVenta}>
                    {" "}
                    <IoIosSave size="2rem" color="darkblue" /> Registrar Venta
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
                {/* <button className="btn-prueba" onClick={toggleOptions}>Prueba</button>
                
                <ul className={showOptions ? "options-hide" : "btn-options-prueba"}>
                  <li className="text-primary">Servicios</li>
                  <li className="text-primary">Materia</li>
                  <li className="text-primary">Empaque</li>
                </ul> */}
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