import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './Login';
import BlogCards from './BlogCards';
import MasterPage from './MasterPage';
import BlogDetail from './BlogDetail';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('username');
    if (loggedInUser) {
      setUsername(loggedInUser);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (user) => {
    console.log('handleLogin', user);
    setUsername(user);
    setIsLoggedIn(true);
    localStorage.setItem('username', user);
  };

  const handleLogout = () => {
    console.log('handleLogout');
    setUsername('');
    setIsLoggedIn(false);
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <MasterPage username={username} onLogout={handleLogout}>
          <Routes>
            <Route path="/" element={<BlogCards />} />
            <Route path="/BlogCards" element={<BlogCards />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            {/* Add other routes here */}
          </Routes>
        </MasterPage>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;