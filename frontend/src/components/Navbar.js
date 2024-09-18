import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  
  return (
    <nav className="relative">
      <div className=" md:flex justify-end items-center bg-navBackground p-4 bg-navBackground text-white py-4 shadow-lg">
        <div>
          <ul className="flex space-x-5">
            <li className="p-2 hover:bg-navMenu cursor-pointer"><Link to="/">Home</Link></li>
            <li className="p-2 hover:bg-navMenu cursor-pointer">About Us</li>
            <li className="p-2 hover:bg-navMenu cursor-pointer">Our Products</li>
            <li className="p-2 hover:bg-navMenu cursor-pointer">Our Services</li>
            {/* <li className="p-2 hover:bg-navMenu cursor-pointer">Dashboard</li> */}
            <li className="p-2 hover:bg-navMenu cursor-pointer">Careers</li>
          </ul>
        </div>
        <div>
          <ul className="flex space-x-4">
            <li className="hover:bg-navMenu p-2 cursor-pointer"><Link to="/login"><i className="fa-solid fa-user" /></Link></li>
            <li className="hover:bg-navMenu p-2 cursor-pointer"><i className="fa-solid fa-cart-shopping" /></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
