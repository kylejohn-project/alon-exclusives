import { useEffect, useState } from "react";
import { Routes, Route} from 'react-router'

import NavBar from "./components/NavBar";


import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Expenses from "./pages/Expenses";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/orders" element={<Orders />}/>
        <Route path="/expenses" element={<Expenses />}/>
        <Route path="/inventory" element={<Inventory />}/>
      </Routes>
      
    </>
  );
}

export default App;