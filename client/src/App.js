import React from 'react';
import Profile from './Pages/Profile/Profile';
import Footer from './Pages/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="App bg-black text-white min-h-[100vh] flex flex-col justify-between">
      <Profile />
      <Footer />
    </div>
  );
}

export default App;
