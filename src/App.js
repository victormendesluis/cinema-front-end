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

import './App.css';
import PrivateRoute from './components/PrivateRoute';
import ScreenList from './components/ScreenList';
import AddScreenForm from './components/AddScreenForm';
import EditScreenForm from './components/EditScreenForm';

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

      <Router>
        <Routes>
          <Route path="/" element={<MoviePage />} />
          <Route path="/movies/:id" element={<MovieDetails/>} />
          
          <Route 
            path="/movies/register" 
            element={
              <PrivateRoute>
                <MovieForm/>
              </PrivateRoute>
              }
          />

          <Route 
            path="/movies" 
            element={
              <PrivateRoute>
                <MovieList/>
              </PrivateRoute>}
          />

          <Route 
            path="/movies/:id/edit" 
            element={
              <PrivateRoute>
                <MovieEditForm/>
              </PrivateRoute>}
          />

          <Route 
            path="/users/:id/edit" 
            element={
              <PrivateRoute>
                <UserEditForm/>
              </PrivateRoute>}
          />

          <Route 
            path="/users/:id" 
            element={
              <PrivateRoute>
                <UserCard/>
              </PrivateRoute>}
          />

          <Route 
            path="/users" 
            element={
              <PrivateRoute>
                <UserPage />
              </PrivateRoute>} 
          />
          <Route 
            path="/users/register"
            element={
              <PrivateRoute>
                <RegisterForm/>
              </PrivateRoute>
            } 
          />

          <Route path="/reserve/:id" element={<DropdownFunciones/>} />

          <Route 
            path="/screenings" 
            element={
            <PrivateRoute>
              {<ScreeningsList/>}
            </PrivateRoute>
          }/>

          <Route 
            path="/screenings/add" 
            element={
            <PrivateRoute>
              {<AddScreeningForm/>}
            </PrivateRoute>
          }/>

          <Route 
            path="/screens" 
            element={
            <PrivateRoute>
              {<ScreenList/>}
            </PrivateRoute>
          }/>

          <Route 
            path="/screens/add" 
            element={
            <PrivateRoute>
              {<AddScreenForm/>}
            </PrivateRoute>
          }/>

          <Route 
            path="/screens/:id/edit" 
            element={
            <PrivateRoute>
              {<EditScreenForm/>}
            </PrivateRoute>
          }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
