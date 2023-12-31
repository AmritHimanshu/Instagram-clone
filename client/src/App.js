import React from 'react';
import Profile from './Pages/Profile/Profile';
import Footer from './Pages/Footer/Footer';
import './App.css';
import Login from './Pages/Login/Login';

function App() {
  return (
    <div className="App bg-black text-white min-h-[100vh] flex flex-col justify-between">
      {/* <Profile /> */}
      <Login/>
      <Footer />
    </div>
  );
}

export default App;
