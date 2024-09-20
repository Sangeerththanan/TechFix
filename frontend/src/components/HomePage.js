import React from 'react';
import logo from './assets/logo.png';
import Navbar from './Navbar';

const HomePage = () => {
  return (
    <div className="bg-indigo-900 text-white min-h-screen flex flex-col justify-center items-center">
      <header className="text-center py-5">
        {/* Add the logo here */}
        <div className="mb-6">
          <img src={logo} alt="TechFix Logo" className="w-32 h-32 mx-auto" />
        </div>
        <h1 className="text-4xl font-bold">TechFix: Your one-stop shop for all your tech needs.</h1>
        <p className="mt-4">
          Experience expert tech support and personalized solutions at TechFix.
        </p>
      </header>
      <button className="bg-pink-500 px-4 py-2 rounded-full text-white font-semibold hover:bg-pink-700 mt-4">
        Get Started
      </button>
    </div>
  );
};

export default HomePage;
