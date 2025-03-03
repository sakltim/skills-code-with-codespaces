import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import BlogCards from './BlogCards';
import MasterPage from './MasterPage';
import { useNavigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = (user) => {
    // alert(`Username: ${user}`);
    console.log('handleLogin', user);
    setUsername(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    console.log('handleLogout');
    setUsername('');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <MasterPage username={username} onLogout={handleLogout}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/BlogCards" element={<BlogCards />} />
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
