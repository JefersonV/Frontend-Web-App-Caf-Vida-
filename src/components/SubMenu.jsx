import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const SubMenu = ( {item} ) => {
  const [subnav, setSubnav] = useState(false)
  const [subSubNav, setSubSubNav] = useState(false)
  const showSubNav = () => setSubnav(!subnav)
  const showSubSubNav = () => setSubSubNav(!subSubNav)
  return (
    <>
      <Link to={item.path} className="nav-item" onClick={item.subNav && showSubNav}>
        <div>
          {item.icon}
          <span>{item.title}</span>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened 
            : item.subNav 
            ? item.iconClosed  
            : null}
        </div>
        {/*    <Link to={item.}>Productos</Link>
        <div>
          {item.subSubNav && subSubNav
            ? item.subSubNav.iconOpened
            : item.subSubNav
            ? item.iconClosed
            : null
          }    
        </div> */}
      </Link>
      { subnav && item.subNav.map((item, index) => {
        return (
          <Link to={item.path} key={index} className="nav-subItem">
            {item.icon}
            <span>{item.title}</span>
          </Link>
        )
      })}
    </>
  )
}

export default SubMenu