import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import '../../../frontend/counterPage.css'

export default function CounterPage() {
    const [menus, setMenu] = useState([]);
    const [order, setOrder] = useState([]);
    const [customer, setCustomer] = useState(-1);
    const [customerNumberDialog, setCustomerNumberDialog] = useState(false);

    const navigate = useNavigate();

    const nav = () => navigate(`/menu/counter/read-qr`);

    const addOrder = (foodID) => {
        const food = menus.find(item => item._id === foodID);
        const existingOrderIndex = order.findIndex(item => item._id === foodID); 
        if (existingOrderIndex !== -1) {
            const updatedOrder = [...order];
            updatedOrder[existingOrderIndex].quantity += 1;
            setOrder(updatedOrder);
        } else {
            setOrder([...order, { _id: food._id, Food_Name: food.Food_Name, Food_Price: food.Food_Price, quantity: 1 }]);
        }
    };

    const removeOrder = (foodID) => {
        const food = order.find(item => item._id === foodID);
        if (food && food.quantity > 1) {
            const updatedOrder = order.map(item =>
                item._id === foodID ? { ...item, quantity: item.quantity - 1 } : item
            );
            setOrder(updatedOrder);
        } else {
            setOrder(order.filter(item => item._id !== foodID));
        }
    };

    const submitOrder = async () => {
        if (customer === -1 || customer === "") {
            setCustomerNumberDialog(true);
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/order/addOrder", {
                Content: order,
                Total: calculateTotal(),
                Status: 'paid',
                CustomerNumber: customer,
            });
            if (response.status === 201) {
                alert("Order submitted successfully.");
                setOrder([]);
                setCustomer(-1);
                setCustomerNumberDialog(false);
            }
        } catch (e) {
            console.error("Error submitting order:", e);
            alert("Failed to submit order. Please try again.");
        }
    };

    const calculateTotal = () => {
        return order.reduce((total, item) => total + item.Food_Price * item.quantity, 0).toFixed(2);
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try {
            const response = await axios.get("http://localhost:5000/menu/getMenu");
            setMenu(response.data);
        } catch (e) {
            console.error("Error fetching menu:", e);
            alert("Failed to fetch menu.");
        }
    };

    return (
        <div className="counter-container">
            <header className="counter-header">
                <h1>Counter Page</h1>
                <button className="read-qr-btn" onClick={nav}>
                    <Icon icon="mdi:qrcode-scan" />
                    Read QR
                </button>
            </header>

            <div className="menu-grid">
                {menus.map(menu => (
                    <div key={menu._id} className="menu-item">
                        <div className="menu-item-header">
                            <Icon icon="mdi:food" className="menu-item-icon" />
                            <span className="menu-item-badge">{menu.Food_Category}</span>
                        </div>
                        <img
                            src={menu.image || "https://via.placeholder.com/150"}
                            alt={menu.Food_Name}
                            className="menu-item-image"
                        />
                        <div className="menu-desc">
                            <h4 className="menu-item-title">{menu.Food_Name}</h4>
                            <p className="menu-item-price">₱ {menu.Food_Price.toFixed(2)}</p>
                            <button className="menu-item-add" onClick={() => addOrder(menu._id)}>+</button>
                        </div>
                    </div>
                ))}
            </div>

            {order.length > 0 && (
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    {order.map(item => (
                        <div key={item._id} className="order-item">
                            <span>{item.Food_Name}</span>
                            <span>{item.quantity} x ₱{item.Food_Price.toFixed(2)}</span>
                            <div className="order-controls">
                                <button onClick={() => removeOrder(item._id)}>-</button>
                                <button onClick={() => addOrder(item._id)}>+</button>
                            </div>
                        </div>
                    ))}
                    <h3>Total: ₱{calculateTotal()}</h3>
                    <button className="submit-order-btn" onClick={submitOrder}>Submit Order</button>
                </div>
            )}

            {customerNumberDialog && (
                <div className="customer-number-dialog">
                    <div className="dialog-content">
                        <h2>Enter Customer Number</h2>
                        <input
                            type="number"
                            placeholder="Customer Number"
                            onChange={(e) => setCustomer(e.target.value)}
                        />
                        <button onClick={() => submitOrder()}>
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
