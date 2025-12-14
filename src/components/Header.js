import React from 'react';

function Header({ setCurrentPage, cartCount, isSeller, setIsSeller }) {
    return (
        <header className="header">
            <div className="nav-container">
                <a href="#" className="logo" onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('home');
                }}>
                    <i className="fas fa-store"></i> ShopEasy
                </a>
                
                <div className="nav-links">
                    <a href="#" className="nav-link" onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage('home');
                    }}>
                        <i className="fas fa-home"></i> Home
                    </a>
                    
                    <a href="#" className="nav-link" onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage('cart');
                    }}>
                        <i className="fas fa-shopping-cart"></i> Cart ({cartCount})
                    </a>

                    {/* Clerk Auth will be integrated here */}
                    <div className="auth-section">
                        <button className="btn btn-primary">
                            <i className="fas fa-user"></i> Sign In
                        </button>
                    </div>

                    <button 
                        className="btn btn-secondary"
                        onClick={() => {
                            setIsSeller(!isSeller);
                            setCurrentPage(isSeller ? 'home' : 'seller');
                        }}
                    >
                        {isSeller ? 'Switch to Buyer' : 'Seller Dashboard'}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;