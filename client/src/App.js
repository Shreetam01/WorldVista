import './App.css';
import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Write from './components/Write';
import Profile from './components/Profile';
import ContantPage from './components/ContantPage';
import WatchList from './components/WatchList';
import UpdateProfilePage from './components/UpdateProfilePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';


function App() {
  const [userId, setUserId] = useState(() => JSON.parse(localStorage.getItem('id')) || null);
  const [userName, setUserName] = useState(() => JSON.parse(localStorage.getItem('userName')) || '');
  const [token, setToken] = useState(() => JSON.parse(localStorage.getItem('token')) || null);
  const [isLogIn, setIsLogIn] = useState(() => JSON.parse(localStorage.getItem('isLogin')) || false);

  console.log(userId + " "+ isLogIn + " "+ token+" "+ userName);

  return (
    <Router>
       <Navbar login={isLogIn} uid={userId} name={userName} />
       <Routes>
        <Route path='/' element={<Home login={isLogIn} usertoken={token}/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/post/:id' element={<ContantPage />} />
        <Route path='/profile' element={<Profile login={isLogIn} usertoken={token}/>} />
        <Route path='/your-post' element={<Write login={isLogIn} usertoken={token}/>} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/watchlist' element={<WatchList login={isLogIn} usertoken={token}/>} />
        <Route path='/updateProfile' element={<UpdateProfilePage login={isLogIn} usertoken={token}/>} />
      </Routes>
    </Router>
  );
}

export default App;
