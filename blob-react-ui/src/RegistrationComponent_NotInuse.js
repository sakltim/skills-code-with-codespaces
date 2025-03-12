import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const RegistrationComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    useEffect(() => {
        // Clear text fields when the component is loaded
        setUsername('');
        setPassword('');
    }, []);

    const handleRegister = async () => {
        // ...existing code for registration logic...
        if (registrationSuccessful) {
            alert(`User "${username}" registered successfully!`);
            // Clear all text boxes
            setUsername('');
            setPassword('');
            // Navigate to the login page
            history.push('/login');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default RegistrationComponent;