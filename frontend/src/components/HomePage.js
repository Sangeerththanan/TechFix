import React from 'react';
import Navbar from './Navbar';

const HomePage = () => {
  return (
    <div className="bg-indigo-900 text-white min-h-screen flex flex-col justify-center items-center">
      <header className="text-center py-5">
        <h1 className="text-4xl font-bold">Managed IT Services You Can Trust</h1>
        <p className="mt-4">
          Techfix Solutions is a leading IT service and business technology company.
        </p>
      </header>
      <button className="bg-pink-500 px-4 py-2 rounded-full text-white font-semibold hover:bg-pink-700 mt-4">
        Get Started
      </button>
    </div>
  );
};

export default HomePage;