import { useNavigate } from "react-router-dom"

export default function MenuPage() {
    const navigate = useNavigate();

    const nav = (path) => {
        navigate(`/menu/${path}`);
    }

    return (
        <>
            <div>
                <h1>Menu Page</h1>
            </div>
            
            <button onClick={() => nav('setup')}>
            Setup Orders
            </button>

            <button onClick={() => nav('counter')}>
                Counter
            </button>

            <button onClick={() => nav('pending-orders')}>
                Pending Orders
            </button>

            <button onClick={() => nav('generate-qr')}>
                Generate QR
            </button>
        </>
    )
}