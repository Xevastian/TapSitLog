import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true); // To toggle between login and register forms
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // Handle login validation here (e.g., API call)
        // After successful login:
        navigate('/menu');
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic here (e.g., API call)
        // After successful registration:
        alert("Registration successful! Please login.");
        setIsLogin(true); // Redirect to login page after successful registration
    };

    return (
        <div>
            <h1>Landing Page</h1>
            {isLogin ? (
                <div>
                    <h2>Login</h2>
                    <form onSubmit={handleLoginSubmit}>
                        <label>
                            Username:
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <br />
                        <button type="submit">Login</button>
                    </form>
                    <p>Don't have an account? <span onClick={() => setIsLogin(false)} style={{ cursor: 'pointer', color: 'blue' }}>Register here</span></p>
                </div>
            ) : (
                <div>
                    <h2>Register</h2>
                    <form onSubmit={handleRegisterSubmit}>
                        <label>
                            Username:
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <br />
                        <button type="submit">Register</button>
                    </form>
                    <p>Already have an account? <span onClick={() => setIsLogin(true)} style={{ cursor: 'pointer', color: 'blue' }}>Login here</span></p>
                </div>
            )}
        </div>
    );
}
