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
        <main className="route-container">
            <div className="route-header">
                    <span className="route-date">April 29, 2025</span>
                    <h1>Dashboard Summary</h1>
            </div>

            <div className="dashboard route-content">
            <div className="summary-cards">
                <div className="card">
                    <h2>Top 3 Best-Selling Items</h2>
                    {topItems.length === 0 ? (
                        <p>No data.</p>
                    ) : (
                        <table className="top-items-table">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Food Name</th>
                                    <th>Quantity Sold</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.Food_Name}</td>
                                        <td>{item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="card">
                    <h2>Total Sales</h2>
                    
                    <table className="category-sales-table">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Items Sold</th>
                                <th>Total Sales (₱)</th>
                            </tr>
                        </thead>
                    </table>
                    
                <div className="card-header-row">
                    <h2>Total Sales</h2>
                    <p className="card-count">1234</p>
                </div>
                </div>

                <div className="card">
                <div className="card-header-row">
                    <h2>Completed Orders</h2>
                    <p className="card-count">{completedCount}</p>
                </div>
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Table No.</th>
                                <th>Items(₱)</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="card">
                <div className="card-header-row">
                    <h2>Pending Orders</h2>
                    <p className="card-count">{pendingCount}</p>
                </div>
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Table No.</th>
                                <th>Items(₱)</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            </div>
        </main>
    );    
}

const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    width: '250px',
    backgroundColor: '#f9f9f9',
};
