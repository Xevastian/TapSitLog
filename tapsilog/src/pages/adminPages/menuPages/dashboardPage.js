import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../../../styles/dashboardPage.css';

export default function DashboardPage() {
    const [completedCount, setCompletedCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [topItems, setTopItems] = useState([]);
    
    const fetchSummary = useCallback(async () => {
    try {
        const [resCompleted, resPending, resTop] = await Promise.all([
            axios.get("http://localhost:5000/order/completed"),  
            axios.get("http://localhost:5000/order/pending"),    
            axios.get("http://localhost:5000/order/top-selling"),
        ]);

        const completed = resCompleted.data; 
        const pending = resPending.data;  

        const totalSalesAmount = completed.reduce((sum, order) => sum + order.Total, 0);

        setCompletedCount(completed.length);
        setPendingCount(pending.length);
        setTotalSales(totalSalesAmount.toFixed(2));
        setTopItems(resTop.data);
    } catch (err) {
        console.error("Error fetching summary:", err);
        alert("Failed to load dashboard summary.");
    }
}, []);


    useEffect(() => {
        fetchSummary();
    }, [fetchSummary]);

    return (
        <div className="dashboard-container">
            <h1>Dashboard Summary</h1>
            <div className="summary-cards">
                <div className="card">
                    <h2>Completed Orders</h2>
                    <p>{completedCount}</p>
                </div>
                <div className="card">
                    <h2>Pending Orders</h2>
                    <p>{pendingCount}</p>
                </div>
                <div className="card">
                    <h2>Total Sales</h2>
                    <p>₱{totalSales}</p>
                </div>
                <div className="card">
                    <h2>Top 3 Best-Selling Items</h2>
                    {topItems.length === 0 ? (
                        <p>No data.</p>
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
