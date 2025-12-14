import React from 'react';

function ProductCard({ product, onAddToCart }) {
    const { name, description, price, originalPrice, discount, image } = product;

    return (
        <div className="product-card">
            <img src={image} alt={name} className="product-image" />
            <div className="product-info">
                <h3 className="product-title">{name}</h3>
                <p className="product-description">{description}</p>
                
                <div className="price-container">
                    <span className="current-price">${price.toFixed(2)}</span>
                    {originalPrice && (
                        <>
                            <span className="original-price">${originalPrice.toFixed(2)}</span>
                            {discount && (
                                <span className="discount">-{discount}%</span>
                            )}
                        </>
                    )}
                </div>
                
                <button 
                    className="btn btn-primary"
                    onClick={() => onAddToCart(product)}
                    style={{ width: '100%' }}
                >
                    <i className="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductCard;