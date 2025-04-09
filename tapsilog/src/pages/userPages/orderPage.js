import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import axios from "axios";
import '../../frontend/orderPage.css';
import test from './test.png'
import { ipv4 } from "../../ipv4.js";

export default function OrderPage() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [menus, setMenu] = useState([]);
    const [order, setOrder] = useState([]);

    const categories = [
        {
            name: "RICE MEAL",
            icon: "bxs:bowl-rice",
        },
        {
            name: "DRINKS",
            icon: "ri:drinks-2-fill",
        },
        {
            name: "SNACKS",
            icon: "mdi:food-apple",
        },
    ];

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

    const calculateTotal = () => {
        return order.reduce((total, item) => total + item.Food_Price * item.quantity, 0).toFixed(2);
    };

    const checkCart = async () => {
        if(order.length == 0){
            return;
        }
        try {
            
            const response = await axios.post(`http://${ipv4}:5000/order/addOrder`, { 
                Content: order, 
                Total: calculateTotal(), 
                Status: 'unpaid',
                TableID: id,
            });
            if (response.status === 201) {
                const data = response.data
                navigate(`/${id}/order/${data._id}`);
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
            <div className="orderPage">
                
                <div className="menu-category">
                    <div className="order-header">
                        <h1 className="menu-header">Menu</h1>
                    </div>
                    <h3 className="category-header">Category</h3>
                    <div className="category-list">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className="category-button"
                                onClick={() => {
                                    const section = document.getElementById(category.name.replace(" ", "-").toLowerCase());
                                    if (section) {
                                        const yOffset = -275; 
                                        const yPosition = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                        window.scrollTo({ top: yPosition, behavior: "smooth" });
                                    }
                                }}
                            >
                                <Icon icon={category.icon} width="40" height="40" />
                                <span className="category-text">{category.name}</span>
                                <Icon
                                    icon="maki:arrow"
                                    width="15"
                                    height="15"
                                    style={{ backgroundColor: "#F9F7F7", color: "#112D4E", borderRadius: "50%", padding: "4px" }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="menu-container">
                    {/* Savers Section */}
                    <div id="savers" className="menu-section">
                        <h3 className="menu-section-header">Savers</h3>
                        <div className="menu-items">
                            {menus.map((menu, index) => {
                                const orderItem = order.find(item => item._id === menu._id); 
                                const quantity = orderItem ? orderItem.quantity : 0; 

                                return (
                                    <div key={index} className="menu-item">
                                        <div className="menu-item-header">
                                            <Icon icon="mdi:tag-heart" className="menu-item-icon" />
                                            <span className="menu-item-badge">Savers</span>
                                        </div>
                                        <img src={menu.image || test} alt={menu.Food_Name} className="menu-item-image" />
                                        <div className="menu-desc">
                                            <h4 className="menu-item-title">{menu.Food_Name}</h4>
                                            <div className="menu-item-content">
                                                <p className="menu-item-price">₱ {menu.Food_Price.toFixed(2)}</p>
                                                <div className="menu-item-footer">
                                                    {quantity > 0 && (
                                                        <button
                                                            className="menu-item-minus"
                                                            onClick={() => {
                                                                const existingOrderIndex = order.findIndex(item => item._id === menu._id);
                                                                if (existingOrderIndex !== -1) {
                                                                    const updatedOrder = [...order];
                                                                    if (updatedOrder[existingOrderIndex].quantity > 1) {
                                                                        updatedOrder[existingOrderIndex].quantity -= 1;
                                                                    } else {
                                                                        updatedOrder.splice(existingOrderIndex, 1);
                                                                    }
                                                                    setOrder(updatedOrder);
                                                                }
                                                            }}
                                                        >
                                                            -
                                                        </button>
                                                    )}
                                                    {quantity > 0 && <span className="menu-item-quantity">{quantity}</span>}
                                                    <button
                                                        className="menu-item-add"
                                                        onClick={() => addOrder(menu._id)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {/* Rice Meal Section */}
                    <div id="rice-meal" className="menu-section">
                        <h3 className="menu-section-header">Rice Meal</h3>
                        <div className="menu-items">
                            {menus
                                .filter(menu => menu.Food_Category === "Rice Meal")
                                .map((menu, index) => {
                                    const orderItem = order.find(item => item._id === menu._id);
                                    const quantity = orderItem ? orderItem.quantity : 0;

                                    return (
                                        <div key={index} className="menu-item">
                                            <div className="menu-item-header">
                                                <Icon icon="bxs:bowl-rice" className="menu-item-icon" />
                                                <span className="menu-item-badge">Rice Meal</span>
                                            </div>
                                            <img src={menu.image || test} alt={menu.Food_Name} className="menu-item-image" />
                                            <div className="menu-desc">
                                                <h4 className="menu-item-title">{menu.Food_Name}</h4>
                                                <div className="menu-item-content">
                                                    <p className="menu-item-price">₱ {menu.Food_Price.toFixed(2)}</p>
                                                    <div className="menu-item-footer">
                                                        {quantity > 0 && (
                                                            <button
                                                                className="menu-item-minus"
                                                                onClick={() => {
                                                                    const existingOrderIndex = order.findIndex(item => item._id === menu._id);
                                                                    if (existingOrderIndex !== -1) {
                                                                        const updatedOrder = [...order];
                                                                        if (updatedOrder[existingOrderIndex].quantity > 1) {
                                                                            updatedOrder[existingOrderIndex].quantity -= 1;
                                                                        } else {
                                                                            updatedOrder.splice(existingOrderIndex, 1);
                                                                        }
                                                                        setOrder(updatedOrder);
                                                                    }
                                                                }}
                                                            >
                                                                -
                                                            </button>
                                                        )}
                                                        {quantity > 0 && <span className="menu-item-quantity">{quantity}</span>}
                                                        <button
                                                            className="menu-item-add"
                                                            onClick={() => addOrder(menu._id)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>

                    {/* Drinks Section */}
                    <div id="drinks" className="menu-section">
                        <h3 className="menu-section-header">Drinks</h3>
                        <div className="menu-items">
                            {menus
                                .filter(menu => menu.Food_Category === "Drinks")
                                .map((menu, index) => {
                                    const orderItem = order.find(item => item._id === menu._id);
                                    const quantity = orderItem ? orderItem.quantity : 0;

                                    return (
                                        <div key={index} className="menu-item">
                                            <div className="menu-item-header">
                                                <Icon icon="ri:drinks-2-fill" className="menu-item-icon" />
                                                <span className="menu-item-badge">Drinks</span>
                                            </div>
                                            <img src={menu.image || test} alt={menu.Food_Name} className="menu-item-image" />
                                            <div className="menu-desc">
                                                <h4 className="menu-item-title">{menu.Food_Name}</h4>
                                                <div className="menu-item-content">
                                                    <p className="menu-item-price">₱ {menu.Food_Price.toFixed(2)}</p>
                                                    <div className="menu-item-footer">
                                                        {quantity > 0 && (
                                                            <button
                                                                className="menu-item-minus"
                                                                onClick={() => {
                                                                    const existingOrderIndex = order.findIndex(item => item._id === menu._id);
                                                                    if (existingOrderIndex !== -1) {
                                                                        const updatedOrder = [...order];
                                                                        if (updatedOrder[existingOrderIndex].quantity > 1) {
                                                                            updatedOrder[existingOrderIndex].quantity -= 1;
                                                                        } else {
                                                                            updatedOrder.splice(existingOrderIndex, 1);
                                                                        }
                                                                        setOrder(updatedOrder);
                                                                    }
                                                                }}
                                                            >
                                                                -
                                                            </button>
                                                        )}
                                                        {quantity > 0 && <span className="menu-item-quantity">{quantity}</span>}
                                                        <button
                                                            className="menu-item-add"
                                                            onClick={() => addOrder(menu._id)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>

                    {/* Snacks Section */}
                    <div id="snacks" className="menu-section">
                        <h3 className="menu-section-header">Snacks</h3>
                        <div className="menu-items">
                            {menus
                                .filter(menu => menu.Food_Category === "Snacks")
                                .map((menu, index) => {
                                    const orderItem = order.find(item => item._id === menu._id);
                                    const quantity = orderItem ? orderItem.quantity : 0;

                                    return (
                                        <div key={index} className="menu-item">
                                            <div className="menu-item-header">
                                                <Icon icon="mdi:food-apple" className="menu-item-icon" />
                                                <span className="menu-item-badge">Snacks</span>
                                            </div>
                                            <img src={menu.image || test} alt={menu.Food_Name} className="menu-item-image" />
                                            <div className="menu-desc">
                                                <h4 className="menu-item-title">{menu.Food_Name}</h4>
                                                <div className="menu-item-content">
                                                    <p className="menu-item-price">₱ {menu.Food_Price.toFixed(2)}</p>
                                                    <div className="menu-item-footer">
                                                        {quantity > 0 && (
                                                            <button
                                                                className="menu-item-minus"
                                                                onClick={() => {
                                                                    const existingOrderIndex = order.findIndex(item => item._id === menu._id);
                                                                    if (existingOrderIndex !== -1) {
                                                                        const updatedOrder = [...order];
                                                                        if (updatedOrder[existingOrderIndex].quantity > 1) {
                                                                            updatedOrder[existingOrderIndex].quantity -= 1;
                                                                        } else {
                                                                            updatedOrder.splice(existingOrderIndex, 1);
                                                                        }
                                                                        setOrder(updatedOrder);
                                                                    }
                                                                }}
                                                            >
                                                                -
                                                            </button>
                                                        )}
                                                        {quantity > 0 && <span className="menu-item-quantity">{quantity}</span>}
                                                        <button
                                                            className="menu-item-add"
                                                            onClick={() => addOrder(menu._id)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
            <button className="cart" onClick={() => checkCart()}>
                <Icon icon="mdi:cart-outline" width="30" height="30" />
            </button>
        </>
    );
}
