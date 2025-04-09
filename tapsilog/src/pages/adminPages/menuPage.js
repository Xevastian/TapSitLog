import { useNavigate } from "react-router-dom";
import '../../frontend/menuPage.css';
import { Icon } from "@iconify/react";

export default function MenuPage() {
    const navigate = useNavigate();

    const nav = (path) => {
        navigate(`/menu/${path}`);
    }

    const options = [
        {
            name: "Setup Orders",
            icon: "lsicon:order-edit-filled",
            path: 'setup',
        },
        {
            name: "Counter",
            icon: "hugeicons:cashier",
            path: 'counter',
        },
        {
            name: "Pending Orders",
            icon: "mdi:receipt-text-pending",
            path: 'pending-orders',
        },
        {
            name: "Generate QR",
            icon: "material-symbols:qr-code-rounded",
            path: 'generate-qr',
        },
    ];

    return (
        <>
            <div className="menuHeader">
                <h1>Menu Page</h1>
            </div>
            
            <div className="menu-list">
                {options.map((option, index) =>(
                    <div key={index} className="menu-option">
                        <Icon icon={option.icon} className="menu-option-icon"/>
                        <h3>{option.name}</h3>
                        <Icon icon="maki:arrow" onClick={() => nav(option.path)} width="clamp(40px, 50px, 60px)" height="clamp(40px, 50px, 60px)" style={{ backgroundColor: "#F9F7F7", color: "#112D4E", borderRadius: "50%", padding: "4px" }}/>
                    </div>
                ))}
            </div>
        </>
    )
}