import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import '../../../../styles/receipt.css';
import { ipv4 } from "../../../../ipv4.js";

export default function Receipt() {
    const { orderID } = useParams();
    const [order, setOrder] = useState([]);

    const today = new Date();
    const formattedDate = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;

    const calculateTotal = () => {
        return order.reduce((total, item) => total + item.Food_Price * item.quantity, 0).toFixed(2);
    };

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`http://${ipv4}:5000/order/getOrder/${orderID}`);
                setOrder(response.data.Content);
            } catch (e) {
                console.error("Error fetching menu:", e);
                alert("Failed to fetch menu.");
            }
        };

        fetchOrder();
    }, [orderID]);

    const handlePrint = () => {
        const receiptContent = document.getElementById("receipt-content").innerHTML;

        const printWindow = window.open('', '', 'width=800,height=600');

        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Receipt</title>
                    <link rel="stylesheet" type="text/css" href="/styles/receipt.css" />
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                            color: #000;
                        }
                    </style>
                </head>
                <body>
                    ${receiptContent}
                </body>
            </html>
        `);

        printWindow.document.close();
        printWindow.focus();
        printWindow.onload = () => {
            printWindow.print();
            printWindow.close();
        };
    };

    return (
        <div className="receipt">
            <button className="save-receipt" onClick={handlePrint}>
                Save Receipt
            </button>
            <div id="receipt-content">
                <h1>Receipt</h1>
                <hr />
                {order.map((food) => (
                    <div className="food-val" key={food._id}>
                        <h4>{food.Food_Name}</h4>
                        <div>
                            <h4>x {food.quantity}</h4>
                            <h4>₱ {food.Food_Price}</h4>
                        </div>
                    </div>
                ))}
                <hr />
                <div className="food-val">
                    <h4>Total</h4>
                    <h4>₱ {calculateTotal()}</h4>
                </div>
                <div className="food-val">
                    <h4>Date</h4>
                    <h4>{formattedDate}</h4>
                </div>
                <hr />
                <div className="food-val">
                    <h4>Restaurant</h4>
                    <h4>Jollikod</h4>
                </div>
                <div className="food-val">
                    <h4>Order ID:</h4>
                    <h4>{orderID}</h4>
                </div>
                <hr />
                <h1>Thank You!</h1>
                <h6 style={{ color: '#1E1E1E', display: "flex", flexDirection: 'column', alignItems: 'center' }}>
                    Kindly wait for your order to be served.
                </h6>
            </div>
        </div>
    );
}
