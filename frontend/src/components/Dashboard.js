import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: ''
  });

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/product');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/product', newProduct);
      // Refresh the product list
      const response = await axios.get('http://localhost:8080/product');
      setProducts(response.data);
      // Clear the form
      setNewProduct({
        name: '',
        description: '',
        category: ''
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p className="mb-4">Welcome to the dashboard!</p>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Product List</h3>
        <ul>
          {products.map(product => (
            <li key={product.id} className="mb-2 p-4 bg-white shadow rounded">
              <h4 className="text-lg font-bold">{product.name}</h4>
              <p>{product.description}</p>
              <p>Category: {product.category}</p>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-2">Add New Product</h3>
        <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={newProduct.category}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
