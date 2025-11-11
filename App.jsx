// App.js
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Admin from "./Pages/Admin";
import ProductForm from "./Components/ProductForm";
import TicketList from "./Components/Tickets/TicketList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={<Login setIsLoggedIn={setIsLoggedIn} />}
      />
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? (
            <Dashboard setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )
        }
      />
      <Route
        path="/admin"
        element={
          isLoggedIn ? (
            <Admin setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )
        }
      />
      <Route
        path="/tickets"
        element={
          isLoggedIn ? (
            <TicketList />
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )
        }
      />
    </Routes>
  );
  
}

export default App;





