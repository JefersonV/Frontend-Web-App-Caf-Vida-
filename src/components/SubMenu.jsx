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
      {/* Main Items */}
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
      </Link>

      {/* SubNav estructura y mapeo*/}
      { subnav && item.subNav.map((item, index) => {
        return (
          <Link to={item.path} key={index} className="nav-subItem" onClick={item.subSubNav && showSubSubNav}>
            {item.icon}
            <span>{item.title}</span>
            <div>
              {item.subSubNav && subSubNav
                ? item.iconOpened
                : item.subSubNav
                ? item.iconClosed
                : null
              }
            </div>
          </Link>
        )
      })}
    {/* SubSubNav estructura y mapeo*/}
    {item.subSubNav && item.subSubNav.map((item, index) => {
      return (
        <Link to={item.path} key={index} className="nav-subItem2">
          {item.icon}
          <span>{item.title}</span>
        
        </Link>
      )
    })}
    </>
  )
}

export default SubMenu