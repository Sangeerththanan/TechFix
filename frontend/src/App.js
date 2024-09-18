import React from 'react';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import SupplierManagement from './components/SupplierManagement';
import QuotingSystem from './components/QuotingSystem';
import InventoryViewer from './components/InventoryViewer';
import OrderPlacement from './components/OrderPlacement';
import OrderHistoryTracking from './components/OrderHistoryTracking';
import Alerts from './components/Alerts';
import Authentication from './components/Authentication';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import RegisterForm from './components/RegisterForm';
import AdminLoginForm from './components/AdminLoginForm.js';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminLoginForm />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Authentication />} />
      </Routes>
    </Router>
  );
}

export default App;
