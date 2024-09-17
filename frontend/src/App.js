import React from 'react';

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mt-4">Not Found</h2>
        <p className="text-gray-500 mt-2">Sorry, the page you are looking for does not exist.</p>
        <a href="/" className="mt-6 inline-block px-6 py-3 text-white bg-blue-600 rounded hover:bg-blue-700">
          Go Home
        </a>
      </div>
    </div>
  );
}

export default App;
