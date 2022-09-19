import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as GoIcons from 'react-icons/go'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as TiIcons from 'react-icons/ti'
import * as GiIcons from 'react-icons/gi'
import * as BiIcons from 'react-icons/bi'

export const SideBarTypes = [
  {
    title: 'Ventas',
    path: '/sales',
    icon: <FaIcons.FaCartPlus />
  },
  {
    title: 'Inventario',
    path: '/inventory',
    icon: <TiIcons.TiDropbox/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Producto Terminado',
        path: '/inventory/products',
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Proveedores',
        path: 'inventory/providers',
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Compras',
        path: 'inventory/shopping',
        icon: <IoIcons.IoIosPaper />,
      }
    ]
  },  //1
  /* Devoluciones -> /inventory/shopping_returns */
  {
    title: 'Pedidos',
    path: '/orders',
    icon: <FaIcons.FaClipboardList />
  }, //2
  {
    title: 'Producción',
    path: 'production_cost',
    icon: <GiIcons.GiCoffeeBeans />
  }, //3
  {
    title: 'Clientes',
    path: 'customers',
    icon: <FaIcons.FaHouseUser />
  }, //4
  {
    title: 'Usuarios',
    path: '/users',
    icon: <BiIcons.BiUserCircle />,
    
  },
  {
    title: 'Reportes',
    path: '/reports',
    icon: <GoIcons.GoGraph />
  }
]