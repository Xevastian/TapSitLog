import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../styles/pendingOrderPage.css';

export default function PendingOrderPage() {
    const [orders, setOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState("All");

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

    const filteredOrders = statusFilter === "All"
    ? orders
    : orders.filter(order => order.Status.toLowerCase() === statusFilter.toLowerCase());

    return (
        <main className="route-container">
                {/* HEADER */}
                <div className="route-header">
                    <span className="route-date">May 14, 2025</span>
                    <h1>Order History</h1>
                </div>

                {/* CONTENT SECTIONS */}
                <div className="order-page route-content">
                <div className="status-filter-row">
                    <span>Status:</span>
                    <button
                        className={`status-filter-button ${statusFilter === "All" ? "active" : ""}`}
                        onClick={() => setStatusFilter("All")}
                    >
                        All
                    </button>
                    <button
                        className={`status-filter-button ${statusFilter === "paid" ? "active" : ""}`}
                        onClick={() => setStatusFilter("paid")}
                    >
                        Pending
                    </button>
                    <button
                        className={`status-filter-button ${statusFilter === "served" ? "active" : ""}`}
                        onClick={() => setStatusFilter("served")}
                    >
                        Served
                    </button>
                </div>

                {orders.length === 0 ? (
                    <p>No orders.</p>
                ) : (
                    
                    
                <ul style={{ listStyle: 'none', padding: 0 , margin: 0}}>
                    {filteredOrders.map((order) => (
                        <li key={order._id} className="order-card">
                        <div className="order-top-row">
                            <div className="order-id">Order ID: {order._id}</div>
                            <div className="status-select">
                                <label>
                                    Status:
                                    <select
                                        value={order.Status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    >
                                        <option value="paid">Pending</option>
                                        <option value="served">Served</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                        <ul style={{ padding: 0, margin: '12px 0' }}>
                            {order.Content.map((item, index) => (
                                <li key={index} className="item-row">
                                    <div className="item-quantity">{item.quantity}</div>
                                    <div className="item-details">
                                        <span className="item-name">{item.Food_Name}</span>
                                        <span className="item-price">₱{item.Food_Price}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <p className="total">Total:   ₱{order.Total}</p>
                    </li>                    
                    ))}
                </ul>
            )}
        </div>

        </main>
    );
}
