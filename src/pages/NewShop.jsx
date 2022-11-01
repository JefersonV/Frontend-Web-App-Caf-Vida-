import { React, useState, useEffect } from "react";
import SideBarMenu from "../components/SideBarMenu";
import "../assets/styles/Shopping.css";
import {
  HiUserAdd,
  HiDocumentText,
  HiClipboardCopy,
  HiDocumentReport,
  HiBan,
} from "react-icons/hi";
import { RiSave3Fill } from "react-icons/ri";
import logo from "../assets/images/LOGO_DARK.png";
import { useSidebarContext } from "../providers/SidebarProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const NewShopp = () => {
  const sidebar = useSidebarContext();

  const saveSweetalert = () => {
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Registro Guardado!!",
      showConfirmButton: true,
      confirmButtonColor: "green",
      //background:'black'
    }).then((result) => {});
  };

  //Estado para subtotal y total
  const [esubtotal, setSubtotal] = useState(0);
  const [etotal, setTotal] = useState(0);

  //Consulta para traer los proveedores de la DB
  const [dataProviders, setDataProviders] = useState([]);
  const getProviders = async () => {
    const response = await fetch("http://localhost:3000/inventory/provider/", {
      headers: {
        token: localStorage.token,
      },
    });
    const data = await response.json();
    /* console.log("data", data); */
    setDataProviders(data);
  };
  const Providers = () => (
    <select
      name="id_proveedor"
      id="id_proveedor"
      onChange={(e) => onChangeShop(e)}
    >
      {dataProviders.map((data, index) => (
        <option key={index} value={data.id_proveedor}>
          {data.nombre}
        </option>
      ))}
    </select>
  );

  //Consulta para traer los productos
  const [dataProduct, setDataProduct] = useState([]);
  const getProduct = async () => {
    const response = await fetch("http://localhost:3000/inventory/products/", {
      headers: {
        token: localStorage.token,
      },
    });
    const data = await response.json();
    console.log("data product", data);
    setDataProduct(data);
  };
  const Product = () => (
    <select
      name="id_producto"
      id="id_producto"
      onChange={(e) => onChangeShop(e)}
    >
      {dataProduct.map((data, index) => (
        <option key={index} value={data.id_producto}>
          {data.producto}
        </option>
      ))}
    </select>
  );

  useEffect(() => {
    getProviders();
    getProduct();
  }, []);

  //Envio del formulario
  const [dataShop, setDataShop] = useState({
    cantidad: 0,
    precio_unitario: 0,
    descuento: 0,
    subtotal: 0,
    total: 0,
    no_comprobante: 0,
    observaciones: "",
    id_tipo_comprobante: 1,
    id_proveedor: 1,
    id_producto: 1,
    id_modo_pago: 1,
  });
  const {
    cantidad,
    precio_unitario,
    descuento,
    subtotal,
    total,
    no_comprobante,
    observaciones,
    id_tipo_comprobante,
    id_proveedor,
    id_producto,
    id_modo_pago,
  } = dataShop;
  const onChangeShop = (e) => {
    setDataShop({ ...dataShop, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      /*  const body = {cantidad,
      precio_unitario,
      descuento,
      subtotal,
      total,
      no_comprobante,
      observaciones,
      id_tipo_comprobante,
      id_proveedor,
      id_producto,
      id_modo_pago}; */
      const response = await fetch("http://localhost:3000/inventory/shopping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(dataShop),
      });
      const resJson = await response.json();
      console.log(resJson);
      console.log(dataShop);
    } catch (err) {
      console.log(err.massage);
    }
  };

  return (
    <>
      <SideBarMenu />
      <div className={sidebar === true ? "wrapper" : "side"}>
        <div className="Baner-Title">
          <img src={logo} width="75px" />
          <h1 className="Baner-Title-Text">
            Aroma que te hace soñar, sabor que te hace despertar
          </h1>
        </div>

        <div className="shop-options">
          <div className="shop-options-option">
            <HiUserAdd value={{ color: "#ffffff" }} size="2rem" />
            <Link to="/providers">
              <label htmlFor=""> Ingresar Nuevo Proveedor</label>
            </Link>
          </div>
          <div className="shop-options-option">
            <HiDocumentText value={{ color: "#ffffff" }} size="2rem" />
            <Link to="/shopping">
              <label htmlFor=""> Listado Compras Realizadas</label>
            </Link>
          </div>
        </div>

        <div className="shop-grid">
          <div className="shop-container">
            <div className="shop-container-form-input">
              <label htmlFor="">Proveedor</label>
              {/* <select name="">
                {dataProviders.map((data, index) => {
                  <option key={index} value={data.id_proveedor}>
                    {data.nombre}
                  </option>;
                })}
              </select> */}
              {Providers()}
            </div>
            <div className="shop-container-form-input">
              <label htmlFor="">Producto</label>
              {Product()}
            </div>
            <div className="shop-container-form-input">
              <label htmlFor="">Cantidad</label>
              <input
                type="number"
                size="30"
                name="cantidad"
                id="cantidad"
                value={cantidad}
                onChange={(e) => onChangeShop(e)}
              />
            </div>
            <div className="shop-container-form-input">
              <label htmlFor="">Descuento</label>
              <input
                type="number"
                size="30"
                name="descuento"
                id="descuento"
                value={descuento}
                onChange={(e) => onChangeShop(e)}
              />
            </div>
            <div className="shop-container-form-input">
              <label htmlFor="">Precio Unitario</label>
              <input
                type="number"
                size="30"
                name="precio_unitario"
                id="precio_unitario"
                value={precio_unitario}
                onChange={(e) => onChangeShop(e)}
              />
            </div>
            <div className="shop-container-form-input">
              <label htmlFor="">Sub Total</label>
              {/* <h4>{dataShop.cantidad * dataShop.precio_unitario}</h4> */}
              <input
                type="text"
                value={dataShop.cantidad * dataShop.precio_unitario}
                name="subtotal"
                id="subtotal"
                onClick={(e) => onChangeShop(e)}
              />
            </div>
            <div className="shop-container-form-input">
              <label htmlFor="">Total</label>
              {/* <h4>
                {dataShop.cantidad * dataShop.precio_unitario -
                  dataShop.descuento}
              </h4> */}
              <input
                type="text"
                value={dataShop.subtotal - dataShop.descuento}
                name="total"
                id="total"
                onClick={(e) => onChangeShop(e)}
              />
            </div>
            <div className="shop-container-form-input">
              <label htmlFor="">Método de Pago</label>
              <select
                name="id_modo_pago"
                id="id_modo_pago"
                value={dataShop.id_modo_pago}
                onChange={(e) => onChangeShop(e)}
              >
                <option value="1">Efectivo</option>
                <option value="2">Transferencia</option>
                <option value="3">Depósito</option>
              </select>
            </div>
          </div>
          <div className="shop-container">
            {/* <div className="shop-container-form-input">
              <label htmlFor="">No. de Orden</label>
              <input type="number" />
            </div> */}
            {/* <div className="shop-container-form-input">
              <label htmlFor="">Fecha</label>
              <input type="date" />
            </div> */}
            <div className="shop-container-form-input">
              <label htmlFor="">Tipo de documento</label>
              <select
                name="id_tipo_comprobante"
                id="id_tipo_comprobante"
                /* value={dataShop.id_tipo_comprobante} */
                onChange={(e) => onChangeShop(e)}
              >
                <option value="1">Factura</option>
                <option value="2">Recibo</option>
                <option value="3">Ticket</option>
                <option value="4">Otro</option>
              </select>
            </div>

            <div className="shop-container-form-input">
              <label htmlFor="">No. Documento</label>
              <input
                type="number"
                name="no_comprobante"
                id="no_comprobante"
                /* value={no_comprobante} */
                onChange={(e) => onChangeShop(e)}
              />
            </div>
            <div className="shop-container-form-input">
              <label htmlFor="">Descripcion de la compra</label>
            </div>
            <input
              type="text"
              name="observaciones"
              id="observaciones"
              value={observaciones}
              onChange={(e) => onChangeShop(e)}
            />
          </div>
        </div>

        <div className="shop-options">
          <button
            onClick={(e) => {
              onSubmitForm(e);
              saveSweetalert();
            }}
          >
            <Link to="/shopping">
              <RiSave3Fill color="darkgreen" size="2rem" />
              Guardar
            </Link>
          </button>
          <button>
            <Link to="/shopping">
              <HiBan color="darkred" size="2rem" />
              Cancelar
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default NewShopp;
