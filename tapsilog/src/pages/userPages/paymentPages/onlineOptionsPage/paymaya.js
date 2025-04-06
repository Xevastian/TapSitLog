import { useParams } from 'react-router-dom';
import axios from "axios";

export default function PayMaya() {
    const { orderID } = useParams();
    const ipv4 = "192.168.68.142";
    console.log("OrderID: ",orderID);
    const handlePayment = async () => {
        try {
            const response = await axios.put(`http://${ipv4}:5000/order/updateOrder/${orderID}`, {
                Status: "paid", 
            });
            if (response.status === 200) {
                console.log("Payment successful! Order status updated to 'paid'.");
            } else {
                alert("Failed to update order status.");
            }
        } catch (error) {
            console.error("Error updating order status:", error);
            alert("An error occurred while processing the payment.");
        }
    };

    return (
        <div>
            <h1>PayMaya Payment Page</h1>
            <p>Enter PayMaya number</p>
            <button className="payment-button" onClick={handlePayment}>
                Confirm payment with PayMaya
            </button>
        </div>
    );
}