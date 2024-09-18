import React, { useState } from 'react'; // Import useState for form state management
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Authentication = () => {
  const [username, setUsername] = useState(''); // State for username
  const [password, setPassword] = useState(''); // State for password
  const [role, setRole] = useState(''); // State for role (optional)

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Implement form validation here (optional)
    // You can use regular expressions or a validation library to ensure
    // username and password meet your requirements (e.g., minimum length, complexity)

    try {
      const response = await fetch('/api/login', { // Assuming a backend API endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const data = await response.json();

      // Handle successful login (e.g., store user data in local storage, redirect to a different page)
      console.log('Login successful:', data);
    } catch (error) {
      console.error('Login error:', error.message);
      // Display an error message to the user
    }
  };

  return (
      <LoginForm/>
  );
};

export default Authentication;