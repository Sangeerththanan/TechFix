import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Dashboard from './components/Admin/Dashboard';
import Authentication from './components/Authentication';
import Navbar from './components/Navbar';
import RegisterForm from './components/RegisterForm';
import AboutUs from './components/AboutUs';
import AdminLoginForm from './components/Admin/AdminLoginForm';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import ProductGallery from './components/ProductGallery';

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
        <Route path="/products" element={<ProductGallery />} />

        
        {/* Protected Route for Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
