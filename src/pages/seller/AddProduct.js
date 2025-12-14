import React, { useState } from 'react';

function AddProduct({ onAddProduct }) {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        image: ''
    });

    const [imagePreview, setImagePreview] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        // This will be replaced with Cloudinary upload
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setProduct(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            ...product,
            price: parseFloat(product.price),
            originalPrice: product.originalPrice ? parseFloat(product.originalPrice) : null
        };
        onAddProduct(newProduct);
        
        // Reset form
        setProduct({
            name: '',
            description: '',
            price: '',
            originalPrice: '',
            image: ''
        });
        setImagePreview('');
        alert('Product added successfully!');
    };

    return (
        <div className="form-container">
            <h2 className="mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        className="form-input"
                        rows="4"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Price ($)</label>
                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Original Price ($) - Optional</label>
                    <input
                        type="number"
                        step="0.01"
                        name="originalPrice"
                        value={product.originalPrice}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Product Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="form-input"
                    />
                    {imagePreview && (
                        <div className="mt-4">
                            <img 
                                src={imagePreview} 
                                alt="Preview" 
                                style={{ 
                                    width: '200px', 
                                    height: '200px', 
                                    objectFit: 'cover',
                                    borderRadius: '0.5rem'
                                }} 
                            />
                        </div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    <i className="fas fa-plus"></i> Add Product
                </button>
            </form>
        </div>
    );
}

export default AddProduct;