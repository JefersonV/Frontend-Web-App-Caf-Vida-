import SideBarMenu from "./components/SideBarMenu"
import { BrowserRouter,Routes,Route} from "react-router-dom";
import Sales from "./pages/Sales";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Production from "./pages/Production";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import AdminUsers from "./pages/AdminUsers";
import Reports from "./pages/Reports";
import Products from "./pages/Products";
import Providers from "./pages/Providers";
import Shopping from "./pages/Shopping";
import CustomerReturns from "./pages/CustomerReturns";
import ProvidersReturns from "./pages/ProvidersReturns";

function App() {
  return (
  <>
    <BrowserRouter>
      <SideBarMenu/>
        <Routes>
          <Route exact path="/" element={ <Home/> }/>
          <Route path="/sales" element={<Sales/>}/>
          <Route path="/inventory" element={<Inventory/>} />
          <Route path="/inventory/products" element={<Products/>} />
          <Route path="/inventory/providers" element={<Providers/>} />
          <Route path="/inventory/shopping" element={<Shopping/>} />
          <Route path="/inventory/sales_returns" element={<CustomerReturns/>} />
          <Route path="/inventory/shopping_returns" element={<ProvidersReturns/>} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/production_cost" element={<Production/>} />
          <Route path="/customers" element={<Customers/>} />
          <Route path="/users" element={<AdminUsers/>} />
          <Route path="/reports" element={<Reports/>} />
        </Routes>
    </BrowserRouter>
  </>
  )
}

export default App