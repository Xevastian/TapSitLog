import { useState, useEffect } from 'react';
import axios from 'axios';


export default function DashboardPage() {
    const [completedOrders, setCompletedOrders] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [categorySummary, setCategorySummary] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const [resCompleted, resPending] = await Promise.all([
                axios.get("http://localhost:5000/order/completed"),
                axios.get("http://localhost:5000/order/pending"),
            ]);

            setCompletedOrders(resCompleted.data);
            setPendingOrders(resPending.data);
            computeCategorySummary(resCompleted.data);
        } catch (err) {
            console.error("Error fetching orders:", err);
        }
    };

    const computeCategorySummary = (orders) => {
        const summary = {};

        orders.forEach(order => {
            order.Content.forEach(item => {
                const category = item.Food_Category || 'Uncategorized';
                if (!summary[category]) {
                    summary[category] = { itemsSold: 0, sales: 0 };
                }
                summary[category].itemsSold += item.quantity;
                summary[category].sales += item.Food_Price * item.quantity;
            });
        });

        const summaryArray = Object.entries(summary).map(([category, data]) => ({
            category,
            itemsSold: data.itemsSold,
            sales: data.sales,
        }));

        setCategorySummary(summaryArray);
    };

    const totalSales = completedOrders.reduce((sum, order) => sum + order.Total, 0).toFixed(2);

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>

            <div className="dashboard-grid">
                {/* Completed Orders */}
                <div className="completed-section">
                    <h2>Completed Orders</h2>
                    <p>Total Sales: ₱{totalSales}</p>

                    {completedOrders.map(order => (
                        <div key={order._id} className="order-card">
                            <p><strong>Order ID:</strong> {order._id}</p>
                            <p><strong>Table No.:</strong> {order.CustomerNumber}</p>
                            <ul>
                                {order.Content.map((item, idx) => (
                                    <li key={idx}>{item.Food_Name} x {item.quantity}</li>
                                ))}
                            </ul>
                            <p><strong>Sales:</strong> ₱{order.Total.toFixed(2)}</p>
                        </div>
                    ))}

                    <h3>Category Summary</h3>
                    {categorySummary.map((cat, idx) => (
                        <div key={idx} className="category-summary-card">
                            <p><strong>Category:</strong> {cat.category}</p>
                            <p>Items Sold: {cat.itemsSold}</p>
                            <p>Sales: ₱{cat.sales.toFixed(2)}</p>
                        </div>
                    ))}
                </div>

                {/* Pending Orders */}
                <div className="pending-section">
                    <h2>Pending Orders</h2>
                    {pendingOrders.map(order => (
                        <div key={order._id} className="order-card">
                            <p><strong>Order ID:</strong> {order._id}</p>
                            <p><strong>Table No.:</strong> {order.CustomerNumber}</p>
                            <ul>
                                {order.Content.map((item, idx) => (
                                    <li key={idx}>{item.Food_Name} x {item.quantity}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
