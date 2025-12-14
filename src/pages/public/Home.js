import React from 'react';
import ProductCard from '../../components/ProductCard';

function Home({ products, addToCart }) {
    return (
        <div className="container">
            <div className="hero-section text-center p-8 mb-8" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '1rem',
                color: 'white',
                marginTop: '2rem'
            }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Welcome to ShopEasy</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Discover amazing products at unbeatable prices</p>
            </div>

            <div className="products-grid">
                {products.map(product => (
                    <ProductCard 
                        key={product.id}
                        product={product}
                        onAddToCart={addToCart}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;