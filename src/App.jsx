import React, { useState, useEffect } from 'react'
import SideBarMenu from "./components/SideBarMenu"
import { BrowserRouter as Router,Switch,Route, Redirect} from "react-router-dom";
import Sales from "./pages/Sales";
/* El renderizado del home está en el componente <HomeLogin /> */
import Home from "./pages/Home";
import ModalSales from "./components/ModalSales"
import MenuCostos from "./components/MenuCostos"
import Orders from "./pages/Orders";
import Production from "./pages/Production";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import AdminUsers from "./pages/AdminUsers";
import Reports from "./pages/Reports";
import Products from "./pages/Products";
import Providers from "./pages/Providers";
import Shopping from "./pages/Shopping";
import NewShop from "./pages/NewShop";
import CustomerReturns from "./pages/CustomerReturns";
import ProvidersReturns from "./pages/ProvidersReturns";
import Login from './pages/Login';
import { SidebarProvider } from './providers/SidebarProvider'
import HomeLogin from './pages/HomeLogin';
import './assets/styles/Login.css'
import FinishedProduct from './pages/FinishedProduct';
import RawMaterial from './pages/RawMaterial';
import PackingMaterial from './pages/PackingMaterial'
function App() {
  /* Lógica de autenticación de Usuario */
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (booleand) => {
    setIsAuthenticated(booleand);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:3000/auth/verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  });

  /* render={(props) =>
  isAuthenticated ? ( esto comprueba si el usuario esta autenticado
    <Login {...props} setAuth={setAuth} /> redirige a esta ruta si esta esta autenticado
  ) : (
    <Redirect to="/home" /> sino lo redirige a otra ruta
  )
  }
  */
  return (
  <>
    <SidebarProvider >
      <Router>
          <Switch>
            <Route  
                exact 
                path="/" 
                render={(props) => 
                  !isAuthenticated ? (
                    <Login {...props} setAuth={setAuth} />
                  ) : (
                    // home ????
                    <Redirect to="/home" />
                  )
                }
            ></Route>
            <Route  
              exact 
              path="/login" 
              render={(props) => 
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  // home ????
                  <Redirect to="/home" />
                )
              }
            ></Route>
            <Route 
              exact
              path="/home"
              render={(props) => 
                isAuthenticated ? (
                  <>
                    <SideBarMenu {...props} setAuth={setAuth} />
                    <HomeLogin />
                  </>
                ) : (
                  <Redirect to="/login" />
                )
              }
            ></Route>

            <Route 
              exact
              path="/sales"
              render={(props) => 
                isAuthenticated ? (
                <>
                  <SideBarMenu {...props} setAuth={setAuth} />
                  <Sales />
                </>
                ) : (
                <Redirect to="/login" />
              )}
            ></Route>
            <Route 
              path="/new"
              render={(props) => 
                isAuthenticated ? (
                <>
                  <SideBarMenu {...props} setAuth={setAuth} />
                  <ModalSales /> 
                </>
                ) : (
                <Redirect to="/login" />
              )}
            ></Route>

            <Route
              path='/menu_costos'
              render={(props)=>
                isAuthenticated ? (
                <>
                  <SideBarMenu {...props} setAuth={setAuth} />
                  <MenuCostos />
                </>
                ) : (
                <Redirect to="/login"/>
              )}
            ></Route>

            <Route
              path="/inventory"
              render={(props) =>
                isAuthenticated ? (
                <>
                  <SideBarMenu {...props} setAuth={setAuth} />
                  <Inventory />
                </> 
                ) : (
                  <Redirect to="/login" />
              )}
            ></Route>
            <Route
              path="/products"
              render={(props) =>
                isAuthenticated ? (
                <>
                  <SideBarMenu {...props} setAuth={setAuth} />
                  <Products /> 
                </>
                ) : (<Redirect to="/login" />
              )}
            ></Route>
            <Route
              path="/finished_product"
              render={(props) =>
                isAuthenticated ? (
                <>
                  <SideBarMenu {...props} setAuth={setAuth} />
                  <FinishedProduct /> 
                </>
                ) : (<Redirect to="/login" />
              )}
            ></Route>
            <Route
              path="/raw_material"
              render={(props) =>
                isAuthenticated ? (
                <>
                  <SideBarMenu {...props} setAuth={setAuth} />
                  <RawMaterial />   
                </>
                ) : (<Redirect to="/login" />
              )}
            ></Route>
            <Route
              path="/packing_material"
              render={(props) =>
                isAuthenticated ? (
                <>
                  <SideBarMenu {...props} setAuth={setAuth} />
                  <PackingMaterial /> 
                </>
                ) : (<Redirect to="/login" />
              )}
            ></Route>
            <Route
              path="/providers"
              render={(props) =>
                isAuthenticated ? (
                <>
                  <SideBarMenu {...props} setAuth={setAuth} />
                  <Providers /> 
                </>
                ) : (<Redirect to="/login" />
              )}
            ></Route>
            <Route
              path="/shopping"
              render={(props) =>
                isAuthenticated ? (
                <>
                  <SideBarMenu {...props} setAuth={setAuth} />
                  <Shopping /> 
                </>
                
                ) : (<Redirect to="/login" />
              )}
            ></Route>
            <Route
              path="/new_shopping"
              render={(props) =>
                isAuthenticated ? (
                <>
                  <SideBarMenu {...props} setAuth={setAuth} />
                  <NewShop /> 
                </>
                
                ) : (<Redirect to="/login" />
              )}
            ></Route>
            <Route
              path="/sales_returns"
              render={(props) =>
                isAuthenticated ? (
                  <>
                    <SideBarMenu {...props} setAuth={setAuth} />
                    <CustomerReturns /> 
                  </>
                ) : (<Redirect to="/login" />
              )}
            ></Route>
            <Route
              path="/shopping_returns"
              render={(props) =>
                isAuthenticated ? (
                  <>
                    <SideBarMenu {...props} setAuth={setAuth} />
                    <ProvidersReturns /> 
                  </>
                  ) : (<Redirect to="/login" />
              )}
            ></Route>
            <Route
              path="/orders"
              render={(props) =>
                isAuthenticated ? (
                <>
                  <SideBarMenu {...props} setAuth={setAuth} />
                  <Orders /> 
                </>
                ) : <Redirect to="/login" />
              }
            ></Route>
            <Route
              path="/production_cost"
              render={(props) =>
                isAuthenticated ? (
                <>
                  <SideBarMenu {...props} setAuth={setAuth} />
                  <Production /> 
                </>
                
                ) : (<Redirect to="/login" />
              )}
            ></Route>
            <Route
              path="/customers"
              render={(props) =>
                isAuthenticated ? (
                <>
                  <SideBarMenu {...props} setAuth={setAuth} />
                  <Customers /> 
                </>

                ) : (<Redirect to="/login" />
              )}
            ></Route>
            <Route
              path="/users"
              render={(props) =>
                isAuthenticated ? (
                <>
                  <SideBarMenu {...props} setAuth={setAuth} />
                  <AdminUsers />
                </>
                
                ) : (<Redirect to="/login" />
              )}
            ></Route>
            <Route
              path="/reports"
              render={(props) =>
                isAuthenticated ? (
                <>
                  <SideBarMenu {...props} setAuth={setAuth} />
                  <Reports /> 
                </>
                ) : (<Redirect to="/login" />
              )}
            ></Route>
          </Switch>
      </Router>
    </SidebarProvider>
  </>
  )
}

export default App