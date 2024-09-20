import React from 'react';
import logo from './assets/logo.png';

const AboutUs = () => {
  return (
    <div className="bg-indigo-900 text-white min-h-screen flex flex-col justify-center items-center">
      <header className="text-center py-5">
        <h2 className="text-3xl font-bold">About TechFix</h2>
        <p className="mt-4 text-lg">
          TechFix is your one-stop shop for all your tech needs. Experience expert tech support and personalized solutions at TechFix.
        </p>
      </header>

      <div className="flex justify-center mt-8">
        <img src={logo} alt="TechFix Logo" className="w-32 h-32" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 w-full max-w-4xl">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Our Location</h3>
          <p>
            TechFix
            <br />
            No. 123, Main Street
            <br />
            Colombo 00100
            <br />
            Sri Lanka
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Contact Us</h3>
          <p>
            Phone: +94 11 234 5678
            <br />
            Email: info@techfix.com
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-16">
        <button className="bg-pink-500 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
