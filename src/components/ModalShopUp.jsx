import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiEdit } from "react-icons/bi";
import "../assets/styles/Sales.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ModalShopUp = ({ children, estado2, cambiarEstado2, idEdit }) => {
  //Alertas
  const idParaEditar = idEdit;
  console.log("Id dentro del modal: ", idParaEditar);
  const saveSweetalert = () => {
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Registro Guardado!!",
      showConfirmButton: true,
      confirmButtonColor: "green",
      //background:'black'
    }).then((result) => {
      if (result.isConfirmed) {
        cambiarEstado2(false);
      }
    });
  };
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
        Swal.fire(
          "Cancelado",
          "El registro ha sido cancelado",
          "success",
          cambiarEstado2(false)
        );
      }
    });
  };

  //Estados necesarios para el modal
  const [prevShop, setPrevShop] = useState([]);
  const [newdataShop, setNewDataShop] = useState({
    cantidad: "",
    precio_unitario: "",
    descuento: "",
    subtotal: "",
    total: "",
    no_comprobante: "",
    observaciones: "",
    id_tipo_comprobante: "",
    id_proveedor: "",
    id_producto: "",
    id_modo_pago: "",
  });
  const [dataProviders, setDataProviders] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);

  //Consulta para traer los datos de la compra
  const getPrevShop = async (id) => {
    console.log("Id editar dentro del fetch", id);
    const response = await fetch(
      `http://localhost:3000/inventory/shopping/${id}`,
      {
        headers: {
          token: localStorage.token,
        },
      }
    );
    const data = await response.json();
    /* console.log("data", data); */
    setPrevShop(data);
    console.log("Data prev", prevShop);
    setNewDataShop({
      cantidad: prevShop.cantidad,
      precio_unitario: prevShop.precio_unitario,
      descuento: prevShop.descuento,
      subtotal: prevShop.subtotal,
      total: prevShop.total,
      no_comprobante: prevShop.no_comprobante,
      observaciones: prevShop.observaciones,
      id_tipo_comprobante: prevShop.id_tipo_comprobante,
      id_proveedor: prevShop.id_proveedor,
      id_producto: prevShop.id_producto,
      id_modo_pago: prevShop.id_modo_pago,
    });
    console.log("Data actual", newdataShop);
  };

  //Consulta para traer los proveedores de la DB
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
      value={newdataShop.id_proveedor}
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
  const getProduct = async () => {
    const response = await fetch("http://localhost:3000/inventory/products/", {
      headers: {
        token: localStorage.token,
      },
    });
    const data = await response.json();
    /* console.log("data product", data); */
    setDataProduct(data);
  };
  const Product = () => (
    <select
      name="id_producto"
      id="id_producto"
      value={newdataShop.id_producto}
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
    /* getPrevShop(idEdit); */
    if (idEdit) {
      getPrevShop(idEdit);
    }
    getProviders();
    getProduct();
  }, [idEdit]);

  //Aca comienza la captura de datos del formulario
  /*   const {
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
  } = newdataShop; */
  const onChangeShop = (e) => {
    setNewDataShop({ ...newdataShop, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/inventory/shopping/${idEdit}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },
          body: JSON.stringify(newdataShop),
        }
      );
      const resJson = await response.json();
      console.log(resJson);
    } catch (err) {
      console.log(err.massage);
    }
  };

  return (
    <>
      {estado2 && (
        <Overlay1>
          <ContenedorModal>
            <Form_Modal_ShopUP>
              <div className="shop-container-form-input">
                <label htmlFor="">Proveedor</label>
                {Providers()}
                <label htmlFor="">V.A. {prevShop.id_proveedor}</label>
              </div>
              <div className="shop-container-form-input">
                <label htmlFor="">Producto</label>
                {Product()}
                <label htmlFor="">V.A. {prevShop.id_producto}</label>
              </div>
              <div className="shop-container-form-input">
                <label htmlFor="">Cantidad</label>
                <input
                  type="number"
                  size="50"
                  name="cantidad"
                  id="cantidad"
                  value={newdataShop.cantidad}
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
                  value={newdataShop.descuento}
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
                  value={newdataShop.precio_unitario}
                  onChange={(e) => onChangeShop(e)}
                />
              </div>
              <div className="shop-container-form-input">
                <label htmlFor="">Sub Total</label>
                <input
                  type="text"
                  value={newdataShop.cantidad * newdataShop.precio_unitario}
                  name="subtotal"
                  id="subtotal"
                  onClick={(e) => onChangeShop(e)}
                />
              </div>
              <div className="shop-container-form-input">
                <label htmlFor="">Total</label>
                <input
                  type="text"
                  value={newdataShop.subtotal - newdataShop.descuento}
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
                  value={newdataShop.id_modo_pago}
                  onChange={(e) => onChangeShop(e)}
                >
                  <option value="1">Efectivo</option>
                  <option value="2">Transferencia</option>
                  <option value="3">Depósito</option>
                </select>
              </div>
              <div className="shop-container-form-input">
                <label htmlFor="">Tipo de documento</label>
                <select
                  name="id_tipo_comprobante"
                  id="id_tipo_comprobante"
                  value={newdataShop.id_tipo_comprobante}
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
                  value={newdataShop.no_comprobante}
                  onChange={(e) => onChangeShop(e)}
                />
              </div>
              <div className="shop-container-form-input">
                <label htmlFor="">Descripcion de la compra</label>
                <input
                  type="text"
                  name="observaciones"
                  id="observaciones"
                  value={newdataShop.observaciones}
                  onChange={(e) => onChangeShop(e)}
                />
              </div>

              <LinkButt>
                <button className="btn8" onClick={() => cancelSweet()}>
                  {" "}
                  Cancelar
                </button>
                <button
                  className="btn9"
                  onClick={(e) => {
                    saveSweetalert();
                    onSubmitForm(e);
                  }}
                >
                  {" "}
                  Guardar{" "}
                </button>
              </LinkButt>

              {children}
            </Form_Modal_ShopUP>
          </ContenedorModal>
        </Overlay1>
      )}
    </>
  );
};

export default ModalShopUp;

const Overlay1 = styled.div`
  width: 100vw;
  height: 95vh;
  position: fixed;
  top: 57px;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ContenedorModal = styled.div`
  width: 450px;
  height: 650px;
  padding: 20px;
  background: #fff;
  position: relative;
  margin-right: 80px;
  margin-left: 100px;
  bottom: 30px;

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  h1 {
    margin-top: 0;
    font-size: 21px;
    margin-right: 200px;
    margin-left: 0;
  }
`;

const Form_Modal_ShopUP = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 16px;

  align-items: flex-start;

  .shop-container-form-input {
    flex-grow: 1;
  }
`;
const LinkButt = styled.div`
  margin-top: 30px;
  .btn9 {
    border: solid 1px;
    box-shadow: 3px 3px 7px rgb(75, 33, 122);
    padding: 5px;
    margin-left: 100px;
    background-color: rgba(24, 223, 230, 0.897);
  }
  .btn8 {
    padding: 5px;
    margin-left: 100px;
    background-color: rgba(230, 24, 24, 0.897);
    border: solid 1px;
    box-shadow: 3px 3px 7px rgb(75, 33, 122);
  }
`;
