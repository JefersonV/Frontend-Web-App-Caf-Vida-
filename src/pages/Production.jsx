import React from 'react' 
import TableProduction from '../components/TableProduction'
//import useFetch from '../Hooks/useFetch'
import { useSidebarContext } from '../providers/SidebarProvider'


const Production = () => { 
  //const url ='http://localhost:4000/production_cost';
const sidebar = useSidebarContext()
//const dataApi = useFetch(url);
  
  return (
    <>{/* Utilizando wrapper para adaptarlo a la sidebar* */    }
      <div className={sidebar=== true ?"wrapper": "side"}>
        <TableProduction />    
      </div>
    </>
  );
}

export default Production