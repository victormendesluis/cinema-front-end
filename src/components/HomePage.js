import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import MovieForm from './Movie/MovieForm';
import MoviePage from './Movie/MoviePage';
import MovieList from './Movie/MovieList';
import MovieDetails from './Movie/MovieDetails';
import MovieEditForm from './Movie/MovieEditForm';
import RegisterForm from './RegisterForm';
import UserCard from './User/UserCard';
import UserEditForm from './User/UserEditForm';
import ScreeningsList from './Screening/ScreeningsList';
import AddScreeningForm from './Screening/AddScreeningForm';
import DropdownFunciones from './ScreeningSelector';
import PrivateRoute from './PrivateRoute';
import ScreenList from './Screen/ScreenList';
import AddScreenForm from './Screen/AddScreenForm';
import TicketValidation from './TicketValidation';
import UserPage from './User/UserPage';

function HomePage() {
  return (
    <div className="App">

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
            path="/profile" 
            element={<UserCard/>}
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

          <Route path="/reserve/:id" element={
            <PrivateRoute>
              <DropdownFunciones/>
            </PrivateRoute>}/>

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
            path="/ticket" 
            element={
            <PrivateRoute>
              {<TicketValidation/>}
            </PrivateRoute>
          }/>
        </Routes>
      </Router>
    </div>
  );
}

export default HomePage;