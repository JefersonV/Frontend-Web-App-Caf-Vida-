import React from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { useState } from 'react'
import { SideBarTypes } from './SideBarTypes'
import 'normalize.css';
import '../assets/styles/Navbar.css'
import SubMenu from './SubMenu'
import { IconContext } from 'react-icons'

function SideBarMenu() {
  const [sidebar, setSidebar] = useState(true)
  let showSidebar = () => setSidebar(!sidebar)
  
  return (
    <>
      <IconContext.Provider value={{ color: '#ffffff' }}>  
        <header className="header">
          <Link to = "#" className="nav-icon">
            <FaIcons.FaBars onClick={showSidebar}/>
          </Link>
        </header>
        {/* Lógica del sidebar */}
        {sidebar === true ?
          <aside className="navbar-left navbar1">
            <div className="sidebar">
              <Link to="#" className="nav-icon">
                <AiIcons.AiOutlineClose onClick={showSidebar}/>
              </Link>
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