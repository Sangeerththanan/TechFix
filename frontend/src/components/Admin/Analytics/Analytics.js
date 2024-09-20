import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteButton from '../../Button/DeleteButton';
import CancelButton from '../../Button/CancelButton';
import AddButton from '../../Button/AddButton';

function Analytics() {
    const [analytics, setAnalytics] = useState([]);
    const [newAnalytics, setNewAnalytics] = useState({
        reportType: '',
        totalSales: '',
        topProduct: '',
        salesByRegion: { North: '', South: '', West: '' },
        createdAt: ''
    });

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedAnalytics, setSelectedAnalytics] = useState(null);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const response = await axios.get('http://localhost:8080/analytics');
            setAnalytics(response.data);
        } catch (error) {
            console.error('Error fetching analytics:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = isNaN(value) ? value : Number(value);

        if (name.startsWith('salesByRegion.')) {
            const region = name.split('.')[1];
            setNewAnalytics(prev => ({
                ...prev,
                salesByRegion: { ...prev.salesByRegion, [region]: parsedValue }
            }));
        } else {
            setNewAnalytics(prev => ({ ...prev, [name]: parsedValue }));
        }
    };

    const handleSubmitAdd = async (e) => {
        e.preventDefault();
        try {
            const formattedData = {
                reportType: newAnalytics.reportType,
                data: JSON.stringify({
                    totalSales: parseFloat(newAnalytics.totalSales) || 0,
                    topProduct: newAnalytics.topProduct,
                    salesByRegion: newAnalytics.salesByRegion
                }),
                createdAt: newAnalytics.createdAt
            };
            const response = await axios.post('http://localhost:8080/analytics', formattedData);
            console.log('Added analytics:', response.data);
            fetchAnalytics();
            resetNewAnalytics();
            setIsAddModalOpen(false);
        } catch (error) {
            console.error('Error adding analytics:', error.response ? error.response.data : error.message);
        }
    };

    const handleDeleteAnalytics = async () => {
        if (selectedAnalytics && selectedAnalytics.id) {
            try {
                await axios.delete(`http://localhost:8080/analytics/${selectedAnalytics.id}`);
                fetchAnalytics();
                setIsDeleteModalOpen(false);
                setSelectedAnalytics(null);
            } catch (error) {
                console.error('Error deleting analytics:', error);
            }
        } else {
            console.error('No selected analytics or missing ID for deletion.');
        }
    };

    const resetNewAnalytics = () => {
        setNewAnalytics({
            reportType: '',
            totalSales: '',
            topProduct: '',
            salesByRegion: { North: '', South: '', West: '' },
            createdAt: ''
        });
    };

    return (
        <div className="p-5 bg-gray-100 min-h-screen relative">
            <h3 className="text-xl font-semibold mb-2">Analytics Reports</h3>
            <table className="table-auto w-full bg-white shadow rounded">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">Report Type</th>
                        <th className="px-4 py-2">Total Sales</th>
                        <th className="px-4 py-2">Top Product</th>
                        <th className="px-4 py-2">Sales by Region</th>
                        <th className="px-4 py-2">Created At</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {analytics.map((report) => {
                        let data;
                        try {
                            if (report.data) {
                                data = JSON.parse(report.data);
                            } else {
                                data = {
                                    totalSales: 0,
                                    topProduct: 'N/A',
                                    salesByRegion: { North: 0, South: 0, West: 0 }
                                };
                            }
                        } catch (error) {
                            console.error('Error parsing analytics data:', error);
                            return null;
                        }

                        const salesByRegion = data.salesByRegion;

                        return (
                            <tr key={report.id} className="border-t">
                                <td className="px-4 py-2">{report.reportType}</td>
                                <td className="px-4 py-2">{data.totalSales}</td>
                                <td className="px-4 py-2">{data.topProduct}</td>
                                <td className="px-4 py-2">
                                    {Object.entries(salesByRegion).map(([region, sales]) => (
                                        <div key={region}>
                                            {region}: {sales}
                                        </div>
                                    ))}
                                </td>
                                <td className="px-4 py-2">{report.createdAt}</td>
                                <td className="px-4 py-2 text-center flex justify-center space-x-2">
                                    <DeleteButton
                                        onClick={() => {
                                            setSelectedAnalytics(report);
                                            setIsDeleteModalOpen(true);
                                        }}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="fixed bottom-4 right-4">
                <button
                    className="bg-blue-500 text-white p-3 rounded-full"
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Add Analytics
                </button>
            </div>

            {/* Add Analytics Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                        <form onSubmit={handleSubmitAdd}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="reportType">Report Type</label>
                                <input
                                    type="text"
                                    id="reportType"
                                    name="reportType"
                                    value={newAnalytics.reportType}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="totalSales">Total Sales</label>
                                <input
                                    type="number"
                                    id="totalSales"
                                    name="totalSales"
                                    value={newAnalytics.totalSales}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="topProduct">Top Product</label>
                                <input
                                    type="text"
                                    id="topProduct"
                                    name="topProduct"
                                    value={newAnalytics.topProduct}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Sales by Region</label>
                                {Object.keys(newAnalytics.salesByRegion).map((region) => (
                                    <div key={region} className="mb-2 flex justify-between items-center">
                                        <span>{region}</span>
                                        <input
                                            type="number"
                                            name={`salesByRegion.${region}`}
                                            value={newAnalytics.salesByRegion[region]}
                                            onChange={handleChange}
                                            className="border p-2 rounded w-1/2"
                                            required
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="createdAt">Created At</label>
                                <input
                                    type="date"
                                    id="createdAt"
                                    name="createdAt"
                                    value={newAnalytics.createdAt}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <AddButton label="Add"/>
                                <CancelButton onClick={() => setIsAddModalOpen(false)} />
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                        <h4 className="text-lg mb-4">Confirm Delete</h4>
                        <p>Are you sure you want to delete this analytics report?</p>
                        <div className="flex justify-end mt-4">
                            <DeleteButton onClick={handleDeleteAnalytics}/>
                            <CancelButton onClick={() => setIsDeleteModalOpen(false)} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Analytics;
