import SideBarMenu from "./components/SideBarMenu"
import { BrowserRouter as Router,Switch,Route} from "react-router-dom";
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
import { SidebarProvider } from './providers/SidebarProvider'

function App() {
  return (
  <>
    <SidebarProvider >
      <Router>
        <SideBarMenu/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/sales" component={Sales} />
            <Route path="/inventory" component={Inventory} />
            <Route path="/inventory/products" component={Products} />
            <Route path="/inventory/providers" component={Providers} />
            <Route path="/inventory/shopping" component={Shopping} />
            <Route path="/inventory/sales_returns" component={CustomerReturns} />
            <Route path="/inventory/shopping_returns" component={ProvidersReturns} />
            <Route path="/orders" component={Orders} />
            <Route path="/production_cost" component={Production} />
            <Route path="/customers" component={Customers} />
            <Route path="/users" component={AdminUsers} />
            <Route path="/reports" component={Reports} />
          </Switch>
      </Router>
    </SidebarProvider>
  </>
  )
}

export default App