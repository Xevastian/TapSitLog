import { useState, useEffect } from "react"
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

export default function OrderPage() {  
    //"tanauan 192.168.68.117 :: dorm 192.168.18.11"
    const ipv4 = "192.168.68.117" // enter ipv4 of lan network connection
    const {id} = useParams();
    const navigate = useNavigate();
    const [menus, setMenu] = useState([]);
    const [order, setOrder] = useState([]);
    console.log(id);

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

    const calculateTotal = () => {
        return order.reduce((total, item) => total + item.Food_Price * item.quantity, 0).toFixed(2);
    };

    const submitOrder = async () => {
        try {
            const response = await axios.post(`http://${ipv4}:5000/order/addOrder`, { 
                Content: order, 
                Total: calculateTotal(), 
                Status: 'unpaid',
                TableID: id,
            });
            if (response.status === 201) {
                setOrder([]); 
                const data = response.data
                navigate(`/${id}/order/${data._id}/payment`);
            }
        } catch (e) {
            console.error("Error submitting order:", e);
            alert("Failed to submit order. Please try again.");
        }
    };

    const fetchMenu = async () => {
            try {
                const response = await axios.get(`http://${ipv4}:5000/menu/getMenu`);
                setMenu(response.data);
            } catch (e) {
                console.error("Error fetching menu:", e);
                alert("Failed to fetch menu.");
            }
        };

    useEffect(() => {
        fetchMenu();
    }, []);

    return (
        <>
            <h1>Order Page</h1>
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
        </>
    )
}