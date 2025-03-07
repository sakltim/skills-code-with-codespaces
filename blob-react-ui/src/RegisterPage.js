import React, { useState } from 'react';
import { users } from './userData';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Register.css';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [usernameExists, setUsernameExists] = useState(false); // State to track if username exists

    const navigate = useNavigate(); // Initialize useNavigate

    const handleRegister = () => {
        const userExists = users.some(user => user.username === username);
        if (userExists) {
            setUsernameExists(true);
            alert(`Username "${username}" already exists!`);
        } else {
            users.push({ username, password, firstName, lastName });
            alert('User registered successfully!');
            navigate('/login'); // Navigate to login page
        }
    };

    const isFormValid = username && password && firstName && lastName;

    return (
        <div className="register-container">
            <div className="register-box">
                <h2 className="register-header">Register</h2>
                <form onSubmit={e => { e.preventDefault(); handleRegister(); }}>
                    <div>
                        <label>Username:</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={e => { setUsername(e.target.value); setUsernameExists(false); }} 
                            required 
                            className={`input-field ${usernameExists ? 'input-error' : ''}`} // Add error class if username exists
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="input-field" />
                    </div>
                    <div>
                        <label>First Name:</label>
                        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required className="input-field" />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required className="input-field" />
                    </div>
                    {isFormValid && (
                        <button type="submit" className="register-button">Register</button>
                    )}
                </form>
                <Link to="/login" className="login-link">Login</Link>
            </div>
        </div>
    );
}

export default RegisterPage;
