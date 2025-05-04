import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import axios from "axios";
import '../../styles/cartPage.css';
import test from './test.png'
import { ipv4 } from "../../ipv4.js";

export default function CartPage() {
    const { id, orderID } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState([]);

    const fetchOrder = async () => {
        try{
            const response = await axios.get(`http://${ipv4}:5000/order/getOrder/${orderID}`);
            setOrder(response.data.Content);
        }catch(e){
            console.error("Error fetching menu:", e);
            alert("Failed to fetch menu.");
        }
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    const updateQuantity = async (foodID, delta) => {
        const updatedOrder = order
            .map(item =>
                item._id === foodID
                    ? { ...item, quantity: item.quantity + delta }
                    : item
            )
            .filter(item => item.quantity > 0); // Remove items with quantity <= 0
    
        const updatedTotal = updatedOrder.reduce(
            (total, item) => total + item.Food_Price * item.quantity,
            0
        );
    
        try {
            await axios.put(`http://${ipv4}:5000/order/updateOrder/${orderID}`, {
                Content: updatedOrder,
                Total: updatedTotal.toFixed(2),
                Status: "Pending"
            });
    
            setOrder(updatedOrder);
        } catch (error) {
            console.error("Failed to update order", error);
            alert("Could not update the quantity. Try again.");
        }
    };

    const calculateTotal = () => {
        return order.reduce((total, item) => total + item.Food_Price * item.quantity, 0).toFixed(2);
    };

    return (
        <>
            <nav className="cart-navbar">
                <Icon icon="mdi:cart-outline" className="cart-icon"/>
                <h1>Orders</h1>
            </nav>

            <div className="service-time">
                <Icon icon="game-icons:camp-cooking-pot" className="service-icon"/>
                <div className="service-desc">
                    <h5>Estimated serving</h5>
                    <h2>Standard (15-20 mins)</h2>
                </div>
            </div>

            <div className="cart-items">
                {order.map((item) => (
                    <div className="cart-item" key={item._id}>
                        <img src={item.Food_Image || test} alt={item.Food_Name} className="cart-item-image" />
                        <div className="cart-item-details">
                            <div className="quantity-control">
                            <button
                                onClick={() => updateQuantity(item._id, -1)}
                            >−</button>

                            <span>{item.quantity}</span>

                            <button onClick={() => updateQuantity(item._id, 1)}>+</button>
                            </div>

                            <div className="cart-item-name">{item.Food_Name}</div>
                            <div className="cart-item-price">₱ {(item.Food_Price * item.quantity).toFixed(2)}</div>
                        </div>
                    </div>
                ))}
            </div>

            <hr className="divider" />
            <div className="cart-total">
            <h2>Total</h2>
            <h2>₱ {calculateTotal()}</h2>
            </div>
            
            <div className="cart-actions">
                <button className="btn-back" onClick={() => navigate(-1)}>Redo Order</button>
                <button className="btn-review" onClick={() => navigate(`/${id}/order/${orderID}/payment`)}>Review Payment</button>
            </div>
        </>
    )
}