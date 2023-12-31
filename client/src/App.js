import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from './Pages/Profile/Profile';
import Login from './Pages/Login/Login';
import Register from './Pages/Login/Register';
import './App.css';

function App() {
  return (
    <div className="App bg-black text-white min-h-[100vh] flex flex-col justify-between">
      <Router>
        <Routes>
          <Route path='/' element={<Profile/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </Router>
      {/* <Profile /> */}
      {/* <Login/> */}
      {/* <Register /> */}
    </div>
  );
}

export default App;
