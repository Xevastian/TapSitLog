import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

export default function OnlinePaymentPage() {
    const {id,orderID} = useParams();
    const navigate = useNavigate();  
    const nav = (path) => {
        navigate(`/${id}/order/${orderID}/payment/online/${path}`);}

    return (
        <div>
            <h1>Online Payment Page</h1>
            <div className="online-payment-options">
                <h2>Select Payment Method</h2>
                <button className="payment-button" onClick={() => nav("gcash")}>Gcash</button>
                <button className="payment-button" onClick={() => nav("paymaya")}>Paymaya</button>
                <button className="payment-button" onClick={() => nav("bank")}>Bank Transfer</button>
            </div>
        </div>
    )
}