import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, []);

    const handleLogin = async () => {
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'content-type': 'application/json',
            },
        });
        result = await result.json();

        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user));
            navigate('/');
        } else {
            alert('Please enter correct credentials.');
        }
    };

    return (
        <div className="login-container">
            <input
                type="text"
                className="login-input"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <input
                type="password"
                className="login-input"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button className="login-button" onClick={handleLogin}>
                Log in
            </button>
        </div>
    );
};

export default Login;
