import { useNavigate, Outlet, useLocation } from "react-router-dom";
import TopNavBar from './topNavBar.js';
import '../../styles/menuPage.css';
import '../../styles/index.css';
import { useState, useEffect } from "react";
import { ipv4 } from "../../ipv4.js";

export default function MenuPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState('');
    const [pendingOrders, setPendingOrders] = useState([]); // Pending orders
    const [completedOrders, setCompletedOrders] = useState([]); // Completed orders

    const isActive = (path) => location.pathname === `/menu/${path}`;

    const nav = (path) => {
        navigate(`/menu/${path}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/');
    };

    const fetchUsername = async () => { 
        try {
            const token = localStorage.getItem('token');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1])).userId;
            fetch(`http://${ipv4}:5000/getUsername/${payload}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    setUsername(data.username);
                })
                .catch((error) => {
                    console.error('Error fetching username:', error);
                });
            }
        else {
            navigate('/');
        }
        }
        catch (error) { 
            console.error('Error fetching username:', error);   
        }
    }  
    useEffect(() => {  
        fetchUsername();
    }, []); 

    const fetchPendingOrders = async () => {   
        try{
            const pending = await fetch(`http://${ipv4}:5000/order/pending`, );
            if (!pending.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await pending.json();
            setPendingOrders(data);
            console.log("Pending Orders: ",data);
        }
        catch (error) {
            console.error('Error fetching orders:', error);
        }
    }
    useEffect(() => {
        fetchPendingOrders();
    }, []);

    const fetchCompletedOrders = async () => {
        try{
            const completed = await fetch(`http://${ipv4}:5000/order/completed`, );
            if (!completed.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await completed.json();
            setCompletedOrders(data);
            console.log("Completed Orders: ",data);
        }
        catch (error) {
            console.error('Error fetching orders:', error);
        }
    }
    useEffect(() => {
        fetchCompletedOrders();
    }, []);

    // ito yung total sales per category
    const TotalSales = () => {
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
                        Total_Sale: totalSale
                    });
                }
            });
        });
    
        return Array.from(categoryMap.values());
    }
    // ito yung total sales/ like yung kabuuan ng benta
    const totalOfTotalSales = TotalSales().reduce((acc, item) => acc + item.Total_Sale, 0);

    //ito yung sa top 3 items
    const TopSellingItems = () => {
        const salesMap = {};

        completedOrders.forEach(order => {
            order.Content.forEach(item => {
                const name = item.Food_Name;
                const qty = item.quantity;

                if (salesMap[name]) {
                    salesMap[name] += qty;
                } else {
                    salesMap[name] = qty;
                }
            });
        });
        pendingOrders.forEach(order => {
            order.Content.forEach(item => {
                const name = item.Food_Name;
                const qty = item.quantity;

                if (salesMap[name]) {
                    salesMap[name] += qty;
                } else {
                    salesMap[name] = qty;
                }
            });
        });

        const topItems = Object.entries(salesMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([Food_Name, quantity]) => ({ Food_Name, quantity }));

        return topItems;
    }
    console.log("Top Selling Items: ",TopSellingItems());
    return (

        <>
            <TopNavBar />
            <div className="layout">
                <aside className="sidebar">
                    <div className="profile">
                            <i className="fas fa-user-circle"></i> 
                            <p>{username}</p> {/* Palagay Backend Thanks || Reply: Oks na*/}
                    </div>
                    <button
                        onClick={() => nav('dashboard')}
                        className={isActive('dashboard') ? 'active' : ''}
                    >
                        <i className="fas fa-tachometer-alt"></i> Dashboard
                    </button>

                    <button
                        onClick={() => nav('counter')}
                        className={isActive('counter') ? 'active' : ''}
                    >
                        <i className="fas fa-solid fa-tv"></i> Counter
                    </button>

                    <button
                        onClick={() => nav('generate-qr')}
                        className={isActive('generate-qr') ? 'active' : ''}
                    >
                        <i className="fas fa-qrcode"></i> Generate QR
                    </button>

                    <button
                        onClick={() => nav('pending-orders')}
                        className={isActive('pending-orders') ? 'active' : ''}
                    >
                        <i className="fas fa-box"></i> Orders
                    </button>

                    <button
                        onClick={() => nav('menu_page')}
                        className={isActive('menu_page') ? 'active' : ''}
                    >
                        <i className="fas fa-solid fa-mug-saucer"></i> Menu
                    </button>
                    
                    <button onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </aside>

                <main className="main-content">
                    <Outlet /> {/*route content*/}
                </main>
            </div>
        </>
    );
}
