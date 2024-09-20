import React from 'react';
import HomePage from './components/HomePage';
import Dashboard from './components/Admin/Dashboard.js';
import Authentication from './components/Authentication';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import RegisterForm from './components/RegisterForm';
import AboutUs from './components/AboutUs.js';
import AdminLoginForm from './components/Admin/AdminLoginForm.js';
import Product from './components/Admin/Product/Product.js';
import Supplier from './components/Admin/Supplier/Supplier.js';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminLoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Authentication />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/products" component={Product} />
        <Route path="/dashboard/suppliers" component={Supplier} />
      </Routes>
    </Router>
  );
}

export default App;
