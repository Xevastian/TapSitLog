import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import '../../../../styles/gcash.css';
import gcash from './gcash.png';
import { useState } from 'react';
import { ipv4 } from '../../../../ipv4.js';

export default function GCash() {
    const { id,orderID } = useParams();
    const [total, setTotal] = useState(0)
    const navigate = useNavigate();
    
    const getTotal = async () => {
        try {
            const response = await axios.get(`http://${ipv4}:5000/order/getOrder/${orderID}`);

            if (response.status === 200) {
                setTotal(response.data.Total);
            } else {
                alert("Failed to update order status.");
            }
        }catch(e){
            console.error("Error getting total order:", e);
            alert("Failed to submit order. Please try again.");
        }
    };

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

    getTotal()

    return (
        <div className="gcash-body">
            <div className="gcash-container">
                <div className="gcash-header">
                    <img src={gcash} alt="GCash Logo" className="gcash-logo" />
                </div>
                <div className="gcash-box">
                    <div className="merchant-info">
                        <p><strong>Merchant</strong> <span className="merchant-name">Jollikod</span></p>
                        <p><strong>Amount Due</strong> <span className="amount">₱{total.toFixed(2)}</span></p>
                    </div>
                    <div className="gcash-login-section">
                        <p><strong>Login to pay with GCash</strong></p>
                        <div className="input-group">
                            <span className="country-code">+63</span>
                            <input type="text" placeholder="Mobile Number" className="mobile-input" />
                        </div>
                        <button className="next-button" onClick={handlePayment}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}