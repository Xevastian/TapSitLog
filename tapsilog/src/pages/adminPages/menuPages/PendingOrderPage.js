import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PendingOrderPage() {
    const [pendingOrders, setPendingOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get("http://localhost:5000/order/getOrder");
            setPendingOrders(response.data.filter(order => order.Status === "unpaid" || order.Status === "pending"));
        } catch (e) {
            console.error("Error fetching orders:", e);
            alert("Failed to fetch orders.");
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const orderToUpdate = pendingOrders.find(order => order._id === orderId);
            const updatedOrder = {
                ...orderToUpdate,
                Status: newStatus
            };

            await axios.put(`http://localhost:5000/order/updateOrder/${orderId}`, updatedOrder);

            setPendingOrders(prev =>
                prev.map(order =>
                    order._id === orderId ? { ...order, Status: newStatus } : order
                )
            );
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update order status.");
        }
    };

    return (
        <div>
            <h1>Pending Order Page</h1>
            {pendingOrders.length === 0 ? (
                <p>No pending orders.</p>
            ) : (
                <ul>
                    {pendingOrders.map((order) => (
                        <li key={order._id}>
                            <h3>Order ID: {order._id}</h3>
                            <label>
                                Status:
                                <select
                                    value={order.Status}
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                >
                                    <option value="unpaid">Unpaid</option>
                                    <option value="pending">Pending</option>
                                    <option value="paid">Paid</option>
                                    <option value="serve">Serve</option>
                                </select>
                            </label>
                            <ul>
                                {order.Content.map((item, index) => (
                                    <li key={index}>
                                        {item.Food_Name} - Quantity: {item.quantity}
                                    </li>
                                ))}
                            </ul>
                            <p>Total: {order.Total}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
