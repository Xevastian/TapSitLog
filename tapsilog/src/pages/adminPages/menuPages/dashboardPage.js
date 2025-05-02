import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function DashboardPage() {
    const [completedCount, setCompletedCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [totalSales, setTotalSales] = useState(0);

    const fetchSummary = useCallback(async () => {
        try {
            const [resCompleted, resPending] = await Promise.all([
                axios.get("http://localhost:5000/order/completed"),
                axios.get("http://localhost:5000/order/pending"),
            ]);

            const completed = resCompleted.data.filter(order =>
                order.Status === "paid" || order.Status === "serve"
            );

            const totalSalesAmount = completed.reduce((sum, order) => sum + order.Total, 0);

            setCompletedCount(completed.length);
            setPendingCount(resPending.data.length);
            setTotalSales(totalSalesAmount.toFixed(2));
        } catch (err) {
            console.error("Error fetching summary:", err);
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
            </div>
        </div>
    );
}
