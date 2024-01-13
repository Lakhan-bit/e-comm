import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            // If there is a user in localStorage (meaning signed up), navigate to the home page
            navigate('/');
        }
    });

    const collectData = async () => {
        console.log(name, password, email);
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'content-type': 'application/json',
            },
        });
        result = await result.json();
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result));
        if (result) {
            navigate('/');
        }
    };

    return (
        <div className="signup-container">
            <h1>Register</h1>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                className="signup-input"
            />

            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="signup-input"
            />

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="signup-input"
            />
            <button onClick={collectData} className="signup-button">
                Sign Up
            </button>
        </div>
    );
};

export default SignUp;
