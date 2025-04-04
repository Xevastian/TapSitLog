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

    const updateStatus = async (orderID) => {
        try {
            const response = await axios.put(`http://localhost:5000/order/updateOrder/${orderID}`, {
                Status: "served",
            });
            if (response.status === 200) {
                fetchOrders();
            }
        } catch (e) {
            console.error("Error updating order status:", e);
            alert("Failed to update order status.");
        }
    }
    console.log("Pending orders: ",pendingOrders);
    return (
        <div>
            <h1>Pending Order Page</h1>
            {pendingOrders.length === 0 ? (
                <p>No pending orders.</p>
            ) : (
                <ul>
                    {pendingOrders.map((order) => (
                        <li key={order._id}>
                            <h3>Order ID: {order._id}<br/> {order.CustomerNumber ? `Customer Number: ${order.CustomerNumber}` : ""}
                            {order.TableID ? `Table Number: ${order.TableID}` : ""}</h3>
                            
                            <ul>
                                {order.Content.map((item, index) => (
                                    <li key={index}>
                                        {item.Food_Name} - Quantity: {item.quantity}
                                        {console.log(item)}
                                    </li>
                                ))}
                            </ul>
                            <p>Total: {order.Total}</p>
                            <button onClick={() => updateStatus(order._id)}> Served </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}