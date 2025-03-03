import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css';

function Login({ onLogin }) {
  const [loginButtonText, setLoginButtonText] = useState('Login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isBouncing, setIsBouncing] = useState(false);
  const [isBuzzing, setIsBuzzing] = useState(false);
  const [buttonClass, setButtonClass] = useState('');
  const [buttonDisable, setButtonDisable] = useState(false);
  const [isRedButtonValid, setRedButtonValid] = useState(false);
  const navigate = useNavigate();
  console.log('Login Component Rendered');

  useEffect(() => {
    console.log('Navigate function updated');
  }, [navigate]);

  const isFormValid = username && password;

  const handleLogin = (e) => {
    setButtonDisable(true);
    e.preventDefault();
    console.log('setIsBouncing true');
    setIsBouncing(true);
    setTimeout(() => {
      console.log('setIsBouncing false');
      setIsBouncing(false);
      if (isFormValid) {
        // alert(`Username: ${username}, Password: ${password}`);
        console.log('Before Navigation');
        if (username === 'a' && password === 'a') {
          setUsername('');
          setPassword('');
          onLogin(username);
          navigate('/BlogCards');
          console.log('After Navigation');
        } else {
          setLoginButtonText('Invalid Credentials');
          setIsBuzzing(true);
          setRedButtonValid(true);
          setButtonClass('');
          setButtonClass(classes['button-red']);
          setTimeout(() => {
            setIsBuzzing(false);
            setLoginButtonText('Login');
            setButtonClass(classes['button-green']);
          }, 1000);
        }
      }
    }, 500);
    setButtonDisable(false);
    setRedButtonValid(false);
  };

  return (
    <div className={classes['login-container']}>
      <div className={classes['login-box']}>
        <h2 className={classes['login-header']}>Login Page</h2>
        <form className={classes['login-form']}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          {isFormValid && (
            <button
              type="submit"
              disabled={buttonDisable}
              className={`${isFormValid && !isRedButtonValid ? `${classes['button-visible']} ${classes['button-green']}` : ''} ${isBouncing ? classes['button-bounce'] : ''} ${isBuzzing ? classes['button-buzz'] : ''} ${buttonClass}`}
              onClick={handleLogin}>
              {loginButtonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
