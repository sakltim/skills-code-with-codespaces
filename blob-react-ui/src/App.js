import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './Login';
import BlogCards from './BlogCards';
import MasterPage from './MasterPage';
import BlogDetail from './BlogDetail';
import logoutUser from './utils/auth';

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

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.clear();
      // Clear user session logic here
      // For example, you might call a logout function
      logoutUser();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // const handleLogin = (user) => {
  //   console.log('handleLogin', user);
  //   setUsername(user);
  //   setIsLoggedIn(true);
  //   localStorage.setItem('username', user);
  // };

  const handleLogout = () => {
    console.log('handleLogout');
    setUsername('');
    setIsLoggedIn(false);
    localStorage.removeItem('username');
    navigate('/');
  };

  const routeMenus = () => {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MasterPage username={username} onLogout={handleLogout}><BlogCards /></MasterPage>} />
        <Route path="/blog" element={<MasterPage username={username} onLogout={handleLogout}><BlogCards /></MasterPage>} />
        <Route path="/BlogCards" element={<MasterPage username={username} onLogout={handleLogout}><BlogCards /></MasterPage>} />
        <Route path="/blog/:id" element={<MasterPage username={username} onLogout={handleLogout}><BlogDetail /></MasterPage>} />
        {/* Add other routes here */}
      </Routes>
    );
  };

  return (

    <div className="App">
      {isLoggedIn ? (
        <MasterPage username={username}  onLogout={handleLogout}>
          {routeMenus()}
        </MasterPage>
      ) : (
        <div>
          {routeMenus()}
        </div>
      )}
    </div>
  );
}

export default App;