import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SideBarTypes } from './SideBarTypes'
import 'normalize.css';
import '../assets/styles/Navbar.css'
import SubMenu from './SubMenu'
import { IconContext } from 'react-icons'
import { FaUserTie } from 'react-icons/fa'
import Logo from '../assets/images/logo-white.png'
/* Provider */
import { useSidebarContext, useSidebarToggleContext } from '../providers/SidebarProvider'

function SideBarMenu( {setAuth} ) {

  /* ---- Authentication ------*/
  async function getName() {
    try {
      const response = await fetch("http://localhost:3000/home/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      console.log(parseRes);
    } catch (err) {
      console.error(err.massage);
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  useEffect(() => {
    getName();
  }, []);
  /* Authtentication */

  const sidebar = useSidebarContext()
  const sidebarFn = useSidebarToggleContext()
  const [showLogin, setShowLogin] = useState(true)
  return (
    <>
      <IconContext.Provider value={{ color: '#ffffff' }}>  
        <header className="header">
          <div className="header-left-content">
            <Link to = "#" className="nav-icon">
              <FaIcons.FaBars onClick={sidebarFn}/>
            </Link>
            <Link to="/home">
              <img src={Logo} width="75px" className="header-logo"/>
            </Link>
          </div>
          <button className="nav-icon" onClick={() => setShowLogin(showLogin => !showLogin)}>
            <FaUserTie />
          </button>
        </header>
        {/* Componente que se muestra y oculta para cerrar sesión */}
          <div className={showLogin === true ? "options-user options-user-hide" : "options-user"}>
            <p>Name</p>
            <p>Email</p>
            <button onClick={(e) => logout(e)}>Cerrar Sesión</button>
          </div>
        {/* Lógica del sidebar */}
        {sidebar === true ?
          <aside className="navbar-left navbar1">
            <div className="sidebar">
              <div className="sidebar-top-flex">
                <Link to="#" className="nav-icon">
                  <AiIcons.AiOutlineClose onClick={sidebarFn}/>
                </Link>
                <Link to="/home">
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