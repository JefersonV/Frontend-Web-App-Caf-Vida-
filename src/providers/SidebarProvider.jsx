import React, { useState, createContext, useContext } from "react";

//sidebar
const sidebarContext = createContext();
const sidebarToggleContext = createContext();
//buscador
const searcherContext = createContext();
const resultsSearchContext = createContext();

// fetch para la api
const stateFetchContext = createContext();
const setStateFetchContext = createContext();

/* Hooks que devuelven el contexto */
export function useSidebarContext() {
  return useContext(sidebarContext);
}

export function useSidebarToggleContext() {
  return useContext(sidebarToggleContext);
}

// buscador
export function useSearcherContext() {
  return useContext(searcherContext);
}

export function useResultsSearchContext() {
  return useContext(resultsSearchContext);
}

// state de la data de la api
export function useFetchContext() {
  return useContext(stateFetchContext);
}

export function useSetFetchContext() {
  return useContext(setStateFetchContext);
}

export const SidebarProvider = ({ children }) => {
  // dataApi Fetch
  const [dataApi, setDataApi] = useState([])
  
  // sidebar
  const [sidebar, setSidebar] = useState(true);
  let showSidebar = () => setSidebar(!sidebar);

  // state para buscador
  const [search, setSearch] = useState("");
  // buscador, captura de datos
  const searcher = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
    console.log(search.length);
  };
  //metodo de filtrado del buscador
  const results = !search
    ? dataApi
    : dataApi.filter(
        (dato) =>
          dato.cliente.toLowerCase().includes(search.toLocaleLowerCase()) ||
          dato.producto.toLowerCase().includes(search.toLocaleLowerCase()) ||
          dato.fecha.toLowerCase().includes(search.toLocaleLowerCase())
      );
  return (
    <>
      {/* Inyección de contextos */}
      <sidebarContext.Provider value={sidebar}>
        <sidebarToggleContext.Provider value={showSidebar}>
          <searcherContext.Provider value={searcher}>
            <resultsSearchContext.Provider value={results}>
              <stateFetchContext.Provider value={dataApi}>
                <setStateFetchContext.Provider value={setDataApi}>
                  {children}
                </setStateFetchContext.Provider>
              </stateFetchContext.Provider>
            </resultsSearchContext.Provider>
          </searcherContext.Provider>
        </sidebarToggleContext.Provider>
      </sidebarContext.Provider>
    </>
  );
};
