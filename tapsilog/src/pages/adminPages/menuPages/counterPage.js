import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../styles/counterPage.css';

export default function CounterPage() {
    const [menus, setMenu] = useState([]);
    const [order, setOrder] = useState([]);
    const [customer, setCustomer] = useState(-1);
    const [customerNumberDialog, setCustomerNumberDialog] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Rice Meal"); // Default category

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
            const updatedOrder = order.map(item => {
                if (item._id === foodID) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
            setOrder(updatedOrder);
        } else {
            const updatedOrder = order.filter(item => item._id !== foodID);
            setOrder(updatedOrder);
        }

    }

    const submitOrder = async () => {
        if (customer === -1 || customer === "") {
            // Open the customer number dialog if not already open
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
            <main className="route-container">

                {/* HEADER */}
                <div className="route-header">
                    <span className="route-date">May 14, 2025</span>
                    <h1>Counter Panel</h1>
                </div>

                {/* CONTENT SECTIONS */}
                <div className="counter route-content">

                    {/* TOP ROW: Category and Menu Items */}
                    <div className="top-row">
                        {/* Category Selection */}
                        <div className="category-column">
                            <h3>Categories</h3>
                            <div className="category-list">
                                {["Rice Meal", "Soup", "Snacks", "Beverage"].map((cat) => (
                                    <button 
                                        key={cat}
                                        className={selectedCategory === cat ? "active" : ""}
                                        onClick={() => setSelectedCategory(cat)}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="menu-column">
                            <h3>Menu Items</h3>
                            <div className="menu-items">
                            {menus
                                .filter(menu => menu.Food_Category === selectedCategory)
                                .map(menu => (
                                    <div className="menu-item" key={menu._id}>
                                        <span>{menu.Food_Name}</span>
                                        <span>₱{menu.Food_Price.toFixed(2)}</span>
                                        <button className="add-button" onClick={() => addOrder(menu._id)}>+ Add</button>
                                    </div>
                            ))}
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM ROW: Order & Checkout */}
                    <div className="bottom-row">
                        {order.length > 0 && (
                            <div className="checkout-box">
                                <h2>Order & Checkout</h2>
                                {order.map(item => (
                                    <div className="checkout-item" key={item._id}>
                                        <span>{item.Food_Name}</span>
                                        <span>₱{item.Food_Price.toFixed(2)}</span>
                                        <div className="quantity-box">
                                            <button className="decrease-btn" onClick={() => removeOrder(item._id)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button className="increase-btn" onClick={() => addOrder(item._id)}>+</button>
                                        </div>
                                        <i className="fa-solid fa-trash delete-btn" onClick={() => removeOrder(item._id)}></i>
                                    </div>
                                ))}
                                <div className="checkout-row">
                                    <h3>Total Price:    ₱{calculateTotal()}</h3>
                                    <button className="checkout-btn" onClick={submitOrder}>Checkout</button>
                                </div>
                            </div>
                        )}
                    </div>

                {/* CUSTOMER NUMBER DIALOG */}
                {customerNumberDialog && (
                    <div className="customer-number-dialog">
                        <h2>Enter Customer Number</h2>
                        <input 
                            type="number" 
                            placeholder="Customer Number" 
                            onChange={(e) => setCustomer(e.target.value)} 
                        />
                        <button onClick={() => {
                            setCustomerNumberDialog(false);
                            submitOrder();
                        }}>
                            Submit
                        </button>
                        <button className="back-btn" onClick={() => setCustomerNumberDialog(false)}>Back</button>
                    </div>
                )}
                </div>
            </main>
    );
}    