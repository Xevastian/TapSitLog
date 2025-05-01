import { useNavigate, useParams } from "react-router-dom"
import { Icon } from "@iconify/react";
import '../../../../styles/onlineBank.css'
import axios from "axios";
import bdo from './bdo.png'
import bpi from './bpi.png'
import mcop from './mcop.png'
import visa from './visa.png'
import { ipv4 } from "../../../../ipv4.js";

export default function Bank() {  
    const {id,orderID} = useParams();
    const navigate = useNavigate();
    const handlePayment = async () => {
        try {
            const response = await axios.put(`http://${ipv4}:5000/order/updateOrder/${orderID}`, {
                Status: "paid",
            });
            if (response.status === 200) {
                console.log("Payment successful! Order status updated to 'paid'.");
                navigate(`/${id}/order/${orderID}/payment/rcpt`);
            } else {
                alert("Failed to update order status.");
            }
        } catch (error) {
            console.error("Error updating order status:", error);
            alert("An error occurred while processing the payment.");
        }
    };

    const buttons = [
        {
            name: "BDO Online Payment",
            path: bdo,
        },
        {
            name: "BPI Online Payment",
            path: bpi,
        },
        {
            name: "VISA Online Payment",
            path: visa,
        },
        {
            name: "Master Card Online Payment",
            path: mcop,
        },
    ];

    return (
        <div style={{background:"#F9F7F7", position: "absolute", width: "100%", height: "100%"}}>
            <nav className="bank-navbar">
                <Icon icon="f7:creditcard-fill" className="bank-icon"/>
                <h1>Credit/Debit card</h1>
            </nav>
            <div className="bank-button-container">
                {
                    buttons.map((button, index) => (
                        <button key={index} className="bank-button" onClick={() => {handlePayment()}}>
                            <img src={button.path} className="bank-button-image"/>
                            <h2>{button.name}</h2>
                        </button>
                    ))
                }
            </div>
        </div>
    )
}