import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AdminLoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/user/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Login successful!');
        // Navigate to Dashboard after successful login
        navigate('/admin/dashboard');
      } else {
        setMessage(`Login failed: ${data.message}`);
      }
    } catch (error) {
      setMessage('Error during login. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-5">Admin Login</h2>
        {message && (
          <div className={`mb-4 p-2 text-center ${message.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">Login</button>
        <Link className='grid justify-items-center mt-4 text-indigo-600 hover:underline' to="/register">Create new account!</Link>
      </form>
    </div>
  );
};

export default AdminLoginForm;
