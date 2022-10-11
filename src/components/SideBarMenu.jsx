import React from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SideBarTypes } from './SideBarTypes'
import 'normalize.css';
import '../assets/styles/Navbar.css'
import SubMenu from './SubMenu'
import { IconContext } from 'react-icons'
import Logo from '../assets/images/logo-white.png'
/* Provider */
import { useSidebarContext, useSidebarToggleContext } from '../providers/SidebarProvider'

function SideBarMenu() {
  const sidebar = useSidebarContext()
  const sidebarFn = useSidebarToggleContext()
  
  return (
    <>
      <IconContext.Provider value={{ color: '#ffffff' }}>  
        <header className="header">
          <Link to = "#" className="nav-icon">
            <FaIcons.FaBars onClick={sidebarFn}/>
          </Link>
          <Link to="/">
            <img src={Logo} width="75px" className="header-logo"/>
          </Link>
        </header>
        {/* Lógica del sidebar */}
        {sidebar === true ?
          <aside className="navbar-left navbar1">
            <div className="sidebar">
              <div className="sidebar-top-flex">
                <Link to="#" className="nav-icon">
                  <AiIcons.AiOutlineClose onClick={sidebarFn}/>
                </Link>
                <Link to="/">
                  <img src={Logo} width="75px" className="header-logo"/>
                </Link>
              </div>
              <div className="sidebar-items">
                {SideBarTypes.map((item, index) => {
                  return <SubMenu item={item} key={index} />;
                })}
              </div>
            </div>
          </aside>
        :
          <aside className="navbar-left navbar2">
            <div className="sidebar">
              <Link to="#">
                <AiIcons.AiOutlineClose className="icon-hide"/>
              </Link>
            </div>
          </aside>
        }
      </IconContext.Provider>
    </>
  )
}

export default SideBarMenu;