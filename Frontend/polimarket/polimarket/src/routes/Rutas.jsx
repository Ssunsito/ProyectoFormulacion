import React from 'react'
import Login from '../vistas/Login/Login.jsx'
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../vistas/Comprador/Dashboard.jsx';
import SellerDashboard from '../vistas/Vendedor/SellerDashboard.jsx';

function Rutas() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
     <Route path="/Dashboard" element={<Dashboard/>} />
     <Route path="/seller" element={<SellerDashboard/>} />
    </Routes>
  )
}

export default Rutas;