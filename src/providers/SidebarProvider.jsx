import React, { useState, createContext, useContext } from 'react'

const sidebarContext = createContext()
const sidebarToggleContext = createContext()

/* Hooks que devuelven el contexto */
export function useSidebarContext() {
  return useContext(sidebarContext)
}

export function useSidebarToggleContext() {
  return useContext(sidebarToggleContext)
}


export const SidebarProvider = ({children}) => {
  const [sidebar, setSidebar] = useState(true)
  let showSidebar = () => setSidebar(!sidebar)

  return(
    <>{/* Inyección de contextos */}
      <sidebarContext.Provider value={sidebar} >
        <sidebarToggleContext.Provider value={showSidebar}>
          {children}
        </sidebarToggleContext.Provider>
      </sidebarContext.Provider>
    </>
  )
}