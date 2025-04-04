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
            setPendingOrders(response.data.filter(order => order.Status === "paid"));
        } catch (e) {
            console.error("Error fetching orders:", e);
            alert("Failed to fetch orders.");
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