import SideBarMenu from "./components/SideBarMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Login from "./pages/Login";

//Librerias para el login
import useToken from "./components/useToken";

//NOTA: para borrar el token de sessionStorage utilizamos
//sessionStorage.clear()

function App() {
  const { token, setToken } = useToken();

  //Se niega el token, si da true significa que no es un token valido
  if (!token) {
    return <Login setToken={setToken} />;
  }

  //Si no se cumplio la condicional se devuelve al cliente el home
  return (
    <>
      <BrowserRouter>
        <SideBarMenu />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/products" element={<Products />} />
          <Route path="/inventory/providers" element={<Providers />} />
          <Route path="/inventory/shopping" element={<Shopping />} />
          <Route
            path="/inventory/sales_returns"
            element={<CustomerReturns />}
          />
          <Route
            path="/inventory/shopping_returns"
            element={<ProvidersReturns />}
          />
          <Route path="/orders" element={<Orders />} />
          <Route path="/production_cost" element={<Production />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
