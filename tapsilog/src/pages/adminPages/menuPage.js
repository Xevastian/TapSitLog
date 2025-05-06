import { useNavigate, Outlet } from "react-router-dom";
import TopNavBar from './topNavBar.js';
import '../../styles/menuPage.css';
import '../../styles/index.css';

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
            <TopNavBar />
            <div className="layout">
                <aside className="sidebar">
                    <div className="profile">
                            <i className="fas fa-user-circle"></i> 
                            <p>'Username'</p> {/* Palagay Backend Thanks*/}
                        </div>
                    <button onClick={() => nav('dashboard')}>
                        <i className="fas fa-tachometer-alt"></i> Dashboard
                    </button>
                    <button onClick={() => nav('counter')}>
                        <i className="fas fa-solid fa-tv"></i> Counter
                    </button>
                    <button onClick={() => nav('generate-qr')}>
                        <i className="fas fa-qrcode"></i> Generate QR
                    </button>
                    <button onClick={() => nav('pending-orders')}>
                        <i className="fas fa-box"></i> Orders
                    </button> 
                    <button onClick={() => nav('menu_page')}>
                        <i className="fas fa-solid fa-mug-saucer"></i> Menu
                    </button>
                    <button onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </aside>

                <main className="main-content">
                    <Outlet /> {/*route content*/}
                </main>
            </div>
        </>
    );
}
