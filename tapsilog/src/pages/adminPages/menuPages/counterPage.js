import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CounterPage() {
    const [menus, setMenu] = useState([]);
    const [order, setOrder] = useState([]);
    const [customer, setCustomer] = useState(-1);
    const [customerNumberDialog, setCustomerNumberDialog] = useState(false);

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
        <div>
            <h1>Counter Page</h1>
            {menus.map((menu) => (
                <div key={menu._id}>
                    <h2>{menu.Food_Name}</h2>
                    <p>Price: ${menu.Food_Price.toFixed(2)}</p>
                    <button onClick={() => addOrder(menu._id)}>Add to Order</button>
                </div>
            ))}
            {order.length > 0 && (
                <div>
                    <h2>Order Summary</h2>
                    {order.map((item) => (
                        <div key={item.FoodID}>
                            <p>{item.Food_Name}: {item.quantity} x ${item.Food_Price.toFixed(2)}</p>
                            <button onClick={() => removeOrder(item._id)}> - </button>
                        </div>
                    ))}
                    <h3>Total: ${calculateTotal()}</h3>
                    <button onClick={() => submitOrder()}>Submit Order</button>
                </div>
            )}
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
                        submitOrder(); // Call submitOrder after closing the dialog
                    }}>
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}