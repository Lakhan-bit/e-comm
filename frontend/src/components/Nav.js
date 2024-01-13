import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    };

    return (
        <div className="nav-container">
            <img
                src="https://www.google.com/search?q=reymysterio&oq=reymysterio&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQLhhA0gEJMTQ4OTVqMGoxqAIAsAIA&sourceid=chrome&ie=UTF-8#vhid=o0k_HluWmRFf0M&vssid=l"
                alt="logo"
                className="logo"
            />
            {auth ? (
                <ul className="nav-ul">
                    <li>
                        <Link to="/"> Products </Link>
                    </li>
                    <li>
                        <Link to="/add"> Add Products </Link>
                    </li>
                    <li>
                        <Link to="/profile"> Profile </Link>
                    </li>
                    <li>
                        <Link onClick={logout} to="/signup">
                            Logout ({JSON.parse(auth).name})
                        </Link>
                    </li>
                </ul>
            ) : (
                <ul className="nav-ul">
                    <li>
                        <Link to="/signup"> SignUp </Link>
                    </li>
                    <li>
                        <Link to="/login"> Login </Link>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Nav;
