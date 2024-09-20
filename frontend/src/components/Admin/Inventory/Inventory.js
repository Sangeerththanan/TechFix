import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateButton from '../../Button/UpdateButton';
import DeleteButton from '../../Button/DeleteButton';
import CancelButton from '../../Button/CancelButton';
import ViewButton from '../../Button/ViewButton';
import CloseButton from '../../Button/CloseButton';
import AddButton from '../../Button/AddButton';

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [suppliers, setSuppliers] = useState([]); // State for suppliers
  const [newInventory, setNewInventory] = useState({
    productCode: '',
    supplier: '',
    stockLevel: 0,
    threshold: 0,
  });
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isStockLevelsModalOpen, setIsStockLevelsModalOpen] = useState(false);
  const [stockLevels, setStockLevels] = useState([]);

  // Fetch inventory and suppliers from backend
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('http://localhost:8080/inventory');
        setInventory(response.data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/supplier');
        setSuppliers(response.data); // Set suppliers
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchInventory();
    fetchSuppliers();
  }, []);

  // Handle input changes for adding and updating inventory
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isUpdateModalOpen) {
      setSelectedInventory({ ...selectedInventory, [name]: value });
    } else {
      setNewInventory({ ...newInventory, [name]: value });
    }
  };

  // Handle adding new inventory
  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      const newInventoryWithTime = {
        ...newInventory,
        supplier: { id: newInventory.supplier },  // Wrap supplier as an object with an 'id' field
        lastUpdated: new Date().toISOString(),   // Current system time
      };
      await axios.post('http://localhost:8080/inventory', newInventoryWithTime);
      const response = await axios.get('http://localhost:8080/inventory');
      setInventory(response.data);
      setIsAddModalOpen(false);
      setNewInventory({ productCode: '', supplier: '', stockLevel: 0, threshold: 0 });
    } catch (error) {
      console.error('Error adding inventory:', error);
    }
  };

  // Handle updating stock level
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/inventory/stock/${selectedInventory.id}`, { stockLevel: selectedInventory.stockLevel });
      const response = await axios.get('http://localhost:8080/inventory');
      setInventory(response.data);
      setIsUpdateModalOpen(false);
      setSelectedInventory(null);
    } catch (error) {
      console.error('Error updating inventory:', error);
    }
  };

  // Handle delete inventory
  const handleDeleteInventory = async () => {
    try {
      await axios.delete(`http://localhost:8080/inventory/${selectedInventory.id}`);
      const response = await axios.get('http://localhost:8080/inventory');
      setInventory(response.data);
      setIsDeleteModalOpen(false);
      setSelectedInventory(null);
    } catch (error) {
      console.error('Error deleting inventory:', error);
    }
  };

  // Handle viewing stock levels
  const handleViewStockLevels = async () => {
    try {
      const response = await axios.get('http://localhost:8080/inventory/stock');
      setStockLevels(response.data);
      setIsStockLevelsModalOpen(true); // Open modal for stock levels
    } catch (error) {
      console.error('Error fetching stock levels:', error);
    }
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen relative">
      {/* Inventory Table */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Inventory List</h3>
        <table className="table-auto w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Product Code</th>
              <th className="px-4 py-2">Supplier</th>
              <th className="px-4 py-2">Stock Level</th>
              <th className="px-4 py-2">Threshold</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2">{item.productCode}</td>
                <td className="px-4 py-2">{item.supplier.name}</td>
                <td className="px-4 py-2">{item.stockLevel}</td>
                <td className="px-4 py-2">{item.threshold}</td>
                <td className="px-4 py-2 text-center flex justify-center space-x-2">
                  <UpdateButton
                    onClick={() => {
                      setSelectedInventory(item);
                      setIsUpdateModalOpen(true);
                    }}
                  />
                  <DeleteButton
                    onClick={() => {
                      setSelectedInventory(item);
                      setIsDeleteModalOpen(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Inventory Button */}
      <div className="fixed bottom-4 right-4">
        <button
          className="bg-blue-500 text-white p-3 rounded-full"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Inventory
        </button>
      </div>

      {/* Add Inventory Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <form onSubmit={handleSubmitAdd}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="productCode">Product Code</label>
                <input
                  type="text"
                  id="productCode"
                  name="productCode"
                  value={newInventory.productCode}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="supplier">Supplier</label>
                <select
                  id="supplier"
                  name="supplier"
                  value={newInventory.supplier}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                >
                  <option value="" disabled>Select Supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="stockLevel">Stock Level</label>
                <input
                  type="number"
                  id="stockLevel"
                  name="stockLevel"
                  value={newInventory.stockLevel}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="threshold">Threshold</label>
                <input
                  type="number"
                  id="threshold"
                  name="threshold"
                  value={newInventory.threshold}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <div className='flex justify-end mt-4'>
                <AddButton label="Add Inventory"/>
                <CancelButton onClick={() => setIsAddModalOpen(false)} />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {isUpdateModalOpen && selectedInventory && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <form onSubmit={handleSubmitUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="stockLevel">Stock Level</label>
                <input
                  type="number"
                  id="stockLevel"
                  name="stockLevel"
                  value={selectedInventory.stockLevel}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <div className='flex justify-end mt-4'>
                <button type="submit" className="bg-yellow-500 text-white p-2 rounded">
                  Update Inventory
                </button>
                <CancelButton onClick={() => setIsUpdateModalOpen(false)} />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && selectedInventory && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete the inventory item with product code "{selectedInventory.productCode}"?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={handleDeleteInventory}
              >
                Delete
              </button>
              <CancelButton onClick={() => setIsDeleteModalOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* View Stock Levels Modal */}
      {isStockLevelsModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Stock Levels</h3>
            <ul>
              {stockLevels.map((item) => (
                <li key={item.productCode} className="mb-2">
                  {item.productCode}: {item.stockLevel}
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <CloseButton onClick={() => setIsStockLevelsModalOpen(false)}/>
            </div>
          </div>
        </div>
      )}

      {/* View Stock Levels Button */}
      <div className="fixed bottom-4 left-4">
        <ViewButton onClick={handleViewStockLevels} label="View Stock Levels"/>
      </div>
    </div>
  );
}

export default Inventory;
