import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as GoIcons from 'react-icons/go'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as TiIcons from 'react-icons/ti'
import * as GiIcons from 'react-icons/gi'
import * as BiIcons from 'react-icons/bi'
import * as TbIcons from 'react-icons/tb'


export const SideBarTypes = [
  {
    title: "Ventas",
    path: "/sales",
    icon: <FaIcons.FaCartPlus />,
  },
  {
    title: "Inventario",
    path: "/inventory",
    icon: <TiIcons.TiDropbox />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Productos",
        path: "/inventory/products",
        icon: <IoIcons.IoIosPaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        class: "nav-subItem"
      },
      /* subSubNav */
      {
        title: "Productos Terminados",
        path: "/finished_product",
        icon: <TbIcons.TbClipboardList/>,
        class: "nav-subItem subSubNav subSubNav1"
      },
      {
        title: "Materia Prima",
        path: "raw_material",
        icon: <GiIcons.GiCoffeeBeans />,
        class:  "nav-subItem subSubNav"
      },
      {
        title: "Material de Empaque",
        path: "packing_material",
        icon: <GoIcons.GoPackage />,
        class: "nav-subItem subSubNav subSubNav3"
      },
      /* subSubNav */
      {
        title: "Proveedores",
        path: "inventory/providers",
        icon: <IoIcons.IoIosPaper />,
        class: "nav-subItem"
      },
      {
        title: "Compras",
        path: "inventory/shopping",
        icon: <IoIcons.IoIosPaper />,
        class: "nav-subItem"
      },
      {
        title: "Devoluciones Clientes",
        path: "inventory/sales_returns",
        icon: <IoIcons.IoIosPaper />,
        class: "nav-subItem"
      },
      {
        title: "Devoluciones Proveedores",
        path: "inventory/shopping_returns",
        icon: <IoIcons.IoIosPaper />,
        class: "nav-subItem"
      },
    ],
  },
  {
    title: "Pedidos",
    path: "/orders",
    icon: <FaIcons.FaClipboardList />,
  },
  {
    title: "Producción",
    path: "production_cost",
    icon: <GiIcons.GiCoffeeBeans />,
  },
  {
    title: "Clientes",
    path: "customers",
    icon: <FaIcons.FaHouseUser />,
  },
  {
    title: "Usuarios",
    path: "/users",
    icon: <BiIcons.BiUserCircle />,
  },
  {
    title: "Reportes",
    path: "/reports",
    icon: <GoIcons.GoGraph />,
  },
];