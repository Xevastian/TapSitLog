import { useNavigate } from "react-router-dom";

export default function MenuPage() {
    const navigate = useNavigate();

    const nav = (path) => {
        navigate(`/menu/${path}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/');
    };

    return (
        <>
            <div>
                <h1>Menu Page</h1> 
            </div>

            <button onClick={() => nav('counter')}>
                Counter
            </button>

            <button onClick={() => nav('pending-orders')}>
                Orders
            </button>

            <button onClick={() => nav('generate-qr')}>
                Generate QR
            </button>

            <button onClick={() => nav('dashboard')}>
                Dashboard
            </button>

            <button onClick={() => nav('menu_page')}>
                Menu
            </button>

            <button onClick={() => nav('inventory')}>
                Inventory
            </button>
                    
            <button onClick={handleLogout}>
                Logout
            </button>
        </>
    );
}
