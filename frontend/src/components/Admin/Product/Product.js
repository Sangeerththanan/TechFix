import React, { useState, useEffect }  from 'react'
import axios from 'axios';
import UpdateButton from '../../Button/UpdateButton';
import DeleteButton from '../../Button/DeleteButton';
import CancelButton from '../../Button/CancelButton';

function Product() {
    const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: ''
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // For delete modal

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

  // Handle input changes for adding and updating products
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isUpdateModalOpen) {
      setSelectedProduct({ ...selectedProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  // Handle adding new product
  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/product', newProduct);
      const response = await axios.get('http://localhost:8080/product');
      setProducts(response.data);
      setIsAddModalOpen(false);
      setNewProduct({ name: '', description: '', category: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Handle updating product
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/product/${selectedProduct.id}`, selectedProduct);
      const response = await axios.get('http://localhost:8080/product');
      setProducts(response.data);
      setIsUpdateModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Handle delete product
  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:8080/product/${selectedProduct.id}`);
      const response = await axios.get('http://localhost:8080/product');
      setProducts(response.data);
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen relative">
      {/* Product Table */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Product List</h3>
        <table className="table-auto w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.description}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2 text-center flex justify-center space-x-2">
                  <UpdateButton
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsUpdateModalOpen(true);
                    }}
                  />
                  <DeleteButton
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsDeleteModalOpen(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Component in the bottom right corner */}
      <div className="fixed bottom-4 right-4">
        <button
          className="bg-blue-500 text-white p-3 rounded-full"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Product
        </button>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <form onSubmit={handleSubmitAdd}>
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
              <div className='flex justify-end mt-4'>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Add Product
              </button>
              <CancelButton onClick={() => setIsAddModalOpen(false)} />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {isUpdateModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <form onSubmit={handleSubmitUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={selectedProduct.name}
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
                  value={selectedProduct.description}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <div className='flex justify-end mt-4'>
              <button type="submit" className="bg-yellow-500 text-white p-2 rounded">
                Update Product
              </button>
              <CancelButton onClick={() => setIsUpdateModalOpen(false)} />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete the product "{selectedProduct.name}"?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={handleDeleteProduct}
              >
                Delete
              </button>
              <CancelButton onClick={() => setIsDeleteModalOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Product
