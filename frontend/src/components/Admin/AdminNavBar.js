import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { removeToken } from '../Service/tokenService'; 

const AdminNavBar = ({ setSelectedComponent }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken(); // Clear the token
        navigate('/'); // Redirect to home page
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between">
                <div className="text-white text-lg font-semibold">Admin Dashboard</div>
                <div className="flex items-center">
                    <NavLink
                        to="#"
                        onClick={() => setSelectedComponent('products')}
                        className="text-gray-300 hover:text-white px-4"
                    >
                        Products
                    </NavLink>
                    <NavLink
                        to="#"
                        onClick={() => setSelectedComponent('suppliers')}
                        className="text-gray-300 hover:text-white px-4"
                    >
                        Suppliers
                    </NavLink>
                    <NavLink
                        to="#"
                        onClick={() => setSelectedComponent('analytics')}
                        className="text-gray-300 hover:text-white px-4"
                    >
                        Analytics
                    </NavLink>
                    <NavLink
                        to="#"
                        onClick={() => setSelectedComponent('inventory')}
                        className="text-gray-300 hover:text-white px-4"
                    >
                        Inventory
                    </NavLink>
                    <button
                        onClick={handleLogout}
                        className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavBar;
