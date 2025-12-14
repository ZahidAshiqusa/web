import React from 'react';

function ViewOrders({ orders }) {
    const getStatusClass = (status) => {
        switch(status.toLowerCase()) {
            case 'pending':
                return 'status-badge status-pending';
            case 'completed':
                return 'status-badge status-completed';
            default:
                return 'status-badge';
        }
    };

    return (
        <div className="form-container">
            <h2 className="mb-4">Recent Orders</h2>
            
            {orders.length === 0 ? (
                <p className="text-center">No orders yet.</p>
            ) : (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>#{order.id}</td>
                                <td>{order.customer}</td>
                                <td>{order.product}</td>
                                <td>${order.total.toFixed(2)}</td>
                                <td>
                                    <span className={getStatusClass(order.status)}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>{order.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div className="mt-8">
                <h3>Order Statistics</h3>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '1rem',
                    marginTop: '1rem'
                }}>
                    <div style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '0.5rem',
                        boxShadow: 'var(--shadow)'
                    }}>
                        <h4 style={{ color: 'var(--gray)' }}>Total Orders</h4>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{orders.length}</p>
                    </div>
                    <div style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '0.5rem',
                        boxShadow: 'var(--shadow)'
                    }}>
                        <h4 style={{ color: 'var(--gray)' }}>Revenue</h4>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                            ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewOrders;