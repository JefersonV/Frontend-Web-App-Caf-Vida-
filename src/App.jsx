import React, { useState, useEffect } from "react";
import SideBarMenu from "./components/SideBarMenu";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Sales from "./pages/Sales";
/* El renderizado del home está en el componente <HomeLogin /> */
import Home from "./pages/Home";
import ModalSales from "./components/ModalSales";
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
import Login from "./pages/Login";
import { SidebarProvider } from "./providers/SidebarProvider";
import HomeLogin from "./pages/HomeLogin";
import "./assets/styles/Login.css";
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
      <SidebarProvider>
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
                  <HomeLogin {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            ></Route>

            <Route
              path="/sales"
              render={(props) =>
                isAuthenticated ? <Sales /> : <Redirect to="/login" />
              }
            ></Route>
            <Route
              path="/new"
              render={(props) =>
                isAuthenticated ? <ModalSales /> : <Redirect to="/login" />
              }
            ></Route>
            <Route
              path="/inventory"
              render={(props) =>
                isAuthenticated ? <Inventory /> : <Redirect to="/login" />
              }
            ></Route>
            <Route
              path="/products"
              render={(props) =>
                isAuthenticated ? <Products /> : <Redirect to="/login" />
              }
            ></Route>
            <Route
              path="/providers"
              render={(props) =>
                isAuthenticated ? <Providers /> : <Redirect to="/login" />
              }
            ></Route>
            <Route
              path="/shopping"
              render={(props) =>
                isAuthenticated ? <Shopping /> : <Redirect to="/login" />
              }
            ></Route>
            <Route
              path="/new_shopping"
              render={(props) =>
                isAuthenticated ? <NewShop /> : <Redirect to="/login" />
              }
            ></Route>
            <Route
              path="/sales_returns"
              render={(props) =>
                isAuthenticated ? <CustomerReturns /> : <Redirect to="/login" />
              }
            ></Route>
            <Route
              path="/shopping_returns"
              render={(props) =>
                isAuthenticated ? (
                  <ProvidersReturns />
                ) : (
                  <Redirect to="/login" />
                )
              }
            ></Route>
            <Route
              path="/orders"
              render={(props) =>
                isAuthenticated ? <Orders /> : <Redirect to="/login" />
              }
            ></Route>
            <Route
              path="/production_cost"
              render={(props) =>
                isAuthenticated ? <Production /> : <Redirect to="/login" />
              }
            ></Route>
            <Route
              path="/customers"
              render={(props) =>
                isAuthenticated ? <Customers /> : <Redirect to="/login" />
              }
            ></Route>
            <Route
              path="/users"
              render={(props) =>
                isAuthenticated ? <AdminUsers /> : <Redirect to="/login" />
              }
            ></Route>
            <Route
              path="/reports"
              render={(props) =>
                isAuthenticated ? <Reports /> : <Redirect to="/login" />
              }
            ></Route>
          </Switch>
        </Router>
      </SidebarProvider>
    </>
  );
}

export default App;
