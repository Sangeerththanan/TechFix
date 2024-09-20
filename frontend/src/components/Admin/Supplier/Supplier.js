import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Service/axiosInstance'; // Adjust the path accordingly
import UpdateButton from '../../Button/UpdateButton';
import DeleteButton from '../../Button/DeleteButton';
import CancelButton from '../../Button/CancelButton';
import AddButton from '../../Button/AddButton';

function Supplier() {
    const [suppliers, setSuppliers] = useState([]);
    const [newSupplier, setNewSupplier] = useState({
        name: '',
        apiUrl: '',
        contactInfo: '',
        status: ''
    });
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Fetch suppliers from backend
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axiosInstance.get('/supplier');
                setSuppliers(response.data);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            }
        };
        fetchSuppliers();
    }, []);

    // Handle input changes for adding and updating suppliers
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (isUpdateModalOpen) {
            setSelectedSupplier({ ...selectedSupplier, [name]: value });
        } else {
            setNewSupplier({ ...newSupplier, [name]: value });
        }
    };

    // Handle adding new supplier
    const handleSubmitAdd = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/supplier', newSupplier);
            const response = await axiosInstance.get('/supplier');
            setSuppliers(response.data);
            setIsAddModalOpen(false);
            setNewSupplier({ name: '', apiUrl: '', contactInfo: '', status: '' });
        } catch (error) {
            console.error('Error adding supplier:', error);
        }
    };

    // Handle updating supplier
    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/supplier/${selectedSupplier.id}`, selectedSupplier);
            const response = await axiosInstance.get('/supplier');
            setSuppliers(response.data);
            setIsUpdateModalOpen(false);
            setSelectedSupplier(null);
        } catch (error) {
            console.error('Error updating supplier:', error);
        }
    };

    // Handle delete supplier
    const handleDeleteSupplier = async () => {
        try {
            await axiosInstance.delete(`/supplier/${selectedSupplier.id}`);
            const response = await axiosInstance.get('/supplier');
            setSuppliers(response.data);
            setIsDeleteModalOpen(false);
            setSelectedSupplier(null);
        } catch (error) {
            console.error('Error deleting supplier:', error);
        }
    };

    return (
        <div className="p-5 bg-gray-100 min-h-screen relative">
            <h3 className="text-xl font-semibold mb-2">Supplier List</h3>
            <table className="table-auto w-full bg-white shadow rounded">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">API URL</th>
                        <th className="px-4 py-2">Contact Info</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((supplier) => (
                        <tr key={supplier.id} className="border-t">
                            <td className="px-4 py-2">{supplier.name}</td>
                            <td className="px-4 py-2">{supplier.apiUrl}</td>
                            <td className="px-4 py-2">{supplier.contactInfo}</td>
                            <td className="px-4 py-2">{supplier.status}</td>
                            <td className="px-4 py-2 text-center flex justify-center space-x-2">
                                <UpdateButton
                                    onClick={() => {
                                        setSelectedSupplier(supplier);
                                        setIsUpdateModalOpen(true);
                                    }}
                                />
                                <DeleteButton
                                    onClick={() => {
                                        setSelectedSupplier(supplier);
                                        setIsDeleteModalOpen(true);
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Supplier Button */}
            <div className="fixed bottom-4 right-4">
                <button
                    className="bg-blue-500 text-white p-3 rounded-full"
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Add Supplier
                </button>
            </div>

            {/* Add Supplier Modal */}
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
                                    value={newSupplier.name}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="apiUrl">API URL</label>
                                <input
                                    type="text"
                                    id="apiUrl"
                                    name="apiUrl"
                                    value={newSupplier.apiUrl}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="contactInfo">Contact Info</label>
                                <input
                                    type="text"
                                    id="contactInfo"
                                    name="contactInfo"
                                    value={newSupplier.contactInfo}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="status">Status</label>
                                <input
                                    type="text"
                                    id="status"
                                    name="status"
                                    value={newSupplier.status}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full"
                                    required
                                />
                            </div>
                            <div className='flex justify-end mt-4'>
                                <AddButton label="Add Supplier"/>
                                <CancelButton onClick={() => setIsAddModalOpen(false)} />
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Update Modal */}
            {isUpdateModalOpen && selectedSupplier && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                        <form onSubmit={handleSubmitUpdate}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={selectedSupplier.name}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="apiUrl">API URL</label>
                                <input
                                    type="text"
                                    id="apiUrl"
                                    name="apiUrl"
                                    value={selectedSupplier.apiUrl}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full"
                                    required
                                />
                            </div>
                            <div className='flex justify-end mt-4'>
                                <button type="submit" className="bg-yellow-500 text-white p-2 rounded">
                                    Update Supplier
                                </button>
                                <CancelButton onClick={() => setIsUpdateModalOpen(false)} />
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {isDeleteModalOpen && selectedSupplier && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                        <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
                        <p>Are you sure you want to delete the supplier "{selectedSupplier.name}"?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-red-500 text-white p-2 rounded"
                                onClick={handleDeleteSupplier}
                            >
                                Delete
                            </button>
                            <CancelButton onClick={() => setIsDeleteModalOpen(false)} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Supplier;
