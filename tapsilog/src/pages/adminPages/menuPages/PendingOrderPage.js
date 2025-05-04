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

    return (
        <div>
            <h1>Order Page</h1>
            {orders.length === 0 ? (
                <p>No orders.</p>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order._id}>
                            <h3>Order ID: {order._id}</h3>
                            <label>
                                Status:
                                <select
                                    value={order.Status}
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                >
                                    <option value="unpaid">Unpaid</option>
                                    <option value="paid">Paid</option>
                                    <option value="served">Served</option>
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
