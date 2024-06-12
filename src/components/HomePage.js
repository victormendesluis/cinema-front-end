import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import MovieForm from './MovieForm';
import MoviePage from './MoviePage';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import MovieEditForm from './MovieEditForm';
import RegisterForm from './RegisterForm';
import UserCard from './UserCard';
import UserEditForm from './UserEditForm';
import ScreeningsList from './ScreeningsList';
import AddScreeningForm from './AddScreeningForm';
import DropdownFunciones from './ScreeningSelector';
import PrivateRoute from './PrivateRoute';
import ScreenList from './ScreenList';
import AddScreenForm from './AddScreenForm';
import EditScreenForm from './EditScreenForm';
import EditScreeningForm from './EditScreeningForm';
import UserTable from './UserTable';
import TicketValidation from './TicketValidation';

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
            element={
              <PrivateRoute>
                <UserCard/>
              </PrivateRoute>}
          />

          <Route 
            path="/users" 
            element={
              <PrivateRoute>
                <UserTable />
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
            path="/screenings/:id/edit" 
            element={
            <PrivateRoute>
              {<EditScreeningForm/>}
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