import React from 'react';
import Profile from './Pages/Profile/Profile';
import Login from './Pages/Login/Login';
import './App.css';

function App() {
  return (
    <div className="App bg-black text-white min-h-[100vh] flex flex-col justify-between">
      {/* <Profile /> */}
      <Login/>
    </div>
  );
}

export default App;
