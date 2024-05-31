import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import MovieForm from './components/MovieForm';
import MoviePage from './components/MoviePage';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import RegisterForm from './components/RegisterForm';
import UserCard from './components/UserCard';
import UserPage from './components/UserPage';
import TopBar from './components/Topbar';

import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('token');
    if (storedUser) {
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
    setUser(null);
  };

  const getUsuario = async ()=> {
    try {
      const response = await fetch(`/users/${localStorage.getItem()}`, {
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

      <Router>
        <Routes>
          <Route path="/movies/:id" element={<MovieDetails/>} />
          <Route path="/" element={<MoviePage />} />
          <Route path="/movies/register" element={<MovieForm/>}/>
          <Route path="/movies" element={<MovieList/>}/>
          <Route path="/users/:id" element={<UserCard/>}/>
          <Route path="/users/register" element={<RegisterForm/>}/>
          <Route path="/users" element={<UserPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
