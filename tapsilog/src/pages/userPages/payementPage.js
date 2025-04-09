import { useParams, useNavigate } from "react-router-dom"
import { Icon } from "@iconify/react";
import '../../frontend/paymentPage.css';

export default function PayementPage() {  
    const {id,orderID} = useParams();
    const navigate = useNavigate();  
    const nav = (path) => {
        navigate(`/${id}/order/${orderID}/payment/${path}`);
    }

    const buttons = [
        {
            name: "Credit/debit card",
            path: "crdt",
            icon: "f7:creditcard-fill",
        },
        {
            name: "Over the counter",
            path: "otc",
            icon: "hugeicons:cashier",
        },
        {
            name: "Gcash",
            path: "gcsh",
            icon: "arcticons:gcash",
        },
    ];


    return (
        <div style={{background:"#F9F7F7", position: "absolute", width: "100%", height: "100%"}}>
            <nav className="payment-navbar">
                <Icon icon="solar:dollar-outline" className="payment-icon"/>
                <h1>Mode of Payment</h1>
            </nav>
            <div className="payment-button-container">
                {
                    buttons.map((button, index) => (
                        <button key={index} className="payment-button" onClick={() => {nav(button.path)}}>
                            <Icon   icon={button.icon} className="payment-button-icon"/>
                            <h2>{button.name}</h2>
                        </button>
                    ))
                }
            </div>
        </div>
    )
}