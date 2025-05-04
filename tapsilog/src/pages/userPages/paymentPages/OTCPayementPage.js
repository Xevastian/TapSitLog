import { useParams } from "react-router-dom";
import Barcode from "react-barcode";
import { useState, useEffect } from "react";
import axios from "axios";
import '../../../styles/receipt.css';
import { ipv4 } from "../../../ipv4.js";

export default function OTCPayementPage() {
    const { orderID } = useParams();
    const [order, setOrder] = useState([]);

    const today = new Date();
    const formattedDate = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;

    useEffect(() => {
        const fetchOrder = async () => {
          try {
            const response = await axios.get(`http://${ipv4}:5000/order/getOrder/${orderID}`);
            setOrder(response.data.Content);
          } catch (e) {
            console.error("Error fetching order:", e);
            alert("Failed to fetch order.");
          }
        };
        fetchOrder();
      }, [orderID]);      

    const calculateTotal = () => {
        return order.reduce((total, item) => total + item.Food_Price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="receipt">
            <div>
                <h1>OTC Payement Receipt</h1>
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
            </div>
            <div>
                <div className="food-val">
                    <h4>Restaurant</h4>
                    <h4>Jollikod</h4>
                </div>
                <div className="food-val">
                    <h4>Order ID</h4>
                    <h4>{orderID}</h4>
                </div>
                <hr />
                <h1>Thank You!</h1>
                <Barcode
                    value={orderID}
                    width={1.1}
                    height={100}
                    fontSize={16}
                    className="bar"
                />
                <h5 style={{ color: '#1E1E1E', display: "flex", flexDirection: 'column', alignItems: 'center' }}>
                    Show to the counter for it to be scanned.
                </h5>
            </div>
        </div>
    );
}
