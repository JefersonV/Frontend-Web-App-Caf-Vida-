import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const SubMenu = ( {item} ) => {
  const [subnav, setSubnav] = useState(false)

  const showSubNav = () => setSubnav(!subnav)
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