import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, resetUsernameExists } from './userSlice'; // Import actions from userSlice
import './Register.css';

function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { username, password, firstName, lastName, usernameExists } = useSelector(state => state.user); // Get state from Redux
    const [isRegisterButtonClicked, setIsRegisterButtonClicked] = useState(false);

    const clearAllTextBoxes = useCallback(() => {
        dispatch({ type: 'user/setUsername', payload: '' });
        dispatch({ type: 'user/setPassword', payload: '' });
        dispatch({ type: 'user/setFirstName', payload: '' });
        dispatch({ type: 'user/setLastName', payload: '' });
    }, [dispatch]);

    useEffect(() => {
        // Clear all text boxes when the component mounts
        clearAllTextBoxes();
    }, [dispatch, clearAllTextBoxes]);

    const handleRegister = () => {
        dispatch(registerUser({ username, password, firstName, lastName }));
        setIsRegisterButtonClicked(true);
    };

    useEffect(() => {
        debugger;
        if (isRegisterButtonClicked) {
            if (!usernameExists) {
                alert(`User "${username}" registered successfully!`);
                // Clear all text boxes here
                clearAllTextBoxes();
                navigate('/login');
            } else {
                alert(`Username "${username}" already exists!`);
            }
        setIsRegisterButtonClicked(false);
    }
    }, [usernameExists, clearAllTextBoxes, navigate, username, isRegisterButtonClicked]);

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
                            onChange={e => { dispatch(resetUsernameExists()); dispatch({ type: 'user/setUsername', payload: e.target.value }); }}
                            required
                            className={`input-field ${usernameExists ? 'input-error' : ''}`}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={e => dispatch({ type: 'user/setPassword', payload: e.target.value })} required className="input-field" />
                    </div>
                    <div>
                        <label>First Name:</label>
                        <input type="text" value={firstName} onChange={e => dispatch({ type: 'user/setFirstName', payload: e.target.value })} required className="input-field" />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input type="text" value={lastName} onChange={e => dispatch({ type: 'user/setLastName', payload: e.target.value })} required className="input-field" />
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
