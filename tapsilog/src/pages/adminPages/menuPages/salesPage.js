import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SalesPage() {
    const [orders, setOrders] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [totalPurchase, setTotalPurchase] = useState(0);
    const [totalSales, setTotalSales] = useState(0);

    useEffect(() => {
        fetchSalesData();
    }, []);

    const fetchSalesData = async () => {
        try {
            const res = await axios.get("http://localhost:5000/order/completed");
            const data = res.data;
            setOrders(data);
            computeSalesSummary(data);
        } catch (err) {
            console.error("Error fetching sales data:", err);
        }
    };

    const computeSalesSummary = (orders) => {
        let purchase = 0;
        let sales = 0;
        const productMap = {};

        orders.forEach(order => {
            sales += order.Total;

            order.Content.forEach(item => {
                const key = `${item.Food_Name}-${item.Food_Category}`;
                if (!productMap[key]) {
                    productMap[key] = {
                        Food_Name: item.Food_Name,
                        Food_Category: item.Food_Category,
                        totalSold: 0,
                    };
                }
                productMap[key].totalSold += item.quantity;
                purchase += item.quantity; // Assuming quantity represents purchase count
            });
        });

        const productArray = Object.values(productMap);
        productArray.sort((a, b) => b.totalSold - a.totalSold);

        setTopProducts(productArray);
        setTotalPurchase(purchase);
        setTotalSales(sales);
    };

    return (
        <div className="sales-page-container">
            <h1>Sales Overview</h1>

            <div className="sales-summary">
                <div className="summary-item">
                    <h3>Total Purchase</h3>
                    <p>{totalPurchase}</p>
                </div>
                <div className="summary-item">
                    <h3>Total Sales</h3>
                    <p>₱{totalSales.toFixed(2)}</p>
                </div>
            </div>

            <div className="top-products-section">
                <h2>Top Products</h2>
                <div className="top-products-header">
                    <span>Rank</span>
                    <span>Food Name</span>
                    <span>Category</span>
                    <span>Total Sold</span>
                </div>
                {topProducts.map((item, index) => (
                    <div key={index} className="top-product-row">
                        <span>{index + 1}</span>
                        <span>{item.Food_Name}</span>
                        <span>{item.Food_Category}</span>
                        <span>{item.totalSold}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
