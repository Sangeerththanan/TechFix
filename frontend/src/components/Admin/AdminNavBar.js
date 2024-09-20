import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNavBar = ({ setSelectedComponent }) => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between">
                <div className="text-white text-lg font-semibold">Admin Dashboard</div>
                <div>
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
                </div>
            </div>
        </nav>
    );
};

export default AdminNavBar;
