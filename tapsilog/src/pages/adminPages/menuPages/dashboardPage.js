import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../../../styles/dashboardPage.css';

export default function DashboardPage() {
    const [completedCount, setCompletedCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [recentCompletedOrders, setRecentCompletedOrders] = useState([]);
    const [recentPendingOrders, setRecentPendingOrders] = useState([]);

    const [totalSales, setTotalSales] = useState(0);
    const [topItems, setTopItems] = useState([]);
    const [categorySales, setCategorySales] = useState([]);

    const calculateCategorySales = (completedOrders) => {
        const categoryMap = new Map();
    
        completedOrders.forEach(order => {
            order.Content.forEach(item => {
                const { Category, Food_Price, quantity } = item;
                const totalSale = Food_Price * quantity;
    
                if (categoryMap.has(Category)) {
                    const existing = categoryMap.get(Category);
                    existing.Item_Sold += quantity;
                    existing.Total_Sale += totalSale;
                } else {
                    categoryMap.set(Category, {
                        Category,
                        Item_Sold: quantity,
                        Total_Sale: totalSale,
                    });
                }
            });
        });
    
        return Array.from(categoryMap.values());
    };
    
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
        setRecentCompletedOrders(completed.slice(-3).reverse()); // Most recent 3
        setRecentPendingOrders(pending.slice(-3).reverse());
        setTotalSales(totalSalesAmount.toFixed(2));
        setTopItems(resTop.data);
        setCategorySales(calculateCategorySales(completed));

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
                    <span className="route-date">May 14, 2025</span>
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
                            <th>Sales</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorySales.length === 0 ? (
                            <tr><td colSpan="3">No data available.</td></tr>
                        ) : (
                            categorySales.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.Category}</td>
                                    <td>{item.Item_Sold}</td>
                                    <td> ₱ {item.Total_Sale.toFixed(2)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>                    
                <div className="card-header-row">
                    <h2>Total Sales</h2>
                    <p className="card-count">₱ {totalSales}</p>
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
                        <tbody>
                        {recentCompletedOrders.length === 0 ? (
                            <tr><td colSpan="3">No recent orders.</td></tr>
                        ) : (
                            recentCompletedOrders.map((order, index) => (
                                <tr key={index}>
                                    <td>...{order._id.slice(-10)}</td>
                                    <td>{order.TableID.Table_Number}</td>
                                    <td>₱ {order.Total.toFixed(2)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>

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
                        <tbody>
                        {recentPendingOrders.length === 0 ? (
                            <tr><td colSpan="3">No recent orders.</td></tr>
                        ) : (
                            recentPendingOrders.map((order, index) => (
                                <tr key={index}>
                                    <td>...{order._id.slice(-10)}</td>
                                    <td>{order.TableID.Table_Number}</td>
                                    <td>₱ {order.Total.toFixed(2)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
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
