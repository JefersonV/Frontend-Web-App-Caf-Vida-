import SideBarMenu from "./components/SideBarMenu"
import Product from './components/Product'
import { BrowserRouter,Routes,Route} from "react-router-dom";
import Sales from "./pages/Sales";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Production from "./pages/Production";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import AdminUsers from "./pages/AdminUsers";
import Reports from "./pages/Reports";

function App() {
  return (
  <>
    <BrowserRouter>
      <SideBarMenu/>
        <Routes>
          <Route exact path="/" element={ <Home/> }/>
          <Route path="/overview" element={<Sales/>}/>
          <Route path="/reports" element={<Inventory/>} />
          <Route path="/products" element={<Orders />} />
          <Route path="/team" element={<Production/>} />
          <Route path="/messages" element={<Customers/>} />
          <Route path="/support" element={<AdminUsers/>} />
          <Route path="/final" element={<Reports/>} />
        </Routes>
    </BrowserRouter>
  </>
  )
}

export default App