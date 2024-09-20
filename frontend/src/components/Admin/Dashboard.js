import React, { useState } from 'react';
import AdminNavBar from './AdminNavBar';
import Product from './Product/Product';
import Supplier from './Supplier/Supplier';
import Analytics from './Analytics/Analytics';
import Inventory from './Inventory/Inventory';

const Dashboard = () => {
    const [selectedComponent, setSelectedComponent] = useState('products');

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'products':
                return <Product />;
            case 'suppliers':
                return <Supplier />;
            case 'analytics':
                return <Analytics />;
            case 'inventory':
                return <Inventory />;
            default:
                return <Product />;
        }
    };

    return (
        <div>
            <AdminNavBar setSelectedComponent={setSelectedComponent} />
            <div className="p-5">
                {renderComponent()}
            </div>
        </div>
    );
};

export default Dashboard;
