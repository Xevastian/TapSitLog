import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [strength, setStrength] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/menu');
        }
    }, [navigate]);

    const evaluatePasswordStrength = (password) => {
        const length = password.length;
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);

        if (length < 6 || (length >= 6 && (!hasLower || !hasDigit))) {
            return 'Weak';
        }
        if (length >= 6 && hasLower && hasDigit && (length < 8 || !hasUpper)) {
            return 'Moderate';
        }
        if (length >= 8 && hasLower && hasUpper && hasDigit && (length < 10 || !hasSpecial)) {
            return 'Strong';
        }
        if (length >= 10 && hasLower && hasUpper && hasDigit && hasSpecial) {
            return 'Very Strong';
        }
        return 'Weak';
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (!isLogin) {
            const pwdStrength = evaluatePasswordStrength(newPassword);
            setStrength(pwdStrength);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = isLogin ? 'http://localhost:5000/login' : 'http://localhost:5000/register';
            const payload = isLogin ? { email, password } : { username, email, password };

            if (!isLogin && (strength === 'Weak' || strength === 'Moderate')) {
                setError('Password must be strong or very strong to register.');
                return;
            }

            const response = await axios.post(url, payload);
            localStorage.setItem('token', response.data.token);

            if (isLogin) {
                navigate('/menu');
            } else {
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    const getStrengthColor = (strength) => {
        switch (strength) {
            case 'Weak':
                return 'red';
            case 'Moderate':
                return 'orange';
            case 'Strong':
                return 'green';
            case 'Very Strong':
                return 'darkgreen';
            default:
                return '';
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            style={{ flexGrow: 1 }}
                        />
                        {!isLogin && password && (
                            <span
                                style={{
                                    color: getStrengthColor(strength),
                                    fontWeight: 'bold',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {strength}
                            </span>
                        )}
                </div>
                <button
                    type="submit"
                    disabled={!isLogin && (strength === 'Weak' || strength === 'Moderate')}
                >
                    {isLogin ? 'Login' : 'Register'}
                </button>
            </form>
            <button
                onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                    setStrength('');
                    setPassword('');
                }}
            >
                {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
            </button>
        </div>
    );
};

export default Auth;
