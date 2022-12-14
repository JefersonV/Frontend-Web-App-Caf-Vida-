import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const SubMenu = ( {item} ) => {
  const [subnav, setSubnav] = useState(false)
  const [subSubNavSw, setSubSubNav] = useState(false)
  const showSubNav = () => setSubnav(!subnav)
  const showSubSubNav = () => setSubSubNav(!subSubNavSw)

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
          <Link to={item.path} key={index} className={item.class} onClick={item.subSubNav && showSubSubNav}>
            {item.icon}
            <span>{item.title}</span>
            {/* Sub sub item */}
            <div>
              {item.subSubNav && subSubNavSw
                ? item.iconOpened
                : item.subSubNavSw
                ? item.iconClosed
                : null
              }
              
              {/* {console.log(item.subSubNav[index])} */}
            </div> 
          </Link>
        )
      })}
    </>
  )
}

export default SubMenu