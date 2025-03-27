import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate =  useNavigate();
    const menu = () => {
        navigate('/menu');
    }
    return (
        <div>
            <h1>Landing Page</h1>
            <button onClick={menu}>
                Get Started
            </button>
        </div>
    )
}