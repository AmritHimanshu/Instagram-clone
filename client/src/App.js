import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "./features/userSlice";
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import EditProfile from './Pages/Profile/EditProfile';
import Post from './Pages/Post/Post';
import Login from './Pages/Login/Login';
import Register from './Pages/Login/Register';
import './App.css';

function App() {

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const res = await fetch('/getData', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Include cookies in the request
      });

      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }

      else {
        const data = await res.json();
        dispatch(login(data));
      }

    } catch (error) {
      // console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="App bg-black text-white max-w-[414px] min-h-[100vh] m-auto flex flex-col justify-between">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/edit-profile' element={<EditProfile/>} />
          <Route path='/uploadPost' element={<Post/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
