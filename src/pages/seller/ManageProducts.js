import React, { useState } from 'react';

function ManageProducts({ products, onUpdate, onDelete }) {
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    const handleEdit = (product) => {
        setEditingId(product.id);
        setEditForm({ ...product });
    };

    const handleSave = (id) => {
        onUpdate(id, editForm);
        setEditingId(null);
    };

    const handleCancel = () => {
        setEditingId(null);
    };

    return (
        <div className="form-container">
            <h2 className="mb-4">Manage Products ({products.length})</h2>
            
            {products.length === 0 ? (
                <p className="text-center">No products found. Add your first product!</p>
            ) : (
                <div className="products-list">
                    {products.map(product => (
                        <div key={product.id} className="product-card mb-4">
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <img 
                                    src={product.image} 
                                    alt={product.name}
                                    style={{ 
                                        width: '100px', 
                                        height: '100px', 
                                        objectFit: 'cover',
                                        borderRadius: '0.5rem'
                                    }} 
                                />
                                
                                <div style={{ flex: 1 }}>
                                    {editingId === product.id ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={editForm.name}
                                                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                                className="form-input mb-2"
                                            />
                                            <textarea
                                                value={editForm.description}
                                                onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                                                className="form-input mb-2"
                                                rows="2"
                                            />
                                            <input
                                                type="number"
                                                value={editForm.price}
                                                onChange={(e) => setEditForm({...editForm, price: parseFloat(e.target.value)})}
                                                className="form-input mb-2"
                                            />
                                            <div>
                                                <button onClick={() => handleSave(product.id)} className="btn btn-primary">
                                                    Save
                                                </button>
                                                <button onClick={handleCancel} className="btn" style={{ marginLeft: '0.5rem' }}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <h3>{product.name}</h3>
                                            <p>{product.description}</p>
                                            <p><strong>Price:</strong> ${product.price}</p>
                                            <div>
                                                <button 
                                                    onClick={() => handleEdit(product)}
                                                    className="btn btn-primary"
                                                    style={{ marginRight: '0.5rem' }}
                                                >
                                                    <i className="fas fa-edit"></i> Edit
                                                </button>
                                                <button 
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to delete this product?')) {
                                                            onDelete(product.id);
                                                        }
                                                    }}
                                                    className="btn"
                                                    style={{ background: 'var(--danger)', color: 'white' }}
                                                >
                                                    <i className="fas fa-trash"></i> Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ManageProducts;