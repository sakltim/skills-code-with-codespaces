import React from 'react';
import './MasterPage.css';

function MasterPage({ username, onLogout, children }) {
  return (
    <div>
      <header className="header">
        <label className="username-label">{`Welcome, ${username}`}</label>
        <button className="logout-button" onClick={onLogout}>Logout From App</button>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}

export default MasterPage;
