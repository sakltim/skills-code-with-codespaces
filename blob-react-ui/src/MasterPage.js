import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MasterPage.css';
import { users } from './userData';

function MasterPage({ onLogout, children }) {
  const [userDetails, setUserDetails] = useState({ firstName: '', lastName: '', username: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      const user = users.find(user => user.username === username);
      if (user) {
        setUserDetails(user);
      }
    }
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUserDetails({ firstName: '', lastName: '', username: '' });
    navigate('/login');
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div>
      <header className="header">
        {userDetails && userDetails.username ? (
          <div className="header-content">
            <label className="username-label">{`Welcome, ${userDetails.firstName} ${userDetails.lastName} (${userDetails.username})`}</label>
            <button className="logout-button" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        ) : (
          <button className="login-button" onClick={handleLogin}>
            <i className="fas fa-sign-in-alt"></i> Login
          </button>
        )}
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}

export default MasterPage;