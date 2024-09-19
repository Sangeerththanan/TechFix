import React from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/logo.jpeg'; // Import the logo

const Navbar = () => {
  return (
    <nav className="relative bg-navBackground text-white py-4 shadow-lg">
      <div className="flex justify-between items-center px-4">
        {/* Logo on the left */}
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="TechFix Logo" className="w-12 h-6" /> 
          </Link>
        </div>

        {/* Navigation Links and User/Cart Icons on the right */}
        <div className="flex items-center space-x-10">
          <ul className="flex space-x-5">
            <li className="p-2 hover:bg-navMenu cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="p-2 hover:bg-navMenu cursor-pointer">
              <Link to="/aboutus">About Us</Link>
            </li>
            <li className="p-2 hover:bg-navMenu cursor-pointer">Our Products</li>
            <li className="p-2 hover:bg-navMenu cursor-pointer">Our Services</li>
            <li className="p-2 hover:bg-navMenu cursor-pointer">Careers</li>
          </ul>

          {/* User Icon and Cart */}
          <ul className="flex space-x-4">
            <li className="hover:bg-navMenu p-2 cursor-pointer">
              <Link to="/login">
                <i className="fa-solid fa-user" />
              </Link>
            </li>
            <li className="hover:bg-navMenu p-2 cursor-pointer">
              <i className="fa-solid fa-cart-shopping" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
