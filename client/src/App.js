import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import EditProfile from './Pages/Profile/EditProfile';
import UserProfile from './Pages/Profile/UserProfile';
import Post from './Pages/Post/Post';
import ViewPost from './Pages/Profile/ViewPost';
import UserViewPost from './Pages/Profile/UserViewPost';
import Login from './Pages/Login/Login';
import Register from './Pages/Login/Register';
import './App.css';

function App() {

  const BASE_URL = "https://instagram-clone-api-six.vercel.app/";
  // const BASE_URL = "http://localhost:5000";
  // const BASE_URL = "https://instagram-clone-1-api.onrender.com";
  
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/getData`, {
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
    <div className="App bg-black text-white max-w-[414px] min-h-[100vh] m-auto flex flex-col justify-between relative cursor-default">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/edit-profile' element={<EditProfile />} />
          <Route exact path='/uploadPost' element={<Post />} />
          <Route exact path='/viewMyPosts' element={<ViewPost />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route path='/profile/:userId' element={<UserProfile />} />
          <Route path='/profile/:userId/posts' element={<UserViewPost />} />
          <Route path='*' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
