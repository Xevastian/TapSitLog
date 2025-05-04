import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function DashboardPage() {
    const [completedCount, setCompletedCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [topItems, setTopItems] = useState([]);

    const fetchSummary = useCallback(async () => {
        try {
            const [resAllOrders, resTopSelling] = await Promise.all([
                axios.get("http://localhost:5000/order/getOrder"),
                axios.get("http://localhost:5000/order/top-selling")
            ]);

            const orders = resAllOrders.data;

            const completedOrders = orders.filter(order => order.Status === "served");
            const pendingOrders = orders.filter(order => order.Status === "paid");

            const sales = completedOrders.reduce((sum, order) => sum + order.Total, 0);

            setCompletedCount(completedOrders.length);
            setPendingCount(pendingOrders.length);
            setTotalSales(sales.toFixed(2));
            setTopItems(resTopSelling.data);
        } catch (err) {
            console.error("Error fetching dashboard summary:", err);
            alert("Failed to load dashboard summary.");
        }
    }, []);

    useEffect(() => {
        fetchSummary();
    }, [fetchSummary]);

    return (
        <div className="dashboard-container">
            <h1>Dashboard Summary</h1>
            <div className="summary-cards" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div className="card" style={cardStyle}>
                    <h2>Completed Orders</h2>
                    <p>{completedCount}</p>
                </div>
                <div className="card" style={cardStyle}>
                    <h2>Pending Orders</h2>
                    <p>{pendingCount}</p>
                </div>
                <div className="card" style={cardStyle}>
                    <h2>Total Sales</h2>
                    <p>₱{totalSales}</p>
                </div>
                <div className="card" style={cardStyle}>
                    <h2>Top 3 Best-Selling Items</h2>
                    {topItems.length === 0 ? (
                        <p>No data available.</p>
                    ) : (
                        <ol>
                            {topItems.map((item, index) => (
                                <li key={index}>
                                    {item.Food_Name} — {item.quantity} sold
                                </li>
                            ))}
                        </ol>
                    )}
                </div>
            </div>
        </div>
    );
}

const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    width: '250px',
    backgroundColor: '#f9f9f9',
};
