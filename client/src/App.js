import React from 'react';
import Profile from './Pages/Profile/Profile';
import Login from './Pages/Login/Login';
import Register from './Pages/Login/Register';
import './App.css';

function App() {
  return (
    <div className="App bg-black text-white min-h-[100vh] flex flex-col justify-between">
      {/* <Profile /> */}
      {/* <Login/> */}
      <Register />
    </div>
  );
}

export default App;
