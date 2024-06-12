import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import TopBar from './components/Topbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';

import './App.css';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('token');
    const admin=localStorage.getItem('admin');
    if (storedUser && admin) {
      var userData=getUsuario();
      setUser(userData);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('logged');
    localStorage.removeItem('admin');
    setUser(null);
    return <Navigate to="/" />;
  };

  const getUsuario = async () => {
    try {
      const response = await fetch(`/users/${localStorage.getItem('token')}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if(response.ok){
        return data;
      }
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="App">
      <TopBar user={user} onLogin={handleLogin} onLogout={handleLogout}/>
      <div className='content'>
        <HomePage/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
