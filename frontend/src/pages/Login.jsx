import React from 'react';

const Login = () => {
  const handleLogin = () => {
   
    window.location.href = 'http://127.0.0.1:3001/auth/login';
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      fontFamily: 'sans-serif'
    }}>
      <h2>Please Login</h2>
      <button 
        onClick={handleLogin} 
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: '#1DB954', // Spotify Green
          color: 'white',
          fontWeight: 'bold'
        }}
      >
        Login with Spotify
      </button>
    </div>
  );
};

export default Login;