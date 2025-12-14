import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/public/Home';
import Cart from './pages/public/Cart';
import ProductDetail from './pages/public/ProductDetail';
import SellerDashboard from './pages/seller/Dashboard';
import './styles/main.css';

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [cart, setCart] = useState([]);
    const [isSeller, setIsSeller] = useState(false);

    // Mock product data
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Premium Headphones",
            description: "Noise-cancelling wireless headphones",
            price: 199.99,
            originalPrice: 299.99,
            discount: 33,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
        },
        {
            id: 2,
            name: "Smart Watch",
            description: "Fitness tracker with heart rate monitor",
            price: 249.99,
            originalPrice: 349.99,
            discount: 29,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w-400"
        }
    ]);

    const addToCart = (product) => {
        setCart([...cart, { ...product, quantity: 1 }]);
    };

    const renderPage = () => {
        switch(currentPage) {
            case 'home':
                return <Home products={products} addToCart={addToCart} />;
            case 'cart':
                return <Cart cart={cart} setCart={setCart} />;
            case 'product':
                return <ProductDetail product={products[0]} addToCart={addToCart} />;
            case 'seller':
                return <SellerDashboard products={products} setProducts={setProducts} />;
            default:
                return <Home products={products} addToCart={addToCart} />;
        }
    };

    return (
        <div className="App">
            <Header 
                setCurrentPage={setCurrentPage} 
                cartCount={cart.length}
                isSeller={isSeller}
                setIsSeller={setIsSeller}
            />
            {renderPage()}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));