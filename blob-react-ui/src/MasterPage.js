import React, { useEffect, useState } from 'react';
import './MasterPage.css';
import { users } from './userData';

function MasterPage({ onLogout, children }) {
  const [userDetails, setUserDetails] = useState({ firstName: '', lastName: '', username: '' });

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      const user = users.find(user => user.username === username);
      if (user) {
        setUserDetails(user);
      }
    }
  }, []);

  return (
    <div>
      <header className="header">
        <label className="username-label">{`Welcome, ${userDetails.firstName} ${userDetails.lastName} (${userDetails.username})`}</label>
        <button className="logout-button" onClick={onLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}

export default MasterPage;