import React, { useState } from 'react';
import AddProduct from './AddProduct';
import ManageProducts from './ManageProducts';
import ViewOrders from './ViewOrders';

function SellerDashboard({ products, setProducts }) {
    const [activeTab, setActiveTab] = useState('add');

    // Mock orders data
    const [orders, setOrders] = useState([
        { id: 1, customer: 'John Doe', product: 'Premium Headphones', total: 199.99, status: 'pending', date: '2024-01-15' },
        { id: 2, customer: 'Jane Smith', product: 'Smart Watch', total: 249.99, status: 'completed', date: '2024-01-14' }
    ]);

    const addProduct = (newProduct) => {
        const productWithId = {
            ...newProduct,
            id: products.length + 1,
            discount: newProduct.originalPrice ? 
                Math.round(((newProduct.originalPrice - newProduct.price) / newProduct.originalPrice) * 100) : 0
        };
        setProducts([...products, productWithId]);
    };

    const updateProduct = (id, updatedData) => {
        setProducts(products.map(p => p.id === id ? { ...p, ...updatedData } : p));
    };

    const deleteProduct = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Seller Dashboard</h1>
                <p>Manage your products and orders</p>
            </div>

            <div className="dashboard-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
                    onClick={() => setActiveTab('add')}
                >
                    <i className="fas fa-plus"></i> Add Product
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'manage' ? 'active' : ''}`}
                    onClick={() => setActiveTab('manage')}
                >
                    <i className="fas fa-edit"></i> Manage Products
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                >
                    <i className="fas fa-clipboard-list"></i> View Orders
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'add' && <AddProduct onAddProduct={addProduct} />}
                {activeTab === 'manage' && (
                    <ManageProducts 
                        products={products} 
                        onUpdate={updateProduct}
                        onDelete={deleteProduct}
                    />
                )}
                {activeTab === 'orders' && <ViewOrders orders={orders} />}
            </div>
        </div>
    );
}

export default SellerDashboard;