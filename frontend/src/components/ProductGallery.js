import React, { useState, useEffect } from 'react';
import axiosInstance from './Service/axiosInstance';

function ProductGallery() {
    const [products, setProducts] = useState([]);

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('/product');
                console.log('res:',response);
                
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="p-5 bg-gray-100 min-h-screen">
            <h3 className="text-2xl font-semibold mb-5">Product Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img 
                            src="https://via.placeholder.com/300" 
                            alt={product.name} 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                            <p className="text-gray-600 mb-2">{product.description}</p>
                            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{product.category}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductGallery;