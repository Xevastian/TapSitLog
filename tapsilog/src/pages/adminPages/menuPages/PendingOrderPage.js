import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PendingOrderPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get("http://localhost:5000/order/getOrder");
            const sortedOrders = response.data
                .sort((a, b) => {
                    const statusOrder = { unpaid: 1, paid: 2, served: 3 };
                    if (statusOrder[a.Status] !== statusOrder[b.Status]) {
                        return statusOrder[a.Status] - statusOrder[b.Status];
                    }
                    return new Date(a.OrderedAt) - new Date(b.OrderedAt);
                });
            setOrders(sortedOrders);
        } catch (e) {
            console.error("Error fetching orders:", e);
            alert("Failed to fetch orders.");
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const orderToUpdate = orders.find(order => order._id === orderId);
            const updatedOrder = {
                ...orderToUpdate,
                Status: newStatus
            };

            await axios.put(`http://localhost:5000/order/updateOrder/${orderId}`, updatedOrder);

            fetchOrders();
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update order status.");
        }
    };

    const styles = {
        pageContainer: {
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f4f4f4',
            paddingTop: '72px', 
            minHeight: '100vh'
        },
        pageHeader: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: '#0b2e59',
            color: 'white',
            padding: '16px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderBottom: '1px solid #ccc',
            zIndex: 1000
        },
        orderCard: {
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
            margin: '16px 0',
            padding: '16px'
        },
        orderId: {
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '8px',
            color: '#2e2e2e'
        },
        statusSelect: {
            marginTop: '12px'
        },
        select: {
            padding: '6px 12px',
            fontSize: '1rem',
            marginLeft: '8px'
        },
        backButton: {
            display: 'block',
            margin: '20px auto',
            backgroundColor: '#f2f2f2',
            border: 'none',
            padding: '12px 24px',
            fontSize: '1rem',
            borderRadius: '12px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer'
        },
        itemRow: {
            display: 'flex',
            alignItems: 'center',
            padding: '8px 0',
            borderBottom: '1px solid #eee',
            fontSize: '1rem',
            justifyContent: 'space-between'
        },
        itemQuantity: {
            marginRight: '12px',
            flex: '0 0 40px'
        },
        itemDetails: {
            display: 'flex',
            justifyContent: 'space-between',
            flex: 1
        },
        itemName: {
            flex: 1
        },
        itemPrice: {
            color: '#2e2e2e',
            flex: '0 0 50px',
            textAlign: 'right'
        },
        total: {
            fontWeight: 'bold'
        }
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.pageHeader}>
                <span>🛒</span> Order Page
            </div>
            {orders.length === 0 ? (
                <p>No orders.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {orders.map((order) => (
                        <li key={order._id} style={styles.orderCard}>
                            <div style={styles.orderId}>Order ID: {order._id}</div>
                            <div style={styles.statusSelect}>
                                <label>
                                    Status:
                                    <select
                                        style={styles.select}
                                        value={order.Status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    >
                                        <option value="unpaid">Unpaid</option>
                                        <option value="paid">Paid</option>
                                        <option value="served">Served</option>
                                    </select>
                                </label>
                            </div>
                            <ul style={{ padding: 0, margin: '12px 0' }}>
                                {order.Content.map((item, index) => (
                                    <li key={index} style={styles.itemRow}>
                                        <div style={styles.itemQuantity}>{item.quantity}</div>
                                        <div style={styles.itemDetails}>
                                            <span style={styles.itemName}>{item.Food_Name}</span>
                                            <span style={styles.itemPrice}>P{item.Food_Price}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <p style={styles.total}>Total: {order.Total}</p>
                        </li>
                    ))}
                </ul>
            )}
            <button style={styles.backButton} onClick={() => window.history.back()}>
                Back
            </button>
        </div>
    );
}
