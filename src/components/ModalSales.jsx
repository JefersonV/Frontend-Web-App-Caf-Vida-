import React from "react";
import { useState, useEffect } from "react";
import dayjs from "dayjs/esm/index.js";
// import dayjs from 'dayjs';'dayjs/locale/es'
import "../assets/styles/Sales.css";
/* Icons */
import { IoPersonAdd } from "react-icons/io5";
import { HiDocumentReport } from "react-icons/hi";
import { AiFillFileText } from "react-icons/ai";
import { VscNewFile } from "react-icons/vsc";
import { FcCancel } from "react-icons/fc";
import { IoIosSave } from "react-icons/io";
import { GiCoffeeBeans } from "react-icons/gi";
import { FcPrint } from "react-icons/fc";
/* icons */
import { Link } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import Swal from "sweetalert2";
/* ---> Importamos el modal */
import ModalSalesAdd from "./ModalSalesAdd";
import SearchBarDrop from "./SearchBarDrop";
import { useHistory } from "react-router-dom";
// import logo from '../assets/images/logo-white.png'
import { useSidebarContext } from "../providers/SidebarProvider";

const ModalSales = ({ children }) => {
  // Para que se ajuste con respecto a la sidebar
  const sidebar = useSidebarContext();
  //  ---> Estado del modal del formulario de clientes
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  // Fetch products
  const [fetchProducts, setFetchProducts] = useState([]);

  /* Opción por defecto del <select> de productos */
  const defaultOptionProduct = {
    id_producto: 0,
    producto: "Click para seleccionar",
  };

  const getProducts = async () => {
    const response = await fetch("http://localhost:3000/inventory/products", {
      headers: {
        token: localStorage.token,
      },
    });
    console.log("respuesta");
    console.log(response);
    const data = await response.json();
    setFetchProducts(data);
    // Aparte de la data de la api, también la opción por default
    setFetchProducts((fetchProducts) => [
      defaultOptionProduct,
      ...fetchProducts,
    ]);
  };

  useEffect(() => {
    getProducts();
    console.log("productos fetch");
    console.log(fetchProducts);
  }, []);

  const [fetchClients, setFetchClients] = useState([]);
  const getClients = async () => {
    const response = await fetch("http://localhost:3000/customers", {
      headers: {
        token: localStorage.token,
      },
    });
    console.log("respuesta");
    console.log(response);
    const data = await response.json();
    setFetchClients(data);
    // setFetchClients(fetchProducts => [defaultOptionProduct, ...fetchProducts])
  };

  useEffect(() => {
    getClients();
    console.log("Clientes fetch");
    console.log(fetchClients);
  }, []);

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
      cancelButtonText: "Volver al formulario",
    }); /* .then((result) => {
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
        history.go(0);

        // limpiarDatos()
      }
    });
  };

  const limpiarDatos = () => {
    setClientTable([]);
    setClientSelected({});
    setProductSelected({});
    productoEncontrado = {};
    setTableData([]);
    setSelectDisabled(false);
    setTotal(0);
    setSubTotal(0);
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
  for (let i = 0; i < fetchClients.length - 1; i++) {
    defaultOptions.push(`${fetchClients[i].nombre}`);
  }

  // Estado del buscador
  const [options, setOptions] = useState([]);
  //Estado de la tabla de cliente
  const [clientTable, setClientTable] = useState([]);
  // Estado del item seleccionado
  const [clientSelected, setClientSelected] = useState({});

  const [disabledClientAdd, setDisabledClientAdd] = useState();
  // Comprueba si hay datos que agregar a la tabla
  const clientObjectIsEmpty = (objeto) => Object.keys(objeto).length === 0;
  // Botón de registro a la tabla cliente
  const onSubmitCustomer = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    console.log(clientSelected);
    console.log("acción cliente");
    //Verificamos que el cliente exista, según los datos de la API
    const clienteEncontrado = fetchClients.find(
      (cliente) => cliente.nombre === clientSelected.client
    );
    console.log("tabla clientes");
    console.log(clientTable);
    console.log("Encontrado ccc");
    console.log(clienteEncontrado);
    if (clientObjectIsEmpty(clientSelected)) {
      Swal.fire(
        "Selección errónea",
        "Debe seleccionar el cliente y confirmar con un click encima de la búsqueda",
        "info"
      );
      return;
    }
    if (
      clientObjectIsEmpty(clienteEncontrado) ||
      clienteEncontrado === undefined
    ) {
      Swal.fire(
        "Selección errónea",
        "Asegúrese que la selección sea correcta y de hacer click encima del texto al finalizar para confirmar.",
        "info"
      );
      return;
    }
    // Solo se puede agregar 1 cliente por venta
    if (clientTable.length > -1 && clientTable.length < 1) {
      setClientTable((clientTable) => clientTable.concat(clienteEncontrado));
      console.log("cliente");
      console.log(typeof clientTable);
      console.log(clientTable);
    }

    console.log(typeof clienteEncontrado);
    console.log(clienteEncontrado);
  };

  // onSubmit de cliente
  /* const onSubmitClient = e => {
    e.preventDefault();
    clientObjectIsEmpty(clientSelected) ?
    console.log('No se encuentra clientSelected')
    : 
    console.log('Si lo capturó clientSelected')
  } */

  //Manejador de evento del buscador y captura de datos
  const onInputChange = (e) => {
    setOptions(
      defaultOptions.filter((option) =>
        option.toLowerCase().includes(e.target.value.toLocaleLowerCase())
      )
    );
    //setProductSelected({ value: e.target.value });
    setClientSelected({ client: e.target.value });
    console.log(clientSelected);
  };

  //Estado de Select option de producto
  const [productSelected, setProductSelected] = useState({});

  //Estado para la tabla de Producto
  const [tableData, setTableData] = useState([]);

  //Estado para desactivar del botón registrar producto
  const [selectDisabled, setSelectDisabled] = useState(false);
  //Se asegura que si se han usado las opciones disponibles, se bloquee el botón Agregar producto
  const switchSelect = (e) => {
    if (tableData.length === fetchProducts.length - 1) {
      setSelectDisabled(true);
      console.log("Option");
      console.log(e.target);
      //Sweet alert2
      Swal.fire({
        title: "Todas las opciones disponibles han sido agregadas",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    }
  };

  //Manejador del control <select> de producto
  const onChangeSelect = (e) => {
    e.preventDefault();
    //Capturamos el valor seleccionado de select
    setProductSelected({ value: e.target.value });
    console.log("Seleccionado");
    console.log(productSelected);
    e.stopPropagation();

    if (tableData.length > 0) {
      console.log("Ya registró el primero");
      console.log(e.target.selected);
    }
  };

  // Btn agregar
  let productoEncontrado = {};
  const submitSelected = (e) => {
    e.preventDefault();
    //Buscamos el valor en el array products comparandolo a el producto seleccionado
    productoEncontrado = fetchProducts.find(
      (product) => product.producto === productSelected.value
    );

    console.log("Encontrado " + typeof productoEncontrado);
    console.log(productoEncontrado);
    //Invocación de la función de validación
    productoSeleccionado(tableData, productSelected);
  };
  /* ------ Cálculo de subtotal y total------ */
  let [total, setTotal] = useState(0);
  let [subTotal, setSubTotal] = useState(0);
  const calcularTotal = (arrayCalculo) => {
    let sumaSubtotal = 0;
    let totalAux = 0;

    if (arrayCalculo.length >= 0) {
      arrayCalculo.forEach((producto) => {
        sumaSubtotal = sumaSubtotal + producto.subtotal;
      });
    }

    setSubTotal(sumaSubtotal);
    setTotal(sumaSubtotal);
    setDescuento(0);
  };

  /* Manejador del control de pago */
  const [payMethod, setpayMethod] = useState({});
  const onChangePay = (e) => {
    setpayMethod(e.target.value);
    console.log("Pago");
    console.log(payMethod);
  };

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
          if (isNaN(parseFloat(inputValue)) || inputValue < 1) {
            Swal.showValidationMessage(
              "Debe ingresar un valor numérico entero mayor que 0"
            );
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
              total: 0,
            };
            console.log("ingresado");
            console.log(productoIngresado);
            // producto ingresado siiii tiene elementos
            console.log("is Empty");
            let isEmpty = Object.entries(productoIngresado).length >= 0;
            console.log(isEmpty);
            setTableData((tableData) => tableData.concat(productoIngresado));
            console.log("table data");
            console.log(tableData);
            console.log(tableData.length);
            // calcularTotal(tableData)

            const arrayCalculo = [];
            // Le pasamos los datos que tiene el estado(tableData) además el nuevo que también debe calcular
            arrayCalculo.push(...tableData);
            arrayCalculo.push(productoIngresado);

            console.log("calculado");
            console.log(arrayCalculo);
            //Fn CalcularTotal
            calcularTotal(arrayCalculo);
          }
        },
      });
    }
  };
  /* Es necesario llamara a tableData por fuera de el método, y también fuera de la invocación */
  console.log("final");
  console.log(tableData);

  /* ------------- Finalizar venta ---------*/
  const finalizarVenta = () => {
    const url = "http://localhost:3000/sales";
    const submitDataVenta = async (url) => {
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(ventaApiPost),
          headers: {
            "Content-type": "application/json",
            token: localStorage.token,
          },
        });
        if (response.status === 204) {
          saveConfirmed();
          /* limpiarDatos(); */
        }

        console.log(response);
      } catch (err) {
        console.log(err.message);
      }
    };
    // Validaciones -> sino se han agregado productos a la venta y tampoco se ha seleccionado el cliente
    if (tableData.length < 1 && clientObjectIsEmpty(clientTable)) {
      Swal.fire(
        "Registro incompleto",
        "Debe registrar el cliente y los productos a vender",
        "info"
      );
      return;
    } else if (tableData.length < 1) {
      Swal.fire(
        "Registro incompleto",
        "Debe seleccionar el producto a vender",
        "info"
      );
      return;
    } else if (clientObjectIsEmpty(clientTable)) {
      Swal.fire(
        "Registro incompleto",
        "Debe seleccionar o registrar el cliente",
        "info"
      );
      return;
    }
    // Captura los  id's de los productos seleccionados
    const idProductos = tableData.map((producto) => {
      return producto.id;
    });
    let productosVarios = idProductos;

    // Fn para validar que no aparezcan productos repetidos para la venta.
    const esUnProductoUnico = (valor, index, lista) => {
      return !(lista.indexOf(valor) === index);
    };
    /* Day JS para la fecha */
    let day = dayjs().format("YYYY-MM-DD");
    // Objeto a enviar en caso de que cumpla con las validaciones
    let ventaApiPost = {};

    if (tableData.length === 1) {
      ventaApiPost = {
        cantidad: tableData[0].cantidad, //
        descripcion: "prueba frontend", // detalle || un input donde vayan observaciones
        descuento: descuento || 0,
        id_factura: 1, // ?
        id_cliente: clientTable[0].id_cliente, //
        id_producto: tableData[0].id, //
        id_modo_pago: payMethod, //
        // usuario: 1, //
      };
      console.log(ventaApiPost);
      console.log(JSON.stringify(ventaApiPost));
      // POST invocación de la función
      submitDataVenta(url);
      return;
    }
    // En caso de que se haya seleccionado más de 1 producto para la venta
    if (
      tableData.length > 1 &&
      productosVarios.some(esUnProductoUnico) === false
    ) {
      console.log("NO se repiten todo bien :D");
      ventaApiPost = {
        fecha: "", // ?
        cantidad: "", //
        descripcion: "prueba de un post", // detalle || un input donde vayan observaciones
        descuento: descuento,
        subtotal: subTotal,
        total: total,
        cliente: clientTable[0].nombre, //
        factura: 10, // ?
        producto: "", //
        modo_pago: payMethod, //
        usuario: 1, //
      };
      // Captura de los productos seleccionados
      ventaApiPost.producto = productosVarios.join();
      console.log(ventaApiPost);
      console.log(JSON.stringify(ventaApiPost));
    } else {
      /* setTimeout(() => {
        history.push("/sales")
      }, 2000) */
      Swal.fire(
        "Productos Repetidos",
        "No se puede, seleccione diferentes productos",
        "error"
      );
    }

    //() => saveConfirmed()
  };

  const [descuento, setDescuento] = useState(0)
  const onChangeDiscount = e => {
    let descuentoAux = 0;

    parseFloat(descuentoAux = e.target.value)
    parseFloat(descuentoAux)
    console.log('Auxiliar')
    console.log(typeof descuentoAux)
    let descuentoRes = 0
    descuentoRes = parseFloat(total * (descuentoAux / 100))
    setDescuento(descuentoRes.toFixed(2))
    // setTotal = total - (inputValue / 100)
    console.log('descuento capturado')
    console.log(typeof descuento)
    
    /*----- Cálculo del total después de capturar el descuento ----- */
    if (e.target.value === 0) {
      setTotal(subTotal.toFixed(2));
      return;
    }
    if (e.target.value > -1) {
      let descuentoAux = 0;
      //Valor del input
      descuentoAux = e.target.value;
      console.log("Auxiliar");
      console.log(descuentoAux);
      // total descuento => input 10 / 100 = total => 250 * --> 0.10
      let descuentoRes = 0;
      descuentoRes = parseFloat(total * (descuentoAux / 100));
      setDescuento((descuento) => (descuento = descuentoRes));
      // setTotal = total - (inputValue / 100)
      console.log("descuento capturado");
      console.log(typeof descuento);
      // totalAux = sumaSubtotal - descuento
      setTotal(parseFloat(subTotal - descuentoRes));
      console.log("descuento es: ");
      console.log(typeof descuento);
    }
  };

  return (
    <>
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
                <SearchBarDrop
                  options={options}
                  onInputChange={onInputChange}
                  onSubmitCustomer={onSubmitCustomer}
                />
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
                <label id="label2" htmlFor="">
                  <p className="customer-data">Datos del cliente</p>
                </label>
                <table className="table table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th id="nom" scope="col">
                        Nombre
                      </th>
                      <th id="tel" scope="col">
                        Teléfono
                      </th>
                      <th id="cor" scope="col">
                        Correo
                      </th>
                      <th id="dire" scope="col">
                        Dirección
                      </th>
                      <th id="nit" scope="col">
                        NIT
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {typeof clientTable === undefined ||
                    typeof clientTable === null ||
                    clientObjectIsEmpty(clientTable) ? (
                      <tr>
                        <td>No hay ningún cliente registrado</td>
                      </tr>
                    ) : (
                      clientTable.map((cliente, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.correo}</td>
                            <td>{cliente.direccion}</td>
                            <td>{cliente.nit}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              <form onSubmit={submitSelected} className="form-product-select">
                <label htmlFor="select2">Seleccione su producto</label>
                <select
                  className="select2 custom-select"
                  id="select2"
                  onChange={onChangeSelect}
                >
                  {fetchProducts.map((product) => {
                    return (
                      <option key={product.id} value={product.producto}>
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
                            <td>{index + 1}</td>
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

                    {tableData.length < 1 ? null : (
                      /* Parte inferior de la tabla para sumatoria de subtotal y total */
                      <>
                        <tr className="table table-light">
                          <th scope="row"></th>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td coldspan="5" className="font-weight-bold">
                            Suma Subtotal
                          </td>
                          <td>Q.{subTotal.toFixed(2)}</td>
                        </tr>
                        <tr className="table table-light">
                          <th scope="row"></th>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td coldspan="5" className="font-weight-bold">
                            Descuento:
                          </td>
                          <td>Q.{descuento.toFixed(2)}</td>
                        </tr>
                        <tr className="table table-light">
                          <th scope="row"></th>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td coldspan="5" className="font-weight-bold">
                            Total:
                          </td>
                          <td>Q.{total.toFixed(2)}</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="metodo">
                <div className="metodo-left">
                  <label htmlFor="lab5">Método de pago</label>
                  <select
                    className="select2 custom-select"
                    id=""
                    onChange={onChangePay}
                  >
                    <option>Click para seleccionar</option>
                    <option value="1"> Efectivo </option>
                    <option value="2"> Transferencia</option>
                    <option value="3"> Depósito Monetario</option>
                  </select>
                </div>
                <div className="metodo-right">
                  <label htmlFor="descuento">Agregar Descuento</label>
                  <input
                    id="descuento"
                    type="number"
                    name="descuento"
                    onChange={onChangeDiscount}
                    min="0"
                    max="30"
                    placeholder="%"
                  />
                  {/* <button onClick={aplicarDescuento} className="btn-primary rounded">Aplicar Descuento</button> */}
                </div>
                <br />
              </div>

              <section className="buttons-bottom">
                {/* <button className="btn5" onClick={() => NewSweet()}>
                    {" "}
                    <VscNewFile size="2rem" color="rgb(155, 74, 8)" /> Nueva Venta
                  </button> */}
                <button className="btn6" onClick={finalizarVenta}>
                  {/* <Link to="/sales">
                    </Link> */}
                  <IoIosSave size="2rem" color="darkblue" /> Registrar Venta
                </button>
                <button className="btn7" /* onClick={() => cancelSweet()} */>
                  <Link to="/sales">
                    <FcCancel size="2rem" /> Cancelar
                  </Link>
                </button>
                {/* <button className="btn9">
                    {" "}
                    <FcPrint size="2rem" /> Imprimir
                  </button> */}
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
  );
};

export default ModalSales;
