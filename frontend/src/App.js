import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Components/SignUp/SignUp';
import Home from './Components/Home/Home';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './Actions/User';


function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  
  const {isAuthenticated} = useSelector((state) => state.user);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home/> : <SignUp/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </Router>
  );
}

export default App;
