import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import MovieForm from './components/MovieForm';
import MoviePage from './components/MoviePage';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import MovieEditForm from './components/MovieEditForm';
import RegisterForm from './components/RegisterForm';
import UserCard from './components/UserCard';
import UserPage from './components/UserPage';
import UserEditForm from './components/UserEditForm';
import ScreeningsList from './components/ScreeningsList';
import AddScreeningForm from './components/AddScreeningForm';
import DropdownFunciones from './components/ScreeningSelector';
import TopBar from './components/Topbar';
import PrivateRoute from './components/PrivateRoute';
import ScreenList from './components/ScreenList';
import AddScreenForm from './components/AddScreenForm';
import EditScreenForm from './components/EditScreenForm';
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
